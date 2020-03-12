const knex = require('./knex')

module.exports.up = async () => {
  await knex.migrate.latest()
  await knex.seed.run()
}

module.exports.down = async () => {
  await knex.migrate.rollback()
}
