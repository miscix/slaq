module.exports.up = knex => async () => {
  await knex.migrate.latest()
  await knex.seed.run()
}

module.exports.down = knex => async () => {
  await knex.migrate.rollback()
}
