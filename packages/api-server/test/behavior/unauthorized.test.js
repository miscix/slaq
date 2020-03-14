const { serial: test } = require('ava')

const http = require('http')
const listen = require('test-listen')
const got = require('got')

const { users } = require('@bee/assets')

const knex = require('../../src/knex')

const app = require('../..')

// hooks

test.beforeEach(async t => {
  // init db
  await knex.migrate.latest()
  await knex.seed.run()

  // init server
  const server = http.createServer(app)
  const baseUrl = await listen(server)

  // setup client
  const request = got.extend({
    prefixUrl: baseUrl,
    responseType: 'json'
  })

  // provide context
  t.context = {
    server,
    request
  }
})

test.afterEach.always(async t => {
  // drop db
  await knex.migrate.rollback()

  // close server
  t.context.server.close()
})

// tests

// tokens

test('POST /tokens - 201', async t => {
  const { request } = t.context

  const user = users[0]

  const form = {
    email: user.email,
    password: user.password
  }

  const { statusCode, body } = await request
    .post('tokens', { json: form })

  t.is(statusCode, 201)
  t.is(typeof body.token, 'string')
})

test('POST /tokens - 401', async t => {
  const { request } = t.context

  const user = users[0]

  const form = {
    email: user.email,
    password: user.password + 'xx'
  }

  await t.throwsAsync(
    request.post('tokens', { json: form })
  )

  // TODO: assert status code = 401
})

// users

test('POST /users - 201', async t => {
  const { request } = t.context

  const form = {
    name: 'Venus',
    email: 'venus@freenet.am',
    password: 'imyourvenus'
  }

  const { statusCode } = await request
    .post('users', { json: form })

  t.is(statusCode, 201)
})

test('POST /users - 409', async t => {
  const { request } = t.context

  const form = users[0]

  await t.throwsAsync(
    request.post('users', { json: form })
  )

  // TODO: assert 409
})

test.todo('POST /users - 422')

test.todo('GET /users/:id - 401')
test.todo('PUT /users/:id - 401')

test('GET /users - 401', async t => {
  const { request } = t.context

  await request
    .get('users')
    .catch(err => {
      t.is(err.response.statusCode, 401)
    })
})

// workspaces

test.todo('GET /workspaces - 401')
test.todo('POST /workspaces/ - 401')
test.todo('GET /workspaces/:uri - 401')
test.todo('PUT /workspaces/:uri - 401')
test.todo('DELETE /workspaces/:uri - 401')

// workspace members

test.todo('GET /workspaces/:workspaceUri/members - 401')
test.todo('POST /workspaces/:workspaceUri/members - 401')
test.todo('DELETE /workspaces/:workspaceUri/members/:userId - 401')

// workspace channels

test.todo('GET /workspaces/:workspaceUri/channels - 401')
test.todo('POST /workspaces/:workspaceUri/channels - 401')
test.todo('DELETE /workspaces/:workspaceUri/channels/:uri - 401')
