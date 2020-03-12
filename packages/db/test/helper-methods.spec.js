const { serial: test } = require('ava')

const knex = require('./helpers/knex')
const hooks = require('./helpers/hooks')

const DATA = require('../assets/data')
const METHODS = require('../src/methods/helpers')

test.beforeEach(async t => {
  await hooks.up()

  // partial application
  const methods = Object
    .keys(METHODS)
    .reduce((acc, key) => {
      acc[key] = METHODS[key](knex)
      return acc
    }, {})

  t.context = {
    methods,
    data: DATA
  }
})

test.afterEach.always(hooks.down)

test('insertOneInto', async t => {
  const { methods: { insertOneInto } } = t.context

  const userData = {
    name: 'Nyx',
    email: 'nyx@gmail.com',
    password: 'nyx'
  }

  const user = await insertOneInto('users', userData)

  // assert return

  t.not(user.id, 'undefined')
  t.deepEqual(
    user,
    { id: user.id, ...userData }
  )

  // assert effect

  await knex('users')
    .where({ id: user.id })
    .then(res => {
      t.deepEqual(res, [user])
    })
})

test('findOneFrom', async t => {
  const {
    methods: { findOneFrom },
    data: { users }
  } = t.context

  const user = users[0]

  //

  await findOneFrom('users', { id: user.id })
    .then(res => {
      t.deepEqual(res, user)
    })

  await findOneFrom('users', { email: user.email })
    .then(res => {
      t.deepEqual(res, user)
    })
})

test('deleteOneFrom', async t => {
  const {
    methods: { deleteOneFrom },
    data: { users }
  } = t.context

  const user = users[0]

  //

  await deleteOneFrom('users', { id: user.id })

  // assert effect
  await knex('users')
    .where({ id: user.id })
    .then(res => {
      t.is(res.length, 0)
    })
})
