const R = require('ramda')
const createError = require('http-errors')
const fromDbError = require('../helpers/error-handler-db')

const fetchWorkspaceByUri = require('./fetchWorkspaceByUri')

//

const throwForbidden = () => {
  const err = createError(403)
  return Promise.reject(err)
}

const hasOwner = R.propEq('createdBy')

//

async function createChannelAs (userId, form) {
  const { uri, workspaceUri } = form

  const assertPermission = R.unless(
    hasOwner(userId),
    throwForbidden
  )

  const createChannelOn = workspace => {
    return workspace
      .$relatedQuery('channels')
      .insert({ uri })
  }

  return fetchWorkspaceByUri(workspaceUri)
    .then(assertPermission)
    .then(createChannelOn)
    .catch(fromDbError)
}

//

module.exports = R.curry(createChannelAs)
