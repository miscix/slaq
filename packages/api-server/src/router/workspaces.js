const { Router } = require('express')

const X = require('../actions')

const router = Router()

router
  .post('/workspaces', (req, res, next) => {
    const resolveCreated = data => {
      res.status(201)
      res.json(data)
    }

    return X.createWorkspaceAs(req.user.id, req.body)
      .then(resolveCreated)
      .catch(next)
  })
  .get('/workspaces/:uri', (req, res, next) => {
    const resolveOk = data => {
      res.status(200)
      res.json(data)
    }

    return X.fetchWorkspaceByUriAs(req.user.id, req.params.uri)
      .then(resolveOk)
      .catch(next)
  })
  .delete('/workspaces/:uri', (req, res, next) => {
    const resolveOk = () => {
      res.status(204).end()
    }

    return X.destroyWorkspaceByUriAs(req.user.id, req.params.uri)
      .then(resolveOk)
      .catch(next)
  })
  .get('/workspaces', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })

// members

router
  .post('/workspaces/:workspaceId/members', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })
  .delete('/workspaces/:workspaceId/members/:userId', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })
  .get('/workspaces/:workspaceId/members/', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })

module.exports = router
