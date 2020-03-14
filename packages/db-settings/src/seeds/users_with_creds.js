const getenv = require('getenv')
const bcrypt = require('bcrypt')

const { users } = require('@bee/assets/data')

// settings

const saltRounds = getenv.int('BCRYPT_SALT_ROUNDS', 10)

// helpers

const userFrom = data => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    image_url: data.imageUrl
  }
}

const credFrom = data => {
  const hash = bcrypt.hashSync(data.password, saltRounds)

  return {
    user_id: data.id,
    hash
  }
}

// seed

exports.seed = async function (knex) {
  await knex('user').del()
  await knex('user')
    .insert(users.map(userFrom))

  await knex('user_credential').del()
  await knex('user_credential')
    .insert(users.map(credFrom))
}
