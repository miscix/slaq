const http = require('http')
const listen = require('test-listen')
const got = require('got')
const jwt = require('jsonwebtoken')

const { users } = require('@bee/assets')

const app = require('../..')

const { JWT_SECRET } = require('../../src/config')

async function setup () {
  // init server
  const server = http.createServer(app)
  const baseUrl = await listen(server)

  // setup clients
  const requestNoAuth = got.extend({
    prefixUrl: baseUrl,
    responseType: 'json'
  })

  const user = users[0]
  const token = jwt.sign(users[0], JWT_SECRET)

  const request = requestNoAuth.extend({
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return {
    server,
    request,
    requestNoAuth,
    user
  }
}

module.exports = setup
