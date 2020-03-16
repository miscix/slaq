const { serial: test } = require('ava')

const R = require('ramda')

const knex = require('@bee/db-query-builder')

const { users, workspaces } = require('@bee/assets')

const { Workspace } = require('@bee/db-models')

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

// fetchWorkspaceByUri

test('fetchWorkspaceByUri - ok', async t => {
  const uri = workspaces[0].uri

  const res = await X.fetchWorkspaceByUri(uri)

  t.is(res.uri, uri)

  t.true(Array.isArray(res.members), 'include members')
  t.true(Array.isArray(res.channels), 'include channels')
})

test('fetchWorkspaceByUri - fail (not found)', async t => {
  const uri = 'other-xxx'

  await t.throwsAsync(
    X.fetchWorkspaceByUri(uri),
    { instanceOf: Error } // TODO: assert not found
  )
})

test('fetchWorkspaceByUriAs - ok', async t => {
  const userId = users[0].id
  const uri = workspaces[0].uri

  const res = await X.fetchWorkspaceByUriAs(userId, uri)

  t.is(res.uri, uri)

  t.true(Array.isArray(res.members), 'include members')
  t.true(Array.isArray(res.channels), 'include channels')
})

test('fetchWorkspaceByUriAs - fail (not allowed)', async t => {
  const userId = users[0].id
  const uri = workspaces[1].uri

  await t.throwsAsync(
    X.fetchWorkspaceByUriAs(userId, uri),
    { instanceOf: Error }
  )
})

// destroyWorkspaceByUriAs

test('destroyWorkspaceByUriAs - ok', async t => {
  const userId = users[0].id
  const uri = workspaces[0].uri

  await t.notThrowsAsync(
    X.destroyWorkspaceByUriAs(userId, uri)
  )

  await Workspace
    .query()
    .findById(uri)
    .then(t.falsey)
})

test('destroyWorkspaceByUriAs - fail (not allowed)', async t => {
  const userId = users[1].id
  const uri = workspaces[0].uri

  await t.throwsAsync(
    X.destroyWorkspaceByUriAs(userId, uri)
  )
})
