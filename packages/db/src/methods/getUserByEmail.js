const R = require('ramda')

const { findOneFrom } = require('./helpers')

/**
 *
 */

function getUserByEmail (knex, email) {
  return findOneFrom(knex, 'users', { email })
}

//

module.exports = R.curry(getUserByEmail)
