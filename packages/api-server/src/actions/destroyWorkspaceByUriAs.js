const R = require('ramda')
const createError = require('http-errors')

const fetchWorkspaceByUri = require('./fetchWorkspaceByUri')

//

const throwForbidden = () => {
  const err = createError(403)
  return Promise.reject(err)
}

const hasOwner = R.propEq('createdBy')

//

async function deleteDoc (doc) {
  return doc
    .$query()
    .delete()
}

//

async function destroyWorkspaceByUriAs (userId, uri) {
  const assertPermission = R.unless(
    hasOwner(userId),
    throwForbidden
  )

  return fetchWorkspaceByUri(uri)
    .then(assertPermission)
    .then(deleteDoc)
}

//

module.exports = R.curry(destroyWorkspaceByUriAs)
