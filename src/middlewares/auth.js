const jwt = require('../lib/jwt')

function auth (request, response, next) {
  try {
    const { authorization: token } = request.headers
    const decodedToken = jwt.verify(token)
    if (!decodedToken) throw new Error('Usuario no Autorizado')
    // request.userCurrent = decodedToken.id
    next()
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: 'Usuario no Autorizado',
      error: error.message
    })
  }
}

module.exports = auth
