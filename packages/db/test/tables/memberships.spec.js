const { serial: test } = require('ava')

const knex = require('../helpers/knex')
const hooks = require('../helpers/hooks')

// hooks

test.beforeEach(hooks.up(knex))
test.afterEach.always(hooks.down(knex))

// test

test('insert - duplicate user+workspace', async t => {
  await t.throwsAsync(
    knex('memberships').insert({
      role: 'owner',
      user_id: 1,
      workspace_id: 1
    })
  )

  await t.throwsAsync(
    knex('memberships').insert({
      role: 'member',
      user_id: 1,
      workspace_id: 1
    })
  )
})
