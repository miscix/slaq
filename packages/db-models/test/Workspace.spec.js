const { serial: test } = require('ava')

const knex = require('@bee/db-query-builder')

const { workspaces } = require('@bee/assets')

const { Workspace, User, Channel } = require('..')

//

test.beforeEach(async t => {
  await knex.migrate.latest()
  await knex.seed.run()
})

test.afterEach.always(async t => {
  await knex.migrate.rollback()
})

//

test('find by id', async t => {
  const workspace = await Workspace
    .query()
    .findById(workspaces[0].uri)

  t.true(workspace instanceof Workspace)
  t.is(workspace.uri, workspaces[0].uri)
})

test('query related `owner`', async t => {
  const workspace = await Workspace
    .query()
    .findById(workspaces[0].uri)

  await workspace
    .$relatedQuery('owner')
    .then(assertItem)

  function assertItem (item) {
    t.true(item instanceof User)
    t.is(item.id, workspaces[0].createdBy)
  }
})

test('query related `members`', async t => {
  const workspace = await Workspace
    .query()
    .findById(workspaces[0].uri)

  await workspace
    .$relatedQuery('members')
    .then(assertItems)

  function assertItem (item) {
    t.true(item instanceof User)
    t.true(workspaces[0].users.includes(item.id))
  }

  function assertItems (item) {
    t.is(item.length, workspaces[0].users.length)
    item.forEach(assertItem)
  }
})

test('query related `channels`', async t => {
  const workspace = await Workspace
    .query()
    .findById(workspaces[0].uri)

  await workspace
    .$relatedQuery('channels')
    .then(assertItems)

  function assertItem (item) {
    t.true(item instanceof Channel)
    t.true(workspaces[0].channels.includes(item.uri))
  }

  function assertItems (items) {
    t.is(items.length, workspaces[0].channels.length)
    items.forEach(assertItem)
  }
})
