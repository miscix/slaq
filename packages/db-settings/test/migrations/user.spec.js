const { serial: test } = require('ava')

const { knex } = require('../..')

const { users } = require('@bee/assets')

//

const sample = {
  user: {
    id: 3,
    name: 'Venus',
    email: 'venus@freenet.am'
  },
  credential: {
    user_id: 3,
    hash: '$2b$10$Htv7d8U5KeCauRnQx/nbVOI/VDnc6V9FVshTqjnGD8RH84Wtof1de'
  }
}

// hooks

test.beforeEach(async t => {
  await knex.migrate.latest()
  await knex.seed.run()
})

test.afterEach.always(async t => {
  await knex.migrate.rollback()
})

// test

test('required name and email fields', async t => {
  await t.throwsAsync(
    knex('user').insert({
      ...sample.user,
      name: undefined
    })
  )

  await t.throwsAsync(
    knex('user').insert({
      ...sample.user,
      email: undefined
    })
  )

  await t.notThrowsAsync(
    knex('user').insert({
      ...sample.user,
      image_url: undefined
    })
  )
})

test('only one user with given email', async t => {
  const existingUser = users[0]

  await t.throwsAsync(
    knex('user').insert({
      ...sample.user,
      email: existingUser.email
    })
  )
})

test('only one credential row for given user', async t => {
  const existingUser = users[0]

  await t.throwsAsync(
    knex('user_credential').insert({
      ...sample.credential,
      user_id: existingUser.id
    })
  )
})

test('credential cascade on user delete', async t => {
  const user = users[0]

  await knex('user')
    .where({ id: user.id })
    .del()

  await knex('user_credential')
    .where({ user_id: user.id })
    .then(res => {
      t.is(res.length, 0)
    })
})
