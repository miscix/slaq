const workspaceList = require('@bee/assets/db-snapshot/workspace')
const workspaceUserList = require('@bee/assets/db-snapshot/workspace_user')
const channelList = require('@bee/assets/db-snapshot/channel')

// seed

exports.seed = async function (knex) {
  await knex('workspace').del()
  await knex('workspace')
    .insert(workspaceList)

  await knex('workspace_user').del()
  await knex('workspace_user')
    .insert(workspaceUserList)

  await knex('channel').del()
  await knex('channel')
    .insert(channelList)
}
