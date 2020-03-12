const { serial: test } = require('ava')

const http = require('http')
const listen = require('test-listen')
const got = require('got')

const createApp = require('..')

test.beforeEach(async t => {
  const app = createApp()
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

test('GET /info - 200', async t => {
  const { request } = t.context

  const { statusCode, body } = await request.get('info')

  t.is(statusCode, 200)
  t.is(body.ok, true)
})
