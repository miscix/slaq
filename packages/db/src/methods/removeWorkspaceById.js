const R = require('ramda')

// helpers

const stubVoid = () => void 0

/**
 *
 */

function removeWorkspaceById (knex, workspaceId) {
  return knex('workspaces')
    .del()
    .where({ id: workspaceId })
    .then(stubVoid)
}

//

module.exports = R.curry(removeWorkspaceById)
