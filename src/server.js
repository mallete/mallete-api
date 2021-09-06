// Definición de nuestro servidor

const express = require('express')

const cors = require('cors')

const server = express()

// middlewares

server.use(cors())

// agregabamos los router

module.exports = server
