const R = require('ramda')

const { deleteOneFrom } = require('./helpers')

/**
 *
 */

function removeWorkspaceById (knex, id) {
  return deleteOneFrom(knex, 'workspaces', { id })
}

//

module.exports = R.curry(removeWorkspaceById)
