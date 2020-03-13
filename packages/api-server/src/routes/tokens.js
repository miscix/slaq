const { Router } = require('express')

function createRouter () {
  const router = Router()

  router
    .post('/', (req, res, next) => {
      res.status(501)
      next('not implemented')
    })

  return router
}

module.exports = createRouter
