const jwt = require('jwt-simple')
const config = require('../config/config')
const moment = require('moment')

function ensureAuthenticated (req, res, next) {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(' ')[1]
    try {
      let decoded = jwt.decode(token, config.super_secret_key)
      if (decoded.exp <= Date.now()) {
        res.send(400, 'Access token has expired')
      } else {
        req.user = decoded.user
        return next()
      }
    } catch (err) {
      return res.send(500, 'Error parsing token')
    }
  } else {
    return res.send(401)
  }
}

function createJwtToken (user) {
  const payload = {
    user: user,
    iat: new Date().getTime(),
    exp: moment().add(1, 'hours').valueOf()
  }
  return jwt.encode(payload, config.super_secret_key)
}

module.exports = {
  createJwtToken: createJwtToken,
  ensureAuthenticated: ensureAuthenticated
}
