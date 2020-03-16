const { serial: test } = require('ava')

const R = require('ramda')

const knex = require('@bee/db-query-builder')

const { users, workspaces } = require('@bee/assets')
const { User } = require('@bee/db-models')

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

// createUser

test('createWorkspaceAs - ok', async t => {
  const form = {
    uri: 'x-corp',
    name: 'X Corp.'
  }

  const userId = users[0].id

  const workspace = await X.createWorkspaceAs(userId, form)

  t.is(workspace.uri, form.uri)
  t.is(workspace.createdBy, userId)
  t.is(workspace.members.length, 1)
})

test.failing('createWorkspaceAs - fail (inclomplete)', async t => {
  const userId = users[0].id

  const form = {
    uri: 'x-corp',
    name: ''
  }

  await t.throwsAsync(X.createWorkspaceAs(userId, form))
})

test.failing('createWorkspaceAs - fail (invalid)', async t => {
  const userId = users[0].id

  const form = {
    uri: 'x-corp',
    name: ''
  }

  await t.throwsAsync(X.createWorkspaceAs(userId, form))
})

test('createWorkspaceAs - fail (duplicate uri)', async t => {
  const parse = R.pick(['uri', 'name'])

  const userId = users[0].id
  const form = parse(workspaces[0])

  await t.throwsAsync(X.createWorkspaceAs(userId, form))
})
