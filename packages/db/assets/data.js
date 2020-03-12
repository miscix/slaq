
const users = [
  {
    id: 1,
    name: 'Exo',
    email: 'exo@gmail.com',
    password: 'exo'
  },
  {
    id: 2,
    name: 'Hopar',
    email: 'hopar@gmail.com',
    password: 'hopar'
  },
  {
    id: 3,
    name: 'Venus',
    email: 'venus@gmail.com',
    password: 'venus'
  }
]

const workspaces = [
  {
    id: 1,
    name: 'Local',
    uri: 'local'
  },
  {
    id: 2,
    name: 'Global',
    uri: 'global'
  }
]

const memberships = [
  {
    role: 'owner',
    user_id: 1,
    workspace_id: 1
  },
  {
    role: 'member',
    user_id: 2,
    workspace_id: 1
  },
  {
    role: 'owner',
    user_id: 3,
    workspace_id: 2
  },
  {
    role: 'member',
    user_id: 2,
    workspace_id: 2
  }
]

module.exports = {
  users,
  workspaces,
  memberships
}
