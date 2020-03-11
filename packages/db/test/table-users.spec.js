const test = require('ava')

const Knex = require('knex')

const settingsMap = require('../knexfile')

// init

const knex = Knex(settingsMap.test)

// hooks

test.before(async t => {
  await knex.migrate.latest()
  await knex.seed.run()

  t.context.table = knex('users')
})

test.after.always(async t => {
  await knex.migrate.rollback()
})

// test

test('insert - duplicate', async t => {
  const { table } = t.context

  const user = {
    name: 'Exo',
    email: 'exo@gmail.com',
    password: 'xxx'
  }

  // assert duplicate entry
  await t.throwsAsync(table.insert(user))
    .then(err => {
      t.regex(err.message, /(.*)UNIQUE(.*)/, 'unique constraint')
    })
})
