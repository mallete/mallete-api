const express = require('express')
const users = require('../useCases/users')
const router = express.Router()
const verifyAuth = require('../middlewares/auth')
const sgMail = require('@sendgrid/mail')
const { SENDGRID_API_KEY } = process.env


// Create User
router.post('/', async (request, response) => {
  try {
    const userData = request.body
    const userCreated = await users.create(userData)

    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
      to: userCreated.email, // Change to your recipient
      from: 'no-reply@mallete.io', // Change to your verified sender
      templateId: 'd-1a2b53b9287447cbad621603b6b639c6',
      dynamic_template_data: {
        first_name: userCreated.firstName,
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

    response.json({
        success: true,
        message: 'Regisro creado exitosamente',
        data: {
          users: userCreated
        }
      })

  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      message: 'Ups! Algo salio mal, intenta de nuevo',
      error: error.message
    })
  }
})

/**
 * @swagger
 * /users:
 *    get:
 *      description: This should return all users
 */
// Get All Users
router.get('/', verifyAuth, async (request, response) => {
  try {
    const allUsers = await users.getAll()
    response.json({
      success: true,
      message: 'Estos son todos los usuarios',
      data: {
        users: allUsers
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      message: 'Ups! Algo salio mal, intenta de nuevo',
      error: error.message
    })
  }
})

// Get User by Id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const getById = await users.getById(id)

    response.json({
      success: true,
      message: 'Usuario encontrado',
      data: {
        users: getById
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      sucess: false,
      message: 'Ups! Algo salio mal, intenta de nuevo',
      error: error.message
    })
  }
})
// Update Users by Id
router.patch('/:id', verifyAuth, async (request, response) => {
  try {
    const { id } = request.params
    const { body: userData } = request
    const userUpdated = await users.updateById(id, userData)
    response.json({
      success: true,
      message: 'Tus datos han sido actualizado correctamente',
      data: {
        users: userUpdated
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      sucess: false,
      message: 'Ups! Algo salio mal, intenta de nuevo',
      error: error.message
    })
  }
})
// Delete Users by Id
router.delete('/:id', verifyAuth, async (request, response) => {
  try {
    const { id } = request.params
    const userDeleted = await users.deleteById(id)
    response.json({
      success: true,
      message: 'Perfil Eliminado',
      data: {
        users: userDeleted
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      sucess: false,
      message: 'Ups! Algo salio mal, intenta de nuevo',
      error: error.message
    })
  }
})

module.exports = router
