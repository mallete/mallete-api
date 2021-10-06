const User = require('../models/users')
const bcrypt = require('../lib/bcrypt')

async function create ({ firstName, lastName, email, password }) {
  const userFound = await User.findOne({ email })
  if (userFound) throw new Error('El email ya está registrado')
  // encriptar el password
  const encryptedPassword = await bcrypt.hash(password)
  return User.create({ firstName, lastName, email, password: encryptedPassword })
}

async function getAll () {
  return await User.find()
}

async function getById (id) {
  return await User.findById(id)
}

async function updateById (id, newData) {
  return await User.findByIdAndUpdate(id, newData, { new: true })
}

async function deleteById (id) {
  return await User.findByIdAndDelete(id)
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
}
