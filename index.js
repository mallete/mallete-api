require('dotenv').config()



const server = require('./src/server')

const dbConnect = require('./src/lib/db')
const port = 8080

// Schedule tasks to be run on the server.
//const updateActiveTrials = require('./src/cronjobs/updateActiveTrials')

dbConnect()
  .then(() => {
    console.log(('Database connected'))
    server.listen(port, () => {
      console.log(`Server listening on port ${port}...`)
    })
  })
  .catch(error => console.log(error))
