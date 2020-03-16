const { serial: test } = require('ava')

const R = require('ramda')

const knex = require('@bee/db-query-builder')

const { workspaces } = require('@bee/assets')

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

// workspaces

test('POST /workspaces - 201', async t => {
  const { request, user } = t.context

  const form = {
    uri: 'x-corp',
    name: 'X Corp.'
  }

  const { statusCode, body } = await request
    .post('workspaces', { json: form })

  t.is(statusCode, 201)
  t.is(body.uri, form.uri)
  t.is(body.createdBy, user.id)
})

test('POST /workspaces - 401', async t => {
  const { requestNoAuth: request } = t.context

  const form = {
    uri: 'x-corp',
    name: 'X Corp.'
  }

  await t.throwsAsync(
    request.post('workspaces', { json: form }),
    { instanceOf: Error } // TODO: assert 401
  )
})

test('POST /workspaces - 409', async t => {
  const { request } = t.context

  const parse = R.pick(['uri', 'name'])

  const form = parse(workspaces[0])

  await t.throwsAsync(
    request.post('workspaces', { json: form }),
    { instanceOf: Error } // TODO: assert 409
  )
})

test.failing('POST /workspaces - 422', async t => {
  const { request } = t.context

  const form = {
    uri: 'x-corp',
    name: ''
  }

  await t.throwsAsync(
    request.post('workspaces', { json: form }),
    { instanceOf: Error } // TODO: assert 409
  )
})

//

test.todo('GET /workspaces - 200')
test.todo('GET /workspaces - 401')

//

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
