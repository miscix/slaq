const { serial: test } = require('ava')

const { workspaces } = require('@bee/assets')

const knex = require('../helpers/knex')

// hooks

test.beforeEach(async t => {
  await knex.migrate.latest()
  await knex.seed.run()
})

test.afterEach.always(async t => {
  await knex.migrate.rollback()
})

// test

test('table looks ok', async t => {
  await knex.schema
    .hasTable('channel')
    .then(t.true)

  await Promise
    .all([
      knex.schema.hasColumn('channel', 'uri'),
      knex.schema.hasColumn('channel', 'workspace_uri')
    ])
    .then(bools => bools.reduce((a, b) => a && b))
    .then(t.true)
})

test('insert works as expected', async t => {
  const channelUri = 'test'

  await t.notThrowsAsync(
    knex('channel').insert({
      uri: channelUri,
      workspace_uri: workspaces[1].uri
    })
  )
})

test('require all fields', async t => {
  const workspace = workspaces[1]
  const channelUri = 'test'

  await t.throwsAsync(
    knex('channel').insert({
      workspace_uri: workspace.uri
    }),
    { message: /(.*) NOT NULL constraint failed: channel.uri$/ }
  )

  await t.throwsAsync(
    knex('channel').insert({
      uri: channelUri
    }),
    { message: /(.*) NOT NULL constraint failed: channel.workspace_uri$/ }
  )
})

test('only existing workspaces', async t => {
  const channelUri = 'test'
  const noWorkspaceUri = 'disneyland-stuff'

  await t.throwsAsync(
    knex('channel').insert({
      uri: channelUri,
      workspace_uri: noWorkspaceUri
    }),
    { message: /(.*) FOREIGN KEY constraint failed$/ }
  )
})

test('cascade on workspace delete', async t => {
  const workspace = workspaces[0]

  await knex('workspace')
    .where({ uri: workspace.uri })
    .del()

  await knex('channel')
    .where({ workspace_uri: workspace.uri })
    .then(res => {
      t.is(res.length, 0)
    })
})
