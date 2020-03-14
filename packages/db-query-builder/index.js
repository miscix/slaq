const Knex = require('knex')

const { config } = require('@bee/db-settings')

//

const env = process.env.NODE_ENV || 'test'

// init

module.exports = Knex(config[env])
