const { Router } = require('express')

const { createToken } = require('../actions')

// setup

const router = Router()

router
  .post('/', async (req, res, next) => {
    const resolveCreated = token => {
      res.status(201)
      res.json({ token })
    }

    return createToken(req.body)
      .then(resolveCreated)
      .catch(next)
  })

module.exports = router
