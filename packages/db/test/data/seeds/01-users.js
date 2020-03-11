const { users } = require('./snapshot.json')

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(users)
}
