const R = require('ramda')

const { findOneFrom } = require('./helpers')

/**
 *
 */

function getUserById (knex, id) {
  return findOneFrom(knex, 'users', { id })
}

//

module.exports = R.curry(getUserById)
