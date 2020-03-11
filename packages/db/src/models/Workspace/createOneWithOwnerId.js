const R = require('ramda')

const findOneById = require('./findOneById')
const addUserByIdAs = require('./addUserByIdAs')

function createOneWithOwnerId (knex, userId, workspaceData) {
  const addOwnerTo = addUserByIdAs(knex, 'owner', userId)

  return knex('workspaces')
    .insert(workspaceData)
    .then(R.head)
    .then(workspaceId => {
      return addOwnerTo(workspaceId)
        .then(() => findOneById(knex, workspaceId))
      // TODO: rollback on error
    })
}

module.exports = R.curry(createOneWithOwnerId)
