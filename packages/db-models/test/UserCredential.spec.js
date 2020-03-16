const { serial: test } = require('ava')

const knex = require('@bee/db-query-builder')

//

test.beforeEach(async t => {
  await knex.migrate.latest()
  await knex.seed.run()
})

test.afterEach.always(async t => {
  await knex.migrate.rollback()
})

//

test.todo('query related `user`')
