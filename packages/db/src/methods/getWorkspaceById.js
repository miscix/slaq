const R = require('ramda')

function getWorkspaceById (knex, id) {
  return knex('workspaces')
    .where({ id })
    .then(R.head)
}

module.exports = R.curry(getWorkspaceById)
