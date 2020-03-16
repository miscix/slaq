const { Router } = require('express')

const tokensRouter = require('./tokens')
const usersRouter = require('./users')
const workspacesRouter = require('./workspaces')
const channelsRouter = require('./channels')

const router = Router()

router
  .use(tokensRouter)
  .use(usersRouter)
  .use(workspacesRouter)
  .use(channelsRouter)

module.exports = router
