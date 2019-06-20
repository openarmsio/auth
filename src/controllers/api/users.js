const express = require('express')
const router = express.Router()
const auth = require('../../functions/auth')
const User = require('../../models/user')

// user sign up
router.post('/users/signup', (req, res, next) => {
  if (/^[A-Za-z\s]+$/.test(req.body.firstName) === false || /^[A-Za-z\s]+$/.test(req.body.lastName) === false) {
    return res.status(401).send({
      error: true,
      message: 'Please Enter a valid Name.'
    })
  }

  if (/\S+@\S+\.\S+/.test(req.body.email) === false) { // follows the format something@something.something
    return res.status(401).send({
      error: true,
      message: 'Please Enter a valid Email.'
    })
  }

  if (req.body.password.length < 8) {
    return res.status(401).send({
      error: true,
      message: 'Please Enter a Password 8 Characters or more.'
    })
  }

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  })

  user.save((err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(401).send({ error: true, message: 'User already registered' })
      }
      return res.status(500).send({ error: true, message: err.message })
    }
    return res.status(200).send({ error: false, message: 'New user created!' })
  })
})

// existing user log in
router.post('/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).send({
        error: true,
        message: err.message
      })
    }

    if (!user) {
      return res.status(401).send({
        error: true,
        message: 'User does not exist'
      })
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send({
          error: true,
          message: err.message
        })
      }
      if (!isMatch) {
        return res.status(401).send({
          error: true,
          message: 'Invalid username or password.'
        })
      }
      const token = auth.createJwtToken(user)
      return res.status(200).send({
        error: false,
        token: token
      })
    })
  })
})

module.exports = router
