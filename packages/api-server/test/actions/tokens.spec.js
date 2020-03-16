const { serial: test } = require('ava')

const R = require('ramda')
const jwt = require('jsonwebtoken')

const knex = require('@bee/db-query-builder')

const { users } = require('@bee/assets')

const X = require('../../src/actions')

//

test.beforeEach(async t => {
  await knex.migrate.latest()
  await knex.seed.run()
})

test.afterEach.always(async t => {
  await knex.migrate.rollback()
})

// tests

test('createToken - ok (exact match)', async t => {
  const parse = R.pick(['email', 'password'])

  const user = users[0]
  const loginForm = parse(user)

  const token = await X.createToken(loginForm)

  t.is(typeof token, 'string')

  const decodedToken = jwt.decode(token)
  t.is(decodedToken.id, user.id)
})

test.todo('createToken - ok (email case)')
test.todo('createToken - ok (email trailing whitespace)')

test('createToken - fail (wrong email)', async t => {
  const parse = R.compose(
    R.pick(['email', 'password']),
    R.assoc('email', 'no@email.com')
  )

  const user = users[0]

  const err = await t.throwsAsync(X.createToken(parse(user)))

  t.true(err instanceof Error)
})

test('createToken - fail (wrong password)', async t => {
  const parse = R.compose(
    R.pick(['email', 'password']),
    R.assoc('password', 'wr0ng password')
  )

  const user = users[0]

  const err = await t.throwsAsync(X.createToken(parse(user)))

  t.true(err instanceof Error)
})
