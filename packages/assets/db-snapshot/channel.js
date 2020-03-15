const { workspaces } = require('..')

const format = data => {
  const workspaceUri = data.uri
  const channels = data.channels || []

  const rowFor = channelUri => ({
    uri: channelUri,
    workspace_uri: workspaceUri
  })

  return channels.map(rowFor)
}

const concat = (a, b) => [...a, ...b]

module.exports = workspaces
  .map(format)
  .reduce(concat)
