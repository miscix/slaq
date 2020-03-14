const userList = require('@bee/assets/db-snapshot/user')
const credList = require('@bee/assets/db-snapshot/user_credential')

// seed

exports.seed = async function (knex) {
  await knex('user').del()
  await knex('user')
    .insert(userList)

  await knex('user_credential').del()
  await knex('user_credential')
    .insert(credList)
}
