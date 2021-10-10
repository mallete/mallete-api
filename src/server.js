// Definición de nuestro servidor

const express = require('express')
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const usersRouter = require('./routers/users')
const authRouter = require('./routers/auth')
const trialsRouter = require('./routers/trials')
const activeTrialsRouter = require('./routers/activeTrials')
const cors = require('cors')



const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        // Like the one described here: https://swagger.io/specification/#infoObject
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description:
              "Mallete - CRUD API application made with Express and documented with Swagger",
            license: {
              name: "MIT",
              url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
              name: "Mallete",
              url: "https://mallete.io",
              email: "info@mallete.io",
              
            },
        },
      },
    // List of files to be processes. You can also set globs './routes/*.js'
  apis: ["./src/routers/*.js"],
};

const specs = swaggerJsdoc(options);


const server = express()

// middlewares
server.use(cors())
server.use(express.json())

server.use('/users', usersRouter)
server.use('/auth', authRouter)
server.use('/trials', trialsRouter)
server.use('/active-trials', activeTrialsRouter)
server.use( "/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
module.exports = server


