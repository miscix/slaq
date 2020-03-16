const { serial: test } = require('ava')

const setup = require('../helpers/http-setup')

const knex = require('@bee/db-query-builder')

// const { users } = require('@bee/assets')

//

test.beforeEach(async t => {
  await knex.migrate.latest()
  await knex.seed.run()

  t.context = await setup()
})

test.afterEach.always(async t => {
  await knex.migrate.rollback()

  t.context.server.close()
})

// tests

// workspace channels

test.todo('POST /workspaces/:workspaceUri/channels - 201')
test.todo('POST /workspaces/:workspaceUri/channels - 401')
test.todo('POST /workspaces/:workspaceUri/channels - 403')
test.todo('POST /workspaces/:workspaceUri/channels - 409')
test.todo('POST /workspaces/:workspaceUri/channels - 422')

test.todo('DELETE /workspaces/:workspaceUri/channels/:uri - 204')
test.todo('DELETE /workspaces/:workspaceUri/channels/:uri - 401')
test.todo('DELETE /workspaces/:workspaceUri/channels/:uri - 403')
test.todo('DELETE /workspaces/:workspaceUri/channels/:uri - 404')

test.todo('GET /workspaces/:workspaceUri/channels/ - 200')
test.todo('GET /workspaces/:workspaceUri/channels/ - 401')
test.todo('GET /workspaces/:workspaceUri/channels/ - 403')
