const { Model } = require('objection')

const knex = require('@bee/db-query-builder')

// bind query builder

Model.knex(knex)

// expose models

module.exports.User = require('./src/User')
module.exports.Workspace = require('./src/Workspace')
module.exports.Channel = require('./src/Channel')
