const R = require('ramda')

const { Workspace } = require('@bee/db-models')

//

const throwNotFound = () => {
  const err = new Error('not found')
  return Promise.reject(err)
}

const assertResult = R.when(R.isNil, throwNotFound)

//

async function fetchUserById (id) {
  return Workspace
    .query()
    .withGraphFetched('members')
    .withGraphFetched('channels')
    .findById(id)
    .then(assertResult)
}

//

module.exports = fetchUserById
