const R = require('ramda')

const { deleteOneFrom } = require('./helpers')

// helpers

/**
 *
 */

function removeWorkspaceMember (knex, workspaceId, userId) {
  const selector = {
    role: 'member',
    workspace_id: workspaceId,
    user_id: userId
  }

  return deleteOneFrom(knex, 'memberships', selector)
}

//

module.exports = R.curry(removeWorkspaceMember)
