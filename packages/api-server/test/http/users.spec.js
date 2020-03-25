const { serial: test } = require('ava')

const setup = require('../helpers/http-setup')

const knex = require('@bee/db-query-builder')

const { users } = require('@bee/assets')

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

test('POST /users - 201', async t => {
  const { requestNoAuth: request } = t.context

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
  const { requestNoAuth: request } = t.context

  const form = users[0]

  await t.throwsAsync(
    request.post('users', { json: form }),
    { message: /Conflict/ }
  )
})

test.todo('POST /users - 422')

test('GET /users - 200', async t => {
  const { request } = t.context

  await request
    .get('users')
    .then(({ body, statusCode }) => {
      t.is(statusCode, 200)
      t.is(body.items.length, 2)
    })
})

test('GET /users - 401', async t => {
  const { requestNoAuth: request } = t.context

  await t.throwsAsync(
    request.get('users'),
    { message: /Unauthorized/ }
  )
})

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

  await t.throwsAsync(
    request.get(`users/${id}`),
    { message: /Not Found/ }
  )
})

test.todo('GET /users/:id - 401')

test.todo('PUT /users/:id - 204')
test.todo('PUT /users/:id - 404')
test.todo('PUT /users/:id - 401')

