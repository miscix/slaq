const R = require('ramda')

const getUserById = require('./getUserById')

// helpers

const insertOneInto = (knex, tableName, data) =>
  knex(tableName)
    .insert(data)
    .then(R.head) //

/**
 *
 */

function createUser (knex, userData) {
  return insertOneInto(knex, 'users', userData)
    .then(getUserById(knex))
}

//

module.exports = R.curry(createUser)
