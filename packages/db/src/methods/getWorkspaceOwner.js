const R = require('ramda')

function getWorkspaceOwner (knex, workspaceId) {
  const selector = {
    role: 'owner',
    workspace_id: workspaceId
  }

  return knex
    .select('users.*')
    .from('users')
    .leftJoin('memberships', 'users.id', 'memberships.user_id')
    .where(selector)
    .then(R.head)
}

module.exports = R.curry(getWorkspaceOwner)
