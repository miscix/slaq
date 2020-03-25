const { serial: test } = require('ava')

const knex = require('@bee/db-query-builder')

const { users } = require('@bee/assets')

const setup = require('../helpers/http-setup')

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

test('POST /tokens - 201', async t => {
  const { requestNoAuth: request } = t.context

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
  const { requestNoAuth: request } = t.context

  const user = users[0]

  const form = {
    email: user.email,
    password: user.password + 'xx'
  }

  await t.throwsAsync(
    request.post('tokens', { json: form }),
    { message: /Unauthorized/ }
  )

  // TODO: assert status code = 401
})
