const test = require('ava')

const knex = require('../helpers/knex')
const hooks = require('../helpers/hooks')

// hooks

test.beforeEach(hooks.up)
test.afterEach.always(hooks.down)

// test

test.todo('required fields')

test('unique `uri`', async t => {
  await t.throwsAsync(
    knex('workspaces').insert({
      name: 'Shared',
      uri: 'local'
    })
  )
})
