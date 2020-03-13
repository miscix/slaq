const { serial: test } = require('ava')

const http = require('http')
const listen = require('test-listen')
const got = require('got')

const app = require('../..')

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

test('POST /tokens - 401', async t => {
  const { request } = t.context

  const data = {
    email: 'wrong@email.com',
    password: 'no-password'
  }

  const { statusCode } = await request.post('tokens', data)

  t.is(statusCode, 401)
})

// users

test.todo('POST /users - 201')
test.todo('POST /users - 409')
test.todo('POST /users - 422')

test.todo('GET /users/:userId - 401')
test.todo('PUT /users/:userId - 401')
test.todo('GET /users - 401')

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