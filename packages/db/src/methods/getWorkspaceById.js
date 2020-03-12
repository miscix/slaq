const R = require('ramda')

const { findOneFrom } = require('./helpers')

function getWorkspaceById (knex, id) {
  return findOneFrom(knex, 'workspaces', { id })
}

module.exports = R.curry(getWorkspaceById)
