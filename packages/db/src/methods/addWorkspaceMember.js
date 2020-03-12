const R = require('ramda')

const { insertOneInto } = require('./helpers')

function addWorkspaceMember (knex, workspaceId, userId) {
  const membership = {
    role: 'member',
    user_id: userId,
    workspace_id: workspaceId
  }

  return insertOneInto(knex, 'memberships', membership)
}

module.exports = R.curry(addWorkspaceMember)
