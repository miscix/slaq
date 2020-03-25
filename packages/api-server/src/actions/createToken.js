const R = require('ramda')
const createError = require('http-errors')
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

const rejectAsUnauthorized = () => {
  const err = createError(401)
  return Promise.reject(err)
}

const assertUserExists = R.when(R.isNil, rejectAsUnauthorized)

const payloadFrom = R.pick(TOKEN_FIELDS)

const sign = payload => jwt.sign(payload, JWT_SECRET)

//

async function createToken (loginForm) {
  const { email, password } = loginForm

  const user = await User
    .query()
    .where({ email })
    .first()
    .then(assertUserExists)

  const credential = await user.$relatedQuery('credential')

  return bcrypt.compareSync(password, credential.hash)
    ? sign(payloadFrom(user))
    : rejectAsUnauthorized()
}

//

module.exports = createToken
