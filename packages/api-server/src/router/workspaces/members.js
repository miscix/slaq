const { Router } = require('express')

const router = Router()

router
  .post('/', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })
  .delete('/:userId', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })
  .get('/', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })

module.exports = router
