const { workspaces } = require('../data')

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('workspaces').del()
  await knex('workspaces').insert(workspaces)
}
