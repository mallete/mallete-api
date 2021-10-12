const tasks = require("../models/tasks")

async function create({ data }){
    return await tasks.create(data)
}
async function getAll(){
    return await tasks.find()
}
async function getAllByParams({options}){
    return await tasks.find({...options})
}
async function getById({id}){
    return await tasks.findById(id)
}
async function updateById({id,newData}){
    return await tasks.findByIdAndUpdate(id, newData, { new: true })
}
async function deleteById({id}){
    return await tasks.findByIdAndDelete(id)
}


module.exports = {
    create,
    getAll,
    getAllByParams,
    getById,
    updateById,
    deleteById
}