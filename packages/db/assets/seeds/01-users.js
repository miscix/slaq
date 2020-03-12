const { users } = require('../data')

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(users)
}
