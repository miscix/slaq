const test = require('ava')

const Knex = require('knex')

const settingsMap = require('../knexfile')

// init

const knex = Knex(settingsMap.test)

// hooks

test.before(async t => {
  await knex.migrate.latest()
  await knex.seed.run()

  t.context.table = knex('memberships')
})

test.after.always(async t => {
  await knex.migrate.rollback()
})

// test

test('insert - duplicate', async t => {
  const { table } = t.context

  const membership = {
    role: 'owner',
    user_id: 1,
    workspace_id: 1
  }

  await t.throwsAsync(table.insert(membership))
})
