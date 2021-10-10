// Definición de nuestro servidor

const express = require('express')
const usersRouter = require('./routers/users')
const authRouter = require('./routers/auth')
const trialsRouter = require('./routers/trials')
const activeTrialsRouter = require('./routers/activeTrials')
const cors = require('cors')

const server = express()

// middlewares
server.use(cors())
server.use(express.json())

// agregabamos los router

server.use('/users', usersRouter)
server.use('/auth', authRouter)
server.use('/trials', trialsRouter)
server.use('/active-trials', activeTrialsRouter)
module.exports = server


