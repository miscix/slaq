const { workspaces } = require('..')

const format = data => {
  const workspaceUri = data.uri
  const users = data.users || []

  const rowFor = userId => ({
    user_id: userId,
    workspace_uri: workspaceUri
  })

  return users.map(rowFor)
}

const concat = (a, b) => [...a, ...b]

module.exports = workspaces
  .map(format)
  .reduce(concat)
