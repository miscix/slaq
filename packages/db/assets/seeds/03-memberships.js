const { memberships } = require('../data')

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('memberships').del()
  await knex('memberships').insert(memberships)
}
