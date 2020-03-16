const R = require('ramda')
const createError = require('http-errors')

const fetchWorkspaceByUri = require('./fetchWorkspaceByUri')

//

const throwForbidden = () => {
  const err = createError(403)
  return Promise.reject(err)
}

const hasMember = userId =>
  R.compose(
    R.find(R.whereEq({ id: userId })),
    R.prop('members')
  )

//

function fetchWorkspaceByUriAs (userId, uri) {
  const assertPermission = R.unless(
    hasMember(userId),
    throwForbidden
  )

  return fetchWorkspaceByUri(uri)
    .then(assertPermission)
}

//

module.exports = R.curry(fetchWorkspaceByUriAs)
