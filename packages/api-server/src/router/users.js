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

async function fetchUser (id) {
  return User
    .query()
    .findById(id)
    .then(data => {
      return data || Promise.reject(new Error(404))
    })
}

async function fetchUserList () {
  return User.query()
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
    const resolveFetched = data => {
      res.json(data)
    }

    return fetchUser(req.params.id)
      .then(resolveFetched)
      .catch(next)
  })
  .get('/', (req, res, next) => {
    const resolveFetched = items => {
      res.json({ items })
    }

    return fetchUserList()
      .then(resolveFetched)
      .catch(next)
  })

module.exports = router
