const R = require('ramda')

function removeOneById (knex, id) {
  return knex('workspaces')
    .where({ id })
    .del()
}

module.exports = R.curry(removeOneById)
