const { Router } = require('express')

const { users } = require('../data')

const router = Router()

router
  .post('/', (req, res, next) => {
    const userForm = req.body
    const id = Date.now().toString()

    users.push({ id, ...userForm })

    res.status(201).end()
    // res.header()

    return next()
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
