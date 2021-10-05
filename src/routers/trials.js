const express = require('express')
// const users = require('../useCases/users')
const router = express.Router()
// const verifyAuth = require('../middlewares/auth')
/*
// Create User
router.post('/', verifyAuth, async (request, response) => {
  try {
    const trial = request.body
    const userCreated = await users.create(userData)
    response.json({
      success: true,
      message: 'The trial was inserted successfully',
      data: {
        users: data
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
// Get Users by Id
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
*/
module.exports = router
