const R = require('ramda')

function getWorkspaceMemberList (knex, workspaceId) {
  const selector = {
    role: 'member',
    workspace_id: workspaceId
  }

  return knex
    .select('users.*')
    .from('users')
    .leftJoin('memberships', 'users.id', 'memberships.user_id')
    .where(selector)
}

module.exports = R.curry(getWorkspaceMemberList)
