const { serial: test } = require('ava')

const http = require('http')
const listen = require('test-listen')
const got = require('got')

const app = require('../..')
const DATA = require('../../src/data')

test.beforeEach(async t => {
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
  t.context.server.close()
})

// tests

// tokens

test('POST /tokens - 201', async t => {
  const { request } = t.context

  const user = DATA.users[0]

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

  const user = DATA.users[0]

  const form = {
    email: user.email,
    password: user.password + 'xx'
  }

  await request
    .post('tokens', { json: form })
    .catch(err => {
      t.is(err.response.statusCode, 401)
    })
})

// users

test('POST /users - 201', async t => {
  const { request } = t.context

  const form = {
    name: 'Nyx',
    email: 'nyx@gmail.com',
    password: 'nyx'
  }

  const { statusCode } = await request
    .post('users', { json: form })

  t.is(statusCode, 201)
})

test.todo('POST /users - 409')
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

test.todo('POST /workspaces/ - 401')
test.todo('GET /workspaces/:workspaceUri - 401')
test.todo('PUT /workspaces/:workspaceUri - 401')
test.todo('DELETE /workspaces/:workspaceUri - 401')

test.todo('GET /workspaces - 401')

// workspace members

test.todo('POST /workspaces/:workspaceUri/members - 401')
test.todo('DELETE /workspaces/:workspaceUri/members/:userId - 401')

test.todo('GET /workspaces/:workspaceUri/members/ - 401')

// workspace channels

test.todo('POST /workspaces/:workspaceUri/channels - 401')
test.todo('DELETE /workspaces/:workspaceUri/channels/:channelUri - 401')

test.todo('GET /workspaces/:workspaceUri/channels/ - 401')
