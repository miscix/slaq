const R = require('ramda')

function findOneById (knex, id) {
  return knex('workspaces')
    .where({ id })
    .then(R.head)
}

module.exports = R.curry(findOneById)
