const test = require('ava')

const knex = require('../helpers/knex')
const hooks = require('../helpers/hooks')

// hooks

test.beforeEach(hooks.up(knex))
test.afterEach.always(hooks.down(knex))

// test

test('insert - duplicate email', async t => {
  await t.throwsAsync(
    knex('users').insert({
      name: 'Exo',
      email: 'exo@gmail.com',
      password: 'xxx'
    })
  )
})
