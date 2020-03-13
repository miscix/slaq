const { Router } = require('express')

const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config')

const { users } = require('../data')

// setup

const router = Router()

router
  .post('/', (req, res, next) => {
    const creds = req.body

    const check = user =>
      user.email === creds.email &&
      user.password === creds.password

    const user = users.find(check)

    if (!user) {
      res.status(401).end()
      return next()
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    const token = jwt.sign(payload, JWT_SECRET)

    res.status(201)
    res.json({ token })

    next()
  })

module.exports = router
