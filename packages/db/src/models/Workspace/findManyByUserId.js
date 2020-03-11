const R = require('ramda')

function findManyByUserId (knex, userId) {
  return knex
    .select(['workspaces.*'])
    .from('workspaces')
    .leftJoin('memberships', 'workspaces.id', 'memberships.workspace_id')
    .where('user_id', userId)
}

module.exports = R.curry(findManyByUserId)
