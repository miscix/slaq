const R = require('ramda')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { User } = require('@bee/db-models')

const { JWT_SECRET } = require('../config')

//

const TOKEN_FIELDS = [
  'id',
  'name'
]

//

const payloadFrom = R.pick(TOKEN_FIELDS)

const sign = payload => jwt.sign(payload, JWT_SECRET)

//

async function createToken (loginForm) {
  const { email, password } = loginForm

  const user = await User
    .query()
    .where({ email })
    .first()

  const credential = await user.$relatedQuery('credential')

  const isMatch = await bcrypt.compare(password, credential.hash)

  if (isMatch) {
    return sign(payloadFrom(user))
  }

  return Promise.reject(Error('no'))
}

//

module.exports = createToken
