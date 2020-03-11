const Knex = require('knex')

const settingsMap = require('../../knexfile')

//

const ENV = 'test'

// init

module.exports = Knex(settingsMap[ENV])
