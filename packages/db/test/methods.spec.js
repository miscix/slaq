const { serial: test } = require('ava')

const knex = require('./helpers/knex')
const hooks = require('./helpers/hooks')

const DATA = require('./data/snapshot.json')

const Methods = require('../src/methods')

// hooks

test.beforeEach(async t => {
  await hooks.up(knex)()

  // partial application
  const methods = Object
    .keys(Methods)
    .reduce((acc, key) => {
      acc[key] = Methods[key](knex)
      return acc
    }, {})

  t.context = {
    methods,
    data: DATA
  }
})

test.afterEach.always(hooks.down(knex))

// test

test('createUser - ok', async t => {
  const { methods: { createUser } } = t.context

  const userData = {
    name: 'Nyx',
    email: 'nyx@gmail.com',
    password: 'nyx'
  }

  const user = await createUser(userData)

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

test('createUser - conflict email', async t => {
  const {
    methods: { createUser },
    data: { users }
  } = t.context

  const user = users[0]

  //

  const err = await t.throwsAsync(createUser(user))

  // TODO: assert unique constraint
  t.true(err instanceof Error)
})

test('getUser', async t => {
  const {
    methods: { getUser },
    data: { users }
  } = t.context

  const user = users[0]

  //

  await getUser({ id: user.id })
    .then(res => {
      t.deepEqual(res, user)
    })

  await getUser({ email: user.email })
    .then(res => {
      t.deepEqual(res, user)
    })
})

// test.todo('getUserBy')

test('getUserById', async t => {
  const {
    methods: { getUserById },
    data: { users }
  } = t.context

  const user = users[0]

  //

  await getUserById(user.id)
    .then(res => {
      t.deepEqual(res, user)
    })
})

test('getUserByEmail', async t => {
  const {
    methods: { getUserByEmail },
    data: { users }
  } = t.context

  const user = users[0]

  //

  await getUserByEmail(user.email)
    .then(res => {
      t.deepEqual(res, user)
    })
})

test.todo('updateUserById')

//

test('createWorkspaceAsUser', async t => {
  const {
    methods: { createWorkspaceAsUser },
    data: { users }
  } = t.context

  const user = users[0]

  const workspaceData = {
    name: 'Other',
    uri: 'other'
  }

  //

  await createWorkspaceAsUser(user.id, workspaceData)
    .then(res => {
      t.not(res.id, undefined)
      t.deepEqual(res, { id: res.id, ...workspaceData })
    })
})

test('getWorkspaceById', async t => {
  const {
    methods: { getWorkspaceById },
    data: { workspaces }
  } = t.context

  const workspace = workspaces[0]

  //

  await getWorkspaceById(workspace.id)
    .then(res => {
      t.deepEqual(res, workspace)
    })
})

test.todo('updateWorkspaceById')

test('removeWorkspaceById', async t => {
  const {
    methods: { removeWorkspaceById },
    data: { workspaces: [workspace] }
  } = t.context

  // act

  await removeWorkspaceById(workspace.id)

  // assert

  await knex('workspaces')
    .where({ id: workspace.id })
    .then(res => {
      t.is(res.length, 0)
    })
})

//

test('getWorkspaceOwner', async t => {
  const {
    methods: { getWorkspaceOwner },
    data: { workspaces, users }
  } = t.context

  const workspace = workspaces[0]
  const user = users[0]

  //

  await getWorkspaceOwner(workspace.id)
    .then(res => {
      t.deepEqual(res, user)
    })
})

test('addWorkspaceMember', async t => {
  const {
    methods: { addWorkspaceMember },
    data: { workspaces, users }
  } = t.context

  const workspace = workspaces[0]
  const user = users[2]

  // act and assert

  await t.notThrowsAsync(
    addWorkspaceMember(workspace.id, user.id)
  )
})

test('getWorkspaceMemberList', async t => {
  const {
    methods: { getWorkspaceMemberList },
    data: { workspaces, users }
  } = t.context

  const workspace = workspaces[0]
  const user = users[1]

  // act and assert

  await getWorkspaceMemberList(workspace.id)
    .then(res => {
      t.true(Array.isArray(res))
      t.deepEqual(res, [user])
    })
})

test('removeWorkspaceMember', async t => {
  const {
    methods: { removeWorkspaceMember },
    data: { workspaces, users }
  } = t.context

  const workspace = workspaces[0]
  const user = users[1]

  // act

  await removeWorkspaceMember(workspace.id, user.id)

  // assert

  await knex('memberships')
    .where({
      role: 'member',
      workspace_id: workspace.id,
      user_id: user.id
    })
    .then(members => {
      t.is(members.length, 0, 'succesfully removed')
    })
})
