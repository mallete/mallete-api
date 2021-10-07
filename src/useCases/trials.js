const Trial = require('../models/trials')
const bcrypt = require('../lib/bcrypt')
const moment = require('moment');
const scraper = require('../lib/scrapers/functions/Tjajal')
async function create ({ trial }) {
    console.log("trial",trial)
    const trialFound = await Trial.findOne({ record: trial.record })
    if (trialFound) {
        const newData= {
            $push:{
                bulletins: [...trial.bulletins]
            }
        }
        const updatedDocument =  await updateById({id:trialFound._id, newData})
        return updatedDocument
    }
    return await Trial.create({ ...trial })
}
async function getByParams({ record = "", plantiff = "", deparmentCode= "tjajal", id }){
    let lastBulletin;
    if(id) {
        const oldTrial = await getById (id)
        if( oldTrial && oldTrial.bulletins && oldTrial.bulletins.length > 0)
        lastBulletin = oldTrial.bulletins[oldTrial.bulletins.length-1]
    }
    const trialFound = await Trial.findOne({ record: record })
    if(trialFound)
        lastBulletin = trialFound.bulletins[trialFound.bulletins.length-1]
    const encondedRecord = encodeURIComponent(record)
    const encondedPlantiff = encodeURIComponent(plantiff) 
    const url = `https://portal.tjajal.org/consulta.php?fecha=&exp=${encondedRecord}&actor=${encondedPlantiff}&demandado=&terceros=&cc=Boletin`
    const scrapedPage = await scraper.scrapeRecord({url, lastBulletin})
    if(!scrapedPage)
        throw new Error('Record not found')
    const generatedTrial =  await generateTrial({ scrapedPage, deparmentCode})
    
    return await create({ trial: generatedTrial })

}
async function getAll () {
  return await Trial.find()
}

async function getById (id) {
  return await Trial.findById(id)
  /*
  const now = moment()
  if(trials.bulletins.length > 0){
    const lastBulletin = trial.bulletins[trials.bulletins.length -1]
    const { record } = trial; // record = 1273%2F2021  1273/2021
    const url = `https://portal.tjajal.org/consulta.php?fecha=&exp=${ encodeURIComponent(record) }&actor=&demandado=&terceros=&cc=Boletin`
    scraper.scrapeRecord({url,lastBulletin})
  }*/
}

async function updateById ({id, newData}) {
  return await Trial.findByIdAndUpdate(id, newData, { new: true })
}

async function deleteById (id) {
  return await Trial.findByIdAndDelete(id)
}

async function generateTrial({scrapedPage,deparmentCode}){
    const { 
    record,
    plaintiff,
    defendant,
    thirdParty } = scrapedPage.bulletin[0]
    const dateFormat = "DD-MM-YYYY"
    const mappedBulletins = scrapedPage.bulletin.reverse().map(bulletin =>{
        const mappedBulletin = {...bulletin, 
            agreementDateFormated: moment(bulletin.agreementDate,dateFormat),
            publicationDateFormated:moment(bulletin.publicationDate,dateFormat)
        }
        return mappedBulletin;        
    })
    
    const trial = {
        record: record,
        plaintiff: plaintiff,
        defendant: defendant,
        thirdParty: thirdParty,
        deparmentCode:deparmentCode,
        bulletins: [...mappedBulletins]
    }
    return trial
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  getByParams
}

