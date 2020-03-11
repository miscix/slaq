const { workspaces } = require('./snapshot.json')

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('workspaces').del()
  await knex('workspaces').insert(workspaces)
}
