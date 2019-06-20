require('./database/db')
require('ansicolor').nice

const bodyParser = require('body-parser')
const express = require('express')
const utils = require('./utils/utils')
const config = require('./config/config')
// const schedule = require('node-schedule')

const users = require('./controllers/api/users')
const log = require('ololog').configure({ locate: false })
const app = express()
// const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(users)
app.use(log)
//
// app.use((req, res, next) => {
//   const err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

// // error handlers
// if (app.get('env') === 'development') {
//   app.use((err, req, res, next) => {
//     res.status(err.status || 500)
//     if (err.status !== 404) {
//       log(err) // eslint-disable-line no-console
//     }
//     res.json({
//       message: err.message,
//       error: true
//     })
//   })
// }
// // catch 404 and forward to error handler
// app.use((err, req, res, next) => {
//   res.status(err.status || 500)
//   res.json({
//     message: err.message,
//     error: true
//   })
// })
// start server
app.listen(config.development.node_port, () => {
  const dt = utils.dateTimeString()
  log(dt.blue, 'Server is live on port 3000')
})

module.exports = app
