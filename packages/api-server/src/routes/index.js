const { Router } = require('express')

const TokensRouter = require('./tokens')
const UsersRouter = require('./users')
const WorkspacesRouter = require('./workspaces')

function createRouter () {
  const router = Router()

  router
    .use('/tokens', TokensRouter())
    .use('/users', UsersRouter())
    .use('/workspaces', WorkspacesRouter())

  return router
}

module.exports = createRouter
