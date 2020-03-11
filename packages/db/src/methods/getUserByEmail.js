const R = require('ramda')

const getUser = require('./getUser')

/**
 *
 */

function getUserByEmail (knex, email) {
  return getUser(knex, { email })
}

//

module.exports = R.curry(getUserByEmail)
