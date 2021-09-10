const User = require('../models/users')
const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')

async function login (email, password) {
  const userFound = await User.findOne({ email })
  if (!userFound) throw new Error('Verifica email y/o contraseña')
  const validPassword = await bcrypt.compare(password, userFound.password)
  if (!validPassword) throw new Error('Verifica email y/o contraseña')
  // token
  return jwt.sign({ id: userFound._id })
}

module.exports = {
  login
}
