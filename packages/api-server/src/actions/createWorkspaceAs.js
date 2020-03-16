const R = require('ramda')

const { Workspace } = require('@bee/db-models')

const fromDbError = require('../helpers/error-handler-db')

//

const asMemberNode = R.compose(
  R.of,
  R.objOf('id')
)

//

async function createWorkspaceAs (userId, form) {
  const graphFrom = R.compose(
    R.assoc('createdBy', userId),
    R.assoc('members', asMemberNode(userId))
  )

  return Workspace
    .query()
    .insertGraph(graphFrom(form), { relate: true })
    .catch(fromDbError)
}

//

module.exports = R.curry(createWorkspaceAs)
