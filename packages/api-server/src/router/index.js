const { Router } = require('express')

const tokensRouter = require('./tokens')
const usersRouter = require('./users')
const workspacesRouter = require('./workspaces')

const router = Router()

router
  .use('/tokens', tokensRouter)
  .use('/users', usersRouter)
  .use('/workspaces', workspacesRouter)

module.exports = router
