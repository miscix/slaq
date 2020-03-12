const R = require('ramda')

const { findOneFrom } = require('./helpers')

/**
 *
 */

function getUser (knex, selector) {
  return findOneFrom(knex, 'users', selector)
}

//

module.exports = R.curry(getUser)
