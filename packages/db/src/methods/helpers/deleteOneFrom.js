const R = require('ramda')

const getOneFrom = (knex, tableName, selector) =>
  knex(tableName)
    .where(selector)
    .limit(1)
    .del()
    .then(R.head) //

module.exports = R.curry(getOneFrom)
