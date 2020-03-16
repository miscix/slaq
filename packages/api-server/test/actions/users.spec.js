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

// createUser

test('createUser - ok', async t => {
  const signupForm = {
    name: 'Venus',
    email: 'venus@freenet.am',
    password: 'imyourvenus'
  }

  const user = await X.createUser(signupForm)

  t.not(user.id, undefined)
})

test.todo('createUser - ok (sanitize input)')

test.failing('createToken - fail (invalid data)', async t => {
  const parse = R.compose(
    R.dissoc('id'),
    R.assoc('email', 'email.com')
  )

  const user = users[0]

  const err = await t.throwsAsync(X.createUser(parse(user)))

  t.true(err instanceof Error)
})

test('createToken - fail (duplicate email)', async t => {
  const parse = R.dissoc('id')

  const user = users[0]

  const err = await t.throwsAsync(X.createUser(parse(user)))

  t.true(err instanceof Error)
})

// fetchUserById

test('fetchUserById - ok', async t => {
  const { id } = users[0]

  const user = await X.fetchUserById(id)

  t.is(user.id, id)
})

test('fetchUserById - fail (not found)', async t => {
  const id = 1000

  const err = await t.throwsAsync(X.fetchUserById(id))

  t.true(err instanceof Error)
})

//

test('fetchUserList - ok', async t => {
  const list = await X.fetchUserList()

  t.true(Array.isArray(list))
  t.is(list.length, users.length)
})
