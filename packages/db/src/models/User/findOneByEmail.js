const R = require('ramda')

function findOneByEmail (knex, email) {
  return knex('users')
    .where({ email })
    .then(R.head)
}

module.exports = R.curry(findOneByEmail)
