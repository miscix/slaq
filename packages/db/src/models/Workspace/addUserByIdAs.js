const R = require('ramda')

function addUserByIdAs (knex, role, userId, workspaceId) {
  const membershipData = {
    role,
    user_id: userId,
    workspace_id: workspaceId
  }

  return knex('memberships')
    .insert(membershipData)
}

module.exports = R.curry(addUserByIdAs)
