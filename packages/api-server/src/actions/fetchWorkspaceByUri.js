const { Workspace } = require('@bee/db-models')

const fromDbError = require('../helpers/error-handler-db')

//

async function fetchWorkspaceByUri (id) {
  return Workspace
    .query()
    .withGraphFetched('members')
    .withGraphFetched('channels')
    .findById(id)
    .throwIfNotFound()
    .catch(fromDbError)
}

//

module.exports = fetchWorkspaceByUri
