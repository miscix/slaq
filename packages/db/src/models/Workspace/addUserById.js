const R = require('ramda')

function addUserById (knex, userId, workspaceData) {
  return knex('workspaces')
    .insert(workspaceData)
    .then(R.head)
    .then(workspaceId => {
      const membershipData = {
        role: 'owner',
        user_id: userId,
        workspace_id: workspaceId
      }

      return knex('memberships')
        .insert(membershipData)
        .then(() => findOneById(knex, workspaceId))
      // TODO: rollback on error
    })
}

module.exports = R.curry(addUserById)

