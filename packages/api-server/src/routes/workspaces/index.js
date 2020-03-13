const { Router } = require('express')

const MembersRouter = require('./members')
const ChannelsRouter = require('./channels')

function createRouter () {
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
    .use('/:workspaceUri/members', MembersRouter())
    .use('/:workspaceUri/channels', ChannelsRouter())

  return router
}

module.exports = createRouter
