const getenv = require('getenv')
const bcrypt = require('bcrypt')

const { users } = require('..')

// settings

const saltRounds = getenv.int('BCRYPT_SALT_ROUNDS', 10)

// helpers

const format = data => {
  const hash = bcrypt.hashSync(data.password, saltRounds)

  return {
    user_id: data.id,
    hash
  }
}

// seed

module.exports = users.map(format)
