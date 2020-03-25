const { serial: test } = require('ava')

const errors = require('http-errors')

const knex = require('@bee/db-query-builder')

const { users, workspaces } = require('@bee/assets')

const X = require('../../src/actions')

//

test.beforeEach(async t => {
  await knex.migrate.latest()
  await knex.seed.run()
})

test.afterEach.always(async t => {
  await knex.migrate.rollback()
})

// tests

test('createChannelAs - ok', async t => {
  const userId = users[0].id

  const uri = 'xxx'
  const workspaceUri = workspaces[0].uri

  const channel = await X.createChannelAs(userId, { uri, workspaceUri })

  t.deepEqual(channel.toJSON(), { uri, workspaceUri })
})

test('createChannelAs - fail (forbidden)', async t => {
  const userId = users[1].id

  const uri = 'xxx'
  const workspaceUri = workspaces[0].uri

  await t.throwsAsync(
    X.createChannelAs(userId, { uri, workspaceUri }),
    { instanceOf: errors.Forbidden }
  )
})
