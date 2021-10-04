const scrapeIt = require("scrape-it");
const axios = require('axios')
const moment = require('moment');
const { Tjajal } = require ('../../schemas/Tjajal')
//[...arguments]
/*
    Steps to map Tjajal
    1.- Get pagination area,
        1.1 - Iterate pages to try to find the link value
            Begining with the page 2 there is a token we need to extract
            e.g."?pagina=2&cons=&cc=Boletin&consulta=U0VMRUNUICogRlJPTSBhY3VlcmRvc19pbnRudCBXSEVSRSAxICBPUkRFUiBCWSBGQWN1IERlc2MsIFNhbGEsIEFuaW8gREVTQywgRm9saW8gQVNDIA=="
        1.2 - Once we find a non empty link, call destructureQueryParams and pass link url
        1.3 - propagate query params as part of the page object
*/

//Function to validate if the object is empty
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

//Get the pagination number from a template string
function getPageNumber( { phrase="", regex = /Pág.\s\d+\s\w+\s(\d+)\spágs/ } ){
    
    const result = phrase.match(regex);
    if(result.length > 0) {
        return result[1];
    }
    return undefined;
}
/* */
// Function to destructure and extract url params from a string
function destructureQueryParams({ phrase="", regex=""}){
    const urlSearchParams = new URLSearchParams(phrase);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
}

//Function that processes the data and reduce the rows
function processBulletinData({ data }){
    //Remove the lines that just includes the secretary name and inject into the previous record as part of the object
    return data.reduce( (accum, item, index) => {
        const { rawContent, record} = item

        if(!rawContent && !record) {
            let tempAccum = accum;
            tempAccum[ tempAccum.length-1 ] = {...tempAccum[ tempAccum.length-1 ] , secretary: item.publicationDate }
            return tempAccum
        }
        else
            return [...accum , item ]
    }, [])
}
//Function to map data and add the url to access to the detail page
function mapData({ data, url }){
    return data.map( (item, index) => {
        const longerTextIndex= item.rawContent.indexOf("...")
        if(longerTextIndex>=0) {
            const anchorTemplate = `<a href='${url}' target='_blank'>ver mas</a>`
            //item.rawContent.slice(0, longerTextIndex).concat(encodeURI(anchorTemplate))
            item  = {...item, viewMoreUrl: url, viewMoreButton: anchorTemplate }
        }
        return item
    })
}
//scrape a single page by url
async function scrapeUrl({ url }){
    try {
            
        let response = {}

        //Get Scraped Page
        const scrapedResult = await scrapeIt(url, Tjajal , (err, { data }) => {
        });

        //Check if the scraper was able to map the initial data
        if (isEmpty( scrapedResult.data ))
            throw  `Unable to scrap the data from ${url}`

        //destructure data
        const { bulletin, numberOfPages, pages } = scrapedResult.data
        
        //Process bulletin data to transform into the expected object
        if( bulletin.length > 0 ){
            const processedData = processBulletinData( { data: bulletin } )
            const mappedData = mapData( { data: processedData, url })
            response = {...response, bulletin: mappedData }
        }

        //Extract the total number of pages from the string
        if( numberOfPages.includes("Pág") ){
            const pageNumber =  getPageNumber( { phrase: numberOfPages } )
            response = {...response, numberOfPages: pageNumber }
        }

        //get the url params from the page two of the pagination area
        //the value that we are interest for is the "consulta" token to continue with the scraping
        if( pages.length > 1 ){
            const { link } = pages[1]
            const params = destructureQueryParams({ phrase: link })
            if( !isEmpty(params) )
                response = {
                    ...response, 
                    params, 
                    token: params.consulta,
                    
                 }

        }
        return response;
    } catch (error) {
        console.log(error)
    }
}
/*
Boletines:
10 Boletines por pagina
1 090 58 págs
1 090 575 de registros
550 boletines diarios

Se podria programar un cron job que revise los nuevos boletines diarios y los almacene
    Se genereran alrededor de 55 consultas diarias (10 boletines por pagina)
    larga de informacion cargada sera minima

        Desventajas:
            Se tendra un alamcenamiento permanete innecesario de todo el historico de boletienes existentes
            Se necesita consultar los boletienes que se liberaran a diario aun cuando no se tenga ningun proyecto monitorieandolo
            Para manetener la persistencia de los datos este tarea tendra que seguir corriendo indefinidamente

        Ventajas:
            Acceso directo al todo el historico de la aplicacion de forma rapida y sin sobrecargar el scrapper
            Las consultas diarias a la pagina de boletienes sera minima
            Poca probabilidad de ser detectada como un DDOS

    
        1 millon de entradas como carga inicial para la DB
        55 consultas diarias


*/


//scrape a record, iterates all the pages that correspond to the record
//if the function receives a bulletin, it will return the recent ones until that record, 
//based on the publicationDate and plaintiff
async function scrapeRecord( { url, lastBulletin } ) {
    try {
        const baseUrl = new URL(url).origin
        const initialPayload = await scrapeUrl({ url })
        let newContent = { ...initialPayload };

            //clear the bulletin array to insert only the recent ones
            newContent = { ...newContent, bulletin:[]}
            
            const { bulletin: initialBulletin ,numberOfPages, params, token } = initialPayload
            if(initialBulletin.length > 0 )
            {
                const dateFormat = "DD-MM-YYYY"
                let lastBulletinPublicationDate = undefined
                if(lastBulletin)
                    lastBulletinPublicationDate = moment(lastBulletin.publicationDate,dateFormat)
                let lastItemFound = false;
                for ( let pageNumber = 1 ; pageNumber <= numberOfPages && pageNumber < 100 && lastItemFound == false ; pageNumber++ ){
                    let newBulletin = [] 

                    if(pageNumber === 1)
                    {
                        newBulletin = initialBulletin
                    }
                    else{
                        const pageParams = new URLSearchParams( { ...params, pagina: pageNumber } )
                        let url = `${baseUrl}/consulta.php?${pageParams.toString()}`
                        console.log(url)
                        const payload = await scrapeUrl( { url } )
                        const { bulletin } = payload
                        newBulletin = bulletin
                    }
                    
                    for ( let item of  newBulletin) {

                        if (lastBulletinPublicationDate){
                            const currentBulletinpublicationDate  = moment(item.publicationDate,dateFormat)
                            if ( currentBulletinpublicationDate.isSame(lastBulletinPublicationDate) ){
                                lastItemFound = true
                                break;
                            }
                        }
                        newContent.bulletin = [...newContent.bulletin, item]
                    }
                }
            }
        console.log( newContent.bulletin.length)
        return newContent
        
    } catch (error) {
        console.log(error)
    }

}
module.exports = {
    scrapeRecord,
    scrapeUrl,
}