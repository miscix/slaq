const test = require('ava')

const knex = require('../helpers/knex')
const hooks = require('../helpers/hooks')

// hooks

test.beforeEach(hooks.up(knex))
test.afterEach.always(hooks.down(knex))

// test

test('insert - duplicate uri', async t => {
  await t.throwsAsync(
    knex('workspaces').insert({
      name: 'Shared',
      uri: 'local'
    })
  )
})
