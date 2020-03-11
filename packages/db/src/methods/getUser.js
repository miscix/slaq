const R = require('ramda')

// helpers

const getOneFrom = (knex, tableName, selector) =>
  knex(tableName)
    .where(selector)
    .then(R.head) //

/**
 *
 */

function getUser (knex, selector) {
  return getOneFrom(knex, 'users', selector)
}

//

module.exports = R.curry(getUser)
