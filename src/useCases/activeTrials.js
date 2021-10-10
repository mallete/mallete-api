const activeTrials = require("../models/activeTrials")

async function create({ activeTrial }){
    return await activeTrials.create(activeTrial)
}
async function getAll(){
    return await activeTrials.find().populate("user").populate("trial")
}
async function getAllByParams({options}){
    return await activeTrials.find({...options}).populate("user").populate("trial")
}
async function getById({id}){
    return await activeTrials.findById(id).populate("user").populate("trial")
}
async function updateById({id,newData}){
    return await activeTrials.findByIdAndUpdate(id, newData, { new: true })
}
async function deleteById({id}){
    return await activeTrials.findByIdAndDelete(id)
}


module.exports = {
    create,
    getAll,
    getAllByParams,
    getById,
    updateById,
    deleteById
}