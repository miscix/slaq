const { serial: test } = require('ava')

const { users, workspaces } = require('@bee/assets')

const knex = require('../helpers/knex')

//

const sample = {
  workspace: {
    uri: 'disco',
    name: 'Disco',
    created_by: users[0].id
  }
}

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
    .hasTable('workspace')
    .then(t.true)

  await Promise
    .all([
      knex.schema.hasColumn('workspace', 'uri'),
      knex.schema.hasColumn('workspace', 'name'),
      knex.schema.hasColumn('workspace', 'created_by')
    ])
    .then(bools => bools.reduce((a, b) => a && b))
    .then(t.true)
})

test('insert works as expected', async t => {
  await t.notThrowsAsync(
    knex('workspace').insert(sample.workspace)
  )
})

test('require all fields', async t => {
  await t.throwsAsync(
    knex('workspace').insert({
      ...sample.workspace,
      uri: undefined
    }),
    { message: /(.*) NOT NULL constraint failed: workspace.uri$/ }
  )

  await t.throwsAsync(
    knex('workspace').insert({
      ...sample.workspace,
      name: undefined
    }),
    { message: /(.*) NOT NULL constraint failed: workspace.name$/ }
  )

  await t.throwsAsync(
    knex('workspace').insert({
      ...sample.workspace,
      created_by: undefined
    }),
    { message: /(.*) NOT NULL constraint failed: workspace.created_by$/ }
  )
})

test('only one workspace with given uri', async t => {
  const existingWorkspace = workspaces[0]

  await t.throwsAsync(
    knex('workspace').insert({
      ...sample.workspace,
      uri: existingWorkspace.uri
    }),
    { message: /(.*) UNIQUE constraint failed: workspace.uri$/ }
  )
})

test('only existing user as creator', async t => {
  const noUserId = 1000

  await t.throwsAsync(
    knex('workspace').insert({
      ...sample.workspace,
      created_by: noUserId
    }),
    { message: /(.*) FOREIGN KEY constraint failed$/ }
  )
})
