const express = require('express')
const auths = require('../useCases/auth')
const router = express.Router()

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body
    const token = await auths.login(email, password)
    response.json({
      success: true,
      message: 'Usuario logueado',
      data: {
        token
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      message: 'Ups!, algo salio mal, intentalo de nuevo',
      error: error.message
    })
  }
})

module.exports = router
