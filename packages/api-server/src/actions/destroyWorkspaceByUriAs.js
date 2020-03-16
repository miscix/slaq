const R = require('ramda')

const fetchWorkspaceByUri = require('./fetchWorkspaceByUri')

//

const throwNotAllowed = () => {
  const err = new Error('not allowed')
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
    throwNotAllowed
  )

  return fetchWorkspaceByUri(uri)
    .then(assertPermission)
    .then(deleteDoc)
}

//

module.exports = R.curry(destroyWorkspaceByUriAs)
