const { Router } = require('express')

const X = require('../actions')

const router = Router()

router
  .post('/workspaces/:workspaceUri/channels', (req, res, next) => {
    const resolveCreated = doc => {
      res.status(201).end()
    }

    const { uri } = req.body
    const { workspaceUri } = req.params

    return X.createChannelAs(req.user.id, { uri, workspaceUri })
      .then(resolveCreated)
      .catch(next)
  })
  .delete('/workspaces/:workspaceUri/channels/:uri', (req, res, next) => {
    res.status(501)
    next('not implemented')
  })

module.exports = router
