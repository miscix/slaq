const { Router } = require('express')

function createRouter () {
  const router = Router()

  router
    .post('/', (req, res, next) => {
      res.status(501)
      next('not implemented')
    })
    .get('/:id', (req, res, next) => {
      res.status(501)
      next('not implemented')
    })
    .get('/', (req, res, next) => {
      res.status(501)
      next('not implemented')
    })

  return router
}

module.exports = createRouter

