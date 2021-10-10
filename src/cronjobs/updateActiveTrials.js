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
        
        console.log(currentActiveTrials)
        console.log('running a task every minute');
    } catch (error) {
        console.log(error)
    }
});


module.exports = task

