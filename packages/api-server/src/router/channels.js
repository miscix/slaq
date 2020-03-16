const { Router } = require('express')

const X = require('../actions')

const router = Router()

router
  .post('/', (req, res, next) => {
    const resolveCreated = doc => {
      res.status(201).end()
    }

    return X.createChannelAs(req.user.id, req.body)
      .then(resolveCreated)
      .catch(next)
  })
  .delete('/:uri', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })
  .get('/', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })

module.exports = router
