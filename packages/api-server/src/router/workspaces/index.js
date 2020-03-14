const { Router } = require('express')

const membersRouter = require('./members')
const channelsRouter = require('./channels')

const router = Router()

router
  .post('/', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })
  .get('/:uri', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })
  .delete('/:uri', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })
  .get('/', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })

router
  .use('/:workspaceUri/members', membersRouter)
  .use('/:workspaceUri/channels', channelsRouter)

module.exports = router
