const R = require('ramda')

const fetchWorkspaceByUri = require('./fetchWorkspaceByUri')

//

const throwNotAllowed = () => {
  const err = new Error('not allowed')
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
    throwNotAllowed
  )

  return fetchWorkspaceByUri(uri)
    .then(assertPermission)
}

//

module.exports = R.curry(fetchWorkspaceByUriAs)
