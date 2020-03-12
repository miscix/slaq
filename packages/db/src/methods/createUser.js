const R = require('ramda')

const { insertOneInto } = require('./helpers')

/**
 *
 */

function createUser (knex, userData) {
  return insertOneInto(knex, 'users', userData)
}

//

module.exports = R.curry(createUser)
