const test = require('ava')

const Knex = require('knex')

const settingsMap = require('../knexfile')

// init

const knex = Knex(settingsMap.test)

// hooks

test.before(async t => {
  await knex.migrate.latest()
  t.context.table = knex('users')
})

test.after.always(async t => {
  await knex.migrate.rollback()
})

// test

test('insert', async t => {
  const { table } = t.context

  const user = {
    name: 'Exo',
    email: 'exo@gmail.com',
    password: 'xxx'
  }

  // assert normal input
  await t.notThrowsAsync(table.insert(user))

  // assert duplicate entry
  await t.throwsAsync(table.insert(user))
    .then(err => {
      t.regex(err.message, /(.*)UNIQUE(.*)/, 'unique constraint')
    })

  // assert nullable
  await t.throwsAsync(table.insert({ name: 'Exo' }))
})
