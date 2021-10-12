const express = require('express')
const activeTrials = require('../useCases/activeTrials')
const router = express.Router()
const verifyAuth = require('../middlewares/auth')

// Create Active Trial
router.post('/', async (request, response) => {
    try {
        const data = request.body
        const reponseData = await activeTrials.create({ activeTrial: data })
        response.json({
            success: true,
            message: 'Regisro creado exitosamente',
            data: {
                activeTrials: reponseData
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
// Get All Active Trials

// Get All Active Trials and Filter
router.get('/', async (request, response) => {
    try {
        const { record, active, trial, user } = request.query;
        let options = {}
        if(record) options = {...options,record}
        if(active !== undefined) options = {...options, active: (active === "true") }
        if(trial) options = {...options,trial}
        if(user) options = {...options,user}
        const responseData = await activeTrials.getAllByParams({options})
        console.log(responseData.length)
        response.json({
            success: true,
            message: 'Estos son todos los active trials',
            data: {
                activeTrials: responseData
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
        const responseData = await activeTrials.getById({ id })

        response.json({
            success: true,
            message: 'Active Trial encontrado',
            data: {
                activeTrial: responseData
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
// Update Active Trial by Id
router.patch('/:id', verifyAuth, async (request, response) => {
    try {
        const { id } = request.params
        const { body: data } = request
        const documentUpdated = await activeTrials.updateById({ id, newData: data })
        response.json({
            success: true,
            message: 'The data was updated succesfully',
            data: {
                activeTrials: documentUpdated
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
// Delete Active Trial  by Id
router.delete('/:id', verifyAuth, async (request, response) => {
    try {
        const { id } = request.params
        const documentDeleted = await activeTrials.deleteById({ id })
        response.json({
            success: true,
            message: 'Document Eliminado',
            data: {
                activeTrials: documentDeleted
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
