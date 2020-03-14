const { serial: test } = require('ava')

const http = require('http')
const listen = require('test-listen')
const got = require('got')

const { Model } = require('objection')

const knex = require('@bee/db-query-builder')

const { users } = require('@bee/assets')

const app = require('../..')

//

//

test.before(async t => {
  Model.knex(knex)
})

test.beforeEach(async t => {
  await knex.migrate.latest()
  await knex.seed.run()

  const server = http.createServer(app)
  const baseUrl = await listen(server)

  const request = got.extend({
    prefixUrl: baseUrl,
    responseType: 'json'
  })

  t.context = {
    server,
    request
  }
})

test.afterEach.always(async t => {
  await knex.migrate.rollback()

  t.context.server.close()
})

// tests

// users

test.todo('GET /users/:id - 200')

test('GET /users/:id - 404', async t => {
  const { request } = t.context

  const id = 100

  const { statusCode } = await request.get(`users/${id}`)

  t.is(statusCode, 404)
})

test.todo('PUT /users/:id - 204')
test.todo('PUT /users/:id - 404')

test.todo('GET /users - 200')

// workspaces

test.todo('POST /workspaces/ - 201')
test.todo('POST /workspaces/ - 409')
test.todo('POST /workspaces/ - 422')

test.todo('GET /workspaces/:uri - 200')
test.todo('GET /workspaces/:uri - 403')
test.todo('GET /workspaces/:uri - 404')

test.todo('PUT /workspaces/:uri - 204')
test.todo('PUT /workspaces/:uri - 403')
test.todo('PUT /workspaces/:uri - 422')

test.todo('HEAD /workspaces/:uri - 204')
test.todo('HEAD /workspaces/:uri - 404')

test.todo('DELETE /workspaces/:uri - 204')
test.todo('DELETE /workspaces/:uri - 403')
test.todo('DELETE /workspaces/:uri - 404')

test.todo('GET /workspaces - 200')

// workspace members

test.todo('POST /workspaces/:workspaceUri/members - 204')
test.todo('POST /workspaces/:workspaceUri/members - 403')
test.todo('POST /workspaces/:workspaceUri/members - 409')

test.todo('DELETE /workspaces/:workspaceUri/members/:userId - 204')
test.todo('DELETE /workspaces/:workspaceUri/members/:userId - 403')
test.todo('DELETE /workspaces/:workspaceUri/members/:userId - 404')

test.todo('GET /workspaces/:workspaceUri/members/ - 200')
test.todo('GET /workspaces/:workspaceUri/members/ - 403')

// workspace channels

test.todo('POST /workspaces/:workspaceUri/channels - 201')
test.todo('POST /workspaces/:workspaceUri/channels - 403')
test.todo('POST /workspaces/:workspaceUri/channels - 422')

test.todo('DELETE /workspaces/:workspaceUri/channels/:uri - 204')
test.todo('DELETE /workspaces/:workspaceUri/channels/:uri - 404')

test.todo('GET /workspaces/:workspaceUri/channels/ - 200')
test.todo('GET /workspaces/:workspaceUri/channels/ - 403')
