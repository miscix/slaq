const { serial: test } = require('ava')

const knex = require('@bee/db-query-builder')

const { users } = require('@bee/assets')

const { User, UserCredential, Workspace } = require('..')

//

test.beforeEach(async t => {
  await knex.migrate.latest()
  await knex.seed.run()
})

test.afterEach.always(async t => {
  await knex.migrate.rollback()
})

test('query related `credential`', async t => {
  const user = await User
    .query()
    .where({ email: users[0].email })
    .first()

  await user
    .$relatedQuery('credential')
    .then(assertItem)

  function assertItem (item) {
    t.not(item.userId, undefined)
    t.not(item.hash, undefined)
  }
})

test('query related `workspaces`', async t => {
  const user = await User
    .query()
    .findById(users[0].id)

  await user
    .$relatedQuery('workspaces')
    .then(assertItems)

  function assertItem (item) {
    t.true(item instanceof Workspace)
  }

  function assertItems (items) {
    items.forEach(assertItem)
  }
})

test('query related `ownerOf`', async t => {
  const user = await User
    .query()
    .findById(users[0].id)

  await user
    .$relatedQuery('ownerOf')
    .then(assertItems)

  function assertItem (item) {
    t.true(item instanceof Workspace)
  }

  function assertItems (items) {
    items.forEach(assertItem)
  }
})
