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

// workspaces

test.todo('POST /workspaces - 201')
test.todo('POST /workspaces - 401')
test.todo('POST /workspaces - 409')
test.todo('POST /workspaces - 422')

test.todo('GET /workspaces - 200')
test.todo('GET /workspaces - 401')

test.todo('GET /workspaces/:uri - 200')
test.todo('GET /workspaces/:uri - 401')
test.todo('GET /workspaces/:uri - 403')
test.todo('GET /workspaces/:uri - 404')

test.todo('PUT /workspaces/:uri - 204')
test.todo('PUT /workspaces/:uri - 401')
test.todo('PUT /workspaces/:uri - 403')
test.todo('PUT /workspaces/:uri - 422')

test.todo('HEAD /workspaces/:uri - 204')
test.todo('HEAD /workspaces/:uri - 401')
test.todo('HEAD /workspaces/:uri - 404')

test.todo('DELETE /workspaces/:uri - 204')
test.todo('DELETE /workspaces/:uri - 401')
test.todo('DELETE /workspaces/:uri - 403')
test.todo('DELETE /workspaces/:uri - 404')

// workspace members

test.todo('POST /workspaces/:workspaceUri/members - 204')
test.todo('POST /workspaces/:workspaceUri/members - 401')
test.todo('POST /workspaces/:workspaceUri/members - 403')
test.todo('POST /workspaces/:workspaceUri/members - 409')

test.todo('DELETE /workspaces/:workspaceUri/members/:userId - 204')
test.todo('DELETE /workspaces/:workspaceUri/members/:userId - 401')
test.todo('DELETE /workspaces/:workspaceUri/members/:userId - 403')
test.todo('DELETE /workspaces/:workspaceUri/members/:userId - 404')
