const test = require('ava')

const Knex = require('knex')

const settingsMap = require('../knexfile')

// init

const knex = Knex(settingsMap.test)

// hooks

test.before(async t => {
  await knex.migrate.latest()
  t.context.table = knex('workspaces')
})

test.after.always(async t => {
  await knex.migrate.rollback()
})

// test

test('insert', async t => {
  const { table } = t.context

  const workspace = {
    name: 'Venus',
    uri: 'venus'
  }

  // assert normal input
  await t.notThrowsAsync(table.insert(workspace))

  // assert duplicate entry
  await t.throwsAsync(table.insert(workspace))
    .then(err => {
      t.regex(err.message, /(.*)UNIQUE(.*)/, 'unique constraint')
    })

  // assert nullable
  await t.throwsAsync(table.insert({ name: 'Venus' }))
})
