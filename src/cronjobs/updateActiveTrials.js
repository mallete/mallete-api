const cron = require('node-cron');
const activeTrials = require("../useCases/activeTrials")
var invalid = cron.validate('60 * * * *');

//Schedule - At 03:00 on every day-of-week from Monday through Friday.
const expression = '0 * * * * *'
const schedule = '0 0 3 * * 1-5'
if (!cron.validate(expression)){
    console.log( new Error(`Update Active Trials - Invalid Cronjob Expression \x1b[31m${expression}\x1b[0m`) )
}

const task = cron.schedule(expression, async function() {
    try {
        const currentActiveTrials = await activeTrials.getAllByParams({active:true})
        
        currentActiveTrials.forEach((item,index)=>{
            const timeout = getRandomInt(1,50)
            console.log({timeout})
        })
        //console.log(currentActiveTrials)
        //console.log('running a task every minute');
    } catch (error) {
        console.log(error)
    }
});

const randomTriggerFunction = async (url, timeout)=>{
    setTimeout(()=>{    

    },timeout)
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
module.exports = task

