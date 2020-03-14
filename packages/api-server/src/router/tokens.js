const { Router } = require('express')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('@bee/db-models')

const { JWT_SECRET } = require('../config')

// setup

async function acquireUserByCred (loginForm) {
  const { email, password } = loginForm

  const user = await User
    .query()
    .where({ email })
    .first()

  const credential = await user.$relatedQuery('credential')

  return bcrypt
    .compare(password, credential.hash)
    .then(isMatch => {
      if (isMatch) {
        return user
      }

      return Promise.reject(Error('no'))
    })
}

async function signTokenForUser (user) {
  const { id, name } = user.toJSON()
  return jwt.sign({ id, name }, JWT_SECRET)
}

const router = Router()

router
  .post('/', async (req, res, next) => {
    const resolveCreated = token => {
      res.status(201)
      res.json({ token })
    }

    return acquireUserByCred(req.body)
      .then(signTokenForUser)
      .then(resolveCreated)
      .catch(next)
  })

module.exports = router
