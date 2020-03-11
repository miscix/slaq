const R = require('ramda')

// helpers

const stubVoid = () => void 0

/**
 *
 */

function removeWorkspaceMember (knex, workspaceId, userId) {
  const selector = {
    role: 'member',
    workspace_id: workspaceId,
    user_id: userId
  }

  return knex('memberships')
    .del()
    .where(selector)
    .then(stubVoid)
}

//

module.exports = R.curry(removeWorkspaceMember)
