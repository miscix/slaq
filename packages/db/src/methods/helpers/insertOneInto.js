const R = require('ramda')

const findOneFrom = require('./findOneFrom')

const putOneInto = (knex, tableName, data) =>
  knex(tableName)
    .insert(data)
    .then(() => findOneFrom(knex, tableName, data))

module.exports = R.curry(putOneInto)
