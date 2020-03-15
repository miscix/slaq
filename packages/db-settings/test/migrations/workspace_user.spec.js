const { serial: test } = require('ava')

const { users, workspaces } = require('@bee/assets')

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
    .hasTable('workspace_user')
    .then(t.true)

  await Promise
    .all([
      knex.schema.hasColumn('workspace_user', 'workspace_uri'),
      knex.schema.hasColumn('workspace_user', 'user_id')
    ])
    .then(bools => bools.reduce((a, b) => a && b))
    .then(t.true)
})

test('insert works as expected', async t => {
  await t.notThrowsAsync(
    knex('workspace_user').insert({
      workspace_uri: workspaces[1].uri,
      user_id: users[0].id
    })
  )
})

test('require all fields', async t => {
  const workspace = workspaces[1]
  const user = users[0]

  await t.throwsAsync(
    knex('workspace_user').insert({
      workspace_uri: workspace.uri
    }),
    { message: /(.*) NOT NULL constraint failed: workspace_user.user_id$/ }
  )

  await t.throwsAsync(
    knex('workspace_user').insert({
      user_id: user.id
    }),
    { message: /(.*) NOT NULL constraint failed: workspace_user.workspace_uri$/ }
  )
})

test('only existing users and workspaces', async t => {
  const noUserId = 1000
  const noWorkspaceUri = 'disneyland-stuff'

  await t.throwsAsync(
    knex('workspace_user').insert({
      workspace_uri: workspaces[0].uri,
      user_id: noUserId
    }),
    { message: /(.*) FOREIGN KEY constraint failed$/ }
  )

  await t.throwsAsync(
    knex('workspace_user').insert({
      workspace_uri: noWorkspaceUri,
      user_id: users[0].id
    }),
    { message: /(.*) FOREIGN KEY constraint failed$/ }
  )
})

test('cascade on user delete', async t => {
  const workspace = workspaces[0]
  const userId = workspace.users[0]

  await knex('user')
    .where({ id: userId })
    .del()

  await knex('workspace_user')
    .where({ user_id: userId })
    .then(res => {
      t.is(res.length, 0)
    })
})

test('cascade on workspace delete', async t => {
  const workspace = workspaces[0]

  await knex('workspace')
    .where({ uri: workspace.uri })
    .del()

  await knex('workspace_user')
    .where({ workspace_uri: workspace.uri })
    .then(res => {
      t.is(res.length, 0)
    })
})
