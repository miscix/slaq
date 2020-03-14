const { serial: test } = require('ava')

const http = require('http')
const listen = require('test-listen')
const got = require('got')
const jwt = require('jsonwebtoken')

const knex = require('@bee/db-query-builder')

const { users } = require('@bee/assets')

const { JWT_SECRET } = require('../../src/config')

const app = require('../..')

//

//

test.beforeEach(async t => {
  await knex.migrate.latest()
  await knex.seed.run()

  const server = http.createServer(app)
  const baseUrl = await listen(server)

  const token = jwt.sign(users[0], JWT_SECRET)

  const request = got.extend({
    prefixUrl: baseUrl,
    responseType: 'json',
    headers: {
      Authorization: `Bearer ${token}`
    }
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

test('GET /users/:id - 200', async t => {
  const { request } = t.context

  const user = users[0]

  const { statusCode, body } = await request.get(`users/${user.id}`)

  t.is(statusCode, 200)

  t.is(body.name, user.name)
  t.is(body.imageUrl, user.imageUrl)
})

test('GET /users/:id - 404', async t => {
  const { request } = t.context

  const id = 100

  await t.throwsAsync(request.get(`users/${id}`))
  // TODO: assert status code = 404
})

test.todo('PUT /users/:id - 204')
test.todo('PUT /users/:id - 404')

test('GET /users - 200', async t => {
  const { request } = t.context

  await request
    .get('users')
    .then(({ body, statusCode }) => {
      t.is(statusCode, 200)
      t.is(body.items.length, 2)
    })
})

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
