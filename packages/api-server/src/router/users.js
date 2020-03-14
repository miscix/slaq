const R = require('ramda')
const { Router } = require('express')

const bcrypt = require('bcrypt')

const { User } = require('@bee/db-models')

//

const BCRYPT_SALT_ROUNDS = 10

//

async function createUser (formData) {
  const hash = await bcrypt
    .hash(formData.password, BCRYPT_SALT_ROUNDS)

  const userData = R.dissoc('password', formData)

  const graph = {
    ...userData,
    credential: { hash }
  }

  return User
    .query()
    .insertGraph(graph)
}

const router = Router()

router
  .post('/', async (req, res, next) => {
    const resolveCreated = () => {
      res.status(201).end()
    }

    return createUser(req.body)
      .then(resolveCreated)
      .catch(next)
  })
  .get('/:id', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })
  .get('/', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })

module.exports = router
