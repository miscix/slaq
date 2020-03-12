const { serial: test } = require('ava')

const knex = require('../helpers/knex')
const hooks = require('../helpers/hooks')

// hooks

test.beforeEach(hooks.up)
test.afterEach.always(hooks.down)

// test

test.todo('required fields')

test('unique `user_id`+`workspace_id`', async t => {
  await t.throwsAsync(
    knex('memberships').insert({
      role: 'owner',
      user_id: 1,
      workspace_id: 1
    })
  )

  await t.throwsAsync(
    knex('memberships').insert({
      role: 'member',
      user_id: 1,
      workspace_id: 1
    })
  )
})

test('`role` is "member" or "owner"', async t => {
  await t.throwsAsync(
    knex('memberships').insert({
      role: 'ghost',
      user_id: 1,
      workspace_id: 2
    })
  )

  await t.notThrowsAsync(
    knex('memberships').insert({
      role: 'member',
      user_id: 1,
      workspace_id: 2
    })
  )
})

test('ensure correspond ref. row', async t => {
  // user {id = 4} not exists
  await t.throwsAsync(
    knex('memberships').insert({
      role: 'member',
      user_id: 4,
      workspace_id: 2
    })
  )

  // workspace {id = 3} not exists
  await t.throwsAsync(
    knex('memberships').insert({
      role: 'member',
      user_id: 2,
      workspace_id: 3
    })
  )
})

test('cascade on delete user', async t => {
  await knex('users')
    .where({ id: 2 })
    .del()

  await knex('memberships')
    .where('user_id', 2)
    .select()
    .then(results => t.is(results.length, 0))
})

test('cascade on delete workspace', async t => {
  await knex('workspaces')
    .where({ id: 2 })
    .del()

  await knex('memberships')
    .where('workspace_id', 2)
    .select()
    .then(results => t.is(results.length, 0))
})

