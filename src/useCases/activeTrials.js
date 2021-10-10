const activeTrials = require("../models/activeTrials")
const { updateById } = require("./trials")

async function create({ ativeTrial }){
    return activeTrials.create(ativeTrial)
}
async function getAll(){
    return await activeTrials.find()
}
async function getById({id}){
    return await activeTrials.findById(id)
}
async function updateById(){
    return await activeTrials.findByIdAndUpdate(id, newData, { new: true })
}
async function deleteById({id}){
    return await activeTrials.findByIdAndDelete(id)
}


module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
}