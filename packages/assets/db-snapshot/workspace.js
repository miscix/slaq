const { workspaces } = require('..')

const format = data => {
  return {
    uri: data.uri,
    name: data.name,
    created_by: data.createdBy
  }
}

module.exports = workspaces.map(format)
