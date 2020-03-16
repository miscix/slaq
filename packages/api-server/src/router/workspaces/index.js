const { Router } = require('express')

const membersRouter = require('./members')
const channelsRouter = require('./channels')

const X = require('../../actions')

const router = Router()

router
  .post('/', (req, res, next) => {
    const resolveCreated = data => {
      res.status(201)
      res.json(data)
    }

    return X.createWorkspaceAs(req.user.id, req.body)
      .then(resolveCreated)
      .catch(next)
  })
  .get('/:uri', (req, res, next) => {
    const resolveOk = data => {
      res.status(200)
      res.json(data)
    }

    return X.fetchWorkspaceByUriAs(req.user.id, req.params.uri)
      .then(resolveOk)
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

router
  .use('/:workspaceUri/members', membersRouter)
  .use('/:workspaceUri/channels', channelsRouter)

module.exports = router
