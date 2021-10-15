const cron = require('node-cron');
const activeTrials = require("../useCases/activeTrials")
const trialsUseCases = require("../useCases/trials")
const sgMail = require('@sendgrid/mail')
const { SENDGRID_API_KEY } = process.env
var invalid = cron.validate('60 * * * *');

//Schedule - At 03:00 on every day-of-week from Monday through Friday.
const expression = '0,30 * * * * *'
const schedule = '0 0 3 * * 1-5'
if (!cron.validate(expression)){
    console.log( new Error(`Update Active Trials - Invalid Cronjob Expression \x1b[31m${expression}\x1b[0m`) )
}
const updateBulletins= async ()=>{
    console.log("Called Updated Bulletins")
    try {
        const currentActiveTrials = await activeTrials.getAllByParams({active:true})
        
        const processedTrials = currentActiveTrials.reduce((accum,activeTrial,index)=>{
                const { record } = activeTrial
                let currentValues = accum[record] ? [...accum[record],activeTrial] : [activeTrial]
                let finalList = accum
                finalList[record] = currentValues
                return finalList
        },[])        
        for( let record in processedTrials ) {
            const { trial } = processedTrials[record][0]
            if(trial){
                const bulletinCount = trial.bulletins.length
                const  updatedTrial = await trialsUseCases.getByParams({record})
                console.log({bulletinCount, updateTrial: updatedTrial.bulletins.length })
                if(updatedTrial.bulletins.length > bulletinCount){
                    //This means we have updated the bulletins count
                    processedTrials[record].forEach( async ({id}) =>{
                        const activeTrialUpdated = await activeTrials.updateById({id, newData:{updated:true},populateData:true})
                        const email = activeTrialUpdated.user.email
                        console.log("sending email notification to:",activeTrialUpdated.user.email )
                        sendEmailNotification({email,record})
                    })
                }
            }
 
        }
        currentActiveTrials.forEach(async (item,index)=>{
            const timeout = getRandomInt(1,500)
            await setTimeout(()=>{    

            },timeout)
        })

    } catch (error) {
        console.log(error)
    }
}
const sendEmailNotification = ({email,record}) =>{
    
    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
      to: email, // Change to your recipient
      from: 'no-reply@mallete.io', // Change to your verified sender
      templateId: 'd-cae693237446496fa0b368305a929c39',
      dynamic_template_data: {
        record: record,
      }
    }

    //Send Email
    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
      })
      .catch((error) => {
        console.error(error)
      })

}
updateBulletins()
const task = cron.schedule(schedule, async function() {
    updateBulletins()
});

const randomTriggerFunction = async (url, timeout)=>{
    await setTimeout(()=>{    

    },timeout)
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
module.exports = task

