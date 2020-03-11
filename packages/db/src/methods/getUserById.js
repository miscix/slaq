const R = require('ramda')

const getUser = require('./getUser')

/**
 *
 */

function getUserById (knex, id) {
  return getUser(knex, { id })
}

//

module.exports = R.curry(getUserById)
