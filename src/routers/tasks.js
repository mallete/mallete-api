const express = require('express')
const tasks = require('../useCases/tasks')
const router = express.Router()
const verifyAuth = require('../middlewares/auth')

// Create Task
router.post('/', verifyAuth, async (request, response) => {
  try {
    const data = request.body
    const documentCreated = await tasks.create({ data })
    response.json({
      success: true,
      message: 'The task was inserted successfully',
      data: {
        tasks: documentCreated
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
// Get All Tasks
router.get('/', async (request, response) => {
    try {
        const responseData = await tasks.getAll()
        response.json({
        success: true,
        message: 'Tasks Found',
            data: {
                tasks: responseData
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
// Get All Tasks By Params
router.get('/search', async (request, response) => {
    try {
        const { activeTrial, record, id, title, assignee} = request.query;
        let options = {}
        if(activeTrial) options = {...options,activeTrial}
        if(record !== undefined) options = {...options, record }
        if(id) options = {...options,_id:id}
        if(title) options = {...options,title}
        if(assignee) options = {...options,assignee}

        const responseData = await tasks.getAllByParams({options})
        response.json({
        success: true,
        message: 'Tasks Found',
            data: {
                tasks: responseData
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
// Get All Tasks By Params
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const responseData = await tasks.getById({id})
        response.json({
        success: true,
        message: 'Tasks Found',
            data: {
                tasks: responseData
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
// Update task by Id
router.patch('/:id', verifyAuth, async (request, response) => {
  try {
    const { id } = request.params
    const { body: newdata } = request
    const userUpdated = await users.updateById({id, newdata})
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
    const responseData = await users.deleteById({ id })
    response.json({
      success: true,
      message: 'Task Deleted',
      data: {
        users: responseData
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
