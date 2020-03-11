const test = require('ava')

const knex = require('../helpers/knex')
const hooks = require('../helpers/hooks')

const DATA = require('../data/snapshot.json')

const Workspace = require('../../src/models/Workspace')

// assets

const [local, global] = DATA.workspaces

// hooks

test.beforeEach(hooks.up(knex))
test.afterEach.always(hooks.down(knex))

// test

test('createOneWithOwnerId - ok', async t => {
  const data = {
    uri: 'private',
    name: 'Private'
  }

  const res = await Workspace.createOneWithOwnerId(knex, 1, data)

  t.is(typeof res.id, 'number')
})

test('findOneById - ok', async t => {
  const workspace = await Workspace.findOneById(knex, local.id)

  t.deepEqual(workspace, local)
})

test('findManyByUserId - ok', async t => {
  await Workspace
    .findManyByUserId(knex, 1)
    .then(workspaceList => {
      t.deepEqual(workspaceList, [local])
    })

  await Workspace
    .findManyByUserId(knex, 2)
    .then(workspaceList => {
      t.deepEqual(workspaceList, [local, global])
    })
})

test('removeOneById - ok', async t => {
  await t.notThrowsAsync(
    Workspace.removeOneById(knex, 1)
  )
})

test('addUserByIdAs - ok', async t => {
  await t.notThrowsAsync(
    Workspace.addUserByIdAs(knex, 'owner', 3, 1)
  )

  await knex('memberships')
    .where({
      user_id: 3,
      workspace_id: 1
    })
    .then(res => {
      t.is(res.length, 1)
    })
})

test('addUserByIdAs - conflict', async t => {
  await t.throwsAsync(
    Workspace.addUserByIdAs(knex, 'owner', 1, 1)
  )
})

test('addUserByIdAs - missing ref. row', async t => {
  // no user
  await t.throwsAsync(
    Workspace.addUserByIdAs(knex, 'owner', 4, 1)
  )

  // no workspace
  await t.throwsAsync(
    Workspace.addUserByIdAs(knex, 'owner', 1, 3)
  )
})

test.todo('updateById')
