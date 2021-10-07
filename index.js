require('dotenv').config()
const server = require('./src/server')
const dbConnect = require('./src/lib/db')
const port = 8080
dbConnect()
  .then(() => {
    console.log(('Database connected'))
    server.listen(port, () => {
      console.log(`Server listening on port ${port}...`)
    })
  })
  .catch(error => console.log(error))
