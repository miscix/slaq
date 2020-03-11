const R = require('ramda')

const findOneById = require('./findOneById')

function createOne (knex, data) {
  return knex('users')
    .insert(data)
    .then(R.head)
    .then(findOneById(knex))
}

module.exports = R.curry(createOne)
