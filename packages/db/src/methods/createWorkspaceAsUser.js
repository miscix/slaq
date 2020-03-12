const R = require('ramda')

const { insertOneInto } = require('./helpers')

/**
 *
 */

function createOneWithOwnerId (knex, userId, workspaceData) {
  const setOwner = workspace => {
    const membership = {
      role: 'owner',
      user_id: userId,
      workspace_id: workspace.id
    }

    return knex('memberships')
      .insert(membership)
      .then(() => workspace)
  }

  return insertOneInto(knex, 'workspaces', workspaceData)
    .then(setOwner)
}

module.exports = R.curry(createOneWithOwnerId)
