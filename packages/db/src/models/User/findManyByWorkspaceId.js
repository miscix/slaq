const R = require('ramda')

function findAllByWorkspaceId (knex, workspaceId) {
  return knex
    .select(['users.*'])
    .from('users')
    .leftJoin('memberships', 'users.id', 'memberships.user_id')
    .where('workspace_id', workspaceId)
}

module.exports = R.curry(findAllByWorkspaceId)
