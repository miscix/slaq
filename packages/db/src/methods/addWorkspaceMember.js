const R = require('ramda')

const stubVoid = () => void 0

function addWorkspaceMember (knex, workspaceId, userId) {
  const membership = {
    role: 'member',
    user_id: userId,
    workspace_id: workspaceId
  }

  return knex('memberships')
    .insert(membership)
    .then(stubVoid)
}

module.exports = R.curry(addWorkspaceMember)
