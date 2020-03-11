const R = require('ramda')

const getWorkspaceById = require('./getWorkspaceById')

/**
 *
 */

function createOneWithOwnerId (knex, userId, workspaceData) {
  const setOwner = workspaceId => {
    const membership = {
      role: 'owner',
      user_id: userId,
      workspace_id: workspaceId
    }

    return knex('memberships')
      .insert(membership)
      .then(() => workspaceId)
  }

  return knex('workspaces')
    .insert(workspaceData)
    .then(R.head)
    .then(setOwner)
    .then(getWorkspaceById(knex))
}

module.exports = R.curry(createOneWithOwnerId)
