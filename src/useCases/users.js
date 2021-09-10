const User = require('../models/users')
const bcrypt = require('../lib/bcrypt')

async function create ({ firstName, lastName, email, password }) {
  const userFound = await User.findOne({ email })
  if (userFound) throw new Error('El email ya está registrado')
  // encriptar el password
  const encryptedPassword = await bcrypt.hash(password)
  return User.create({ firstName, lastName, email, password: encryptedPassword })
}

function getAll () {
  return User.find()
}

function getById (id) {
  return User.findById(id)
}

function updateById (id, newData) {
  return User.findByIdAndUpdate(id, newData, { new: true })
}

function deleteById (id) {
  return User.findByIdAndDelete(id)
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
}
