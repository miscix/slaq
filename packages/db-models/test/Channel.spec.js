const { serial: test } = require('ava')

const knex = require('@bee/db-query-builder')

const { workspaces } = require('@bee/assets')

const { Channel, Workspace } = require('..')

//

test.beforeEach(async t => {
  await knex.migrate.latest()
  await knex.seed.run()
})

test.afterEach.always(async t => {
  await knex.migrate.rollback()
})

test('find by composite id', async t => {
  const uri = workspaces[0].channels[0]
  const workspaceUri = workspaces[0].uri

  const channel = await Channel
    .query()
    .findById([workspaceUri, uri])

  t.true(channel instanceof Channel)
})

test('query related `workspace`', async t => {
  const uri = workspaces[0].channels[0]
  const workspaceUri = workspaces[0].uri

  const channel = await Channel
    .query()
    .findById([workspaceUri, uri])

  await channel
    .$relatedQuery('workspace')
    .then(assertItem)

  function assertItem (item) {
    t.true(item instanceof Workspace)
    t.is(item.uri, workspaceUri)
  }
})
