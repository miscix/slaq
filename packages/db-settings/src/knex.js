const Knex = require('knex')

const config = require('./config')

//

const env = process.env.NODE_ENV || 'test'

// init

module.exports = Knex(config[env])
