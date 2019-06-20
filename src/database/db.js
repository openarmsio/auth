const mongoose = require('mongoose')
const config = require('../config/config')
const url = config.development.mongodb

mongoose.connect(url, { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
mongoose.set('debug', false)

module.exports = mongoose.connection
