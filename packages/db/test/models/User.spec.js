const test = require('ava')

const knex = require('../helpers/knex')
const hooks = require('../helpers/hooks')

const DATA = require('../data/snapshot.json')

const User = require('../../src/models/User')

// assets

const [exo, hopar] = DATA.users

// hooks

test.beforeEach(hooks.up(knex))
test.afterEach.always(hooks.down(knex))

// test

test('createOne - ok', async t => {
  const data = {
    name: 'Nyx',
    email: 'nyx@gmail.com',
    password: 'nyx'
  }

  const res = await User.createOne(knex, data)

  t.is(typeof res.id, 'number')

  t.is(res.name, data.name)
  t.is(res.email, data.email)
  t.is(res.password, data.password)
})

test('findOneById - ok', async t => {
  const user = await User.findOneById(knex, exo.id)

  t.deepEqual(user, exo)
})

test('findOneByEmail - ok', async t => {
  const user = await User.findOneByEmail(knex, exo.email)

  t.deepEqual(user, exo)
})

test('findManyByWorkspaceId - ok', async t => {
  const userList = await User.findManyByWorkspaceId(knex, 1)

  t.deepEqual(userList, [exo, hopar])
})
