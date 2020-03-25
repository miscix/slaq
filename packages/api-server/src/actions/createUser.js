const R = require('ramda')
const bcrypt = require('bcrypt')

const fromDbError = require('../helpers/error-handler-db')
const { User } = require('@bee/db-models')

// settings

const BCRYPT_SALT_ROUNDS = 10

//

const hashSync = password =>
  bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS)

// userFrom :: SignupForm -> User
const userFrom = R.dissoc('password')

// credentialFrom :: SignupForm -> Credential
const credentialFrom = R.compose(
  R.objOf('hash'),
  hashSync,
  R.prop('password')
)

// graphFrom :: SignupForm -> Graph (User, Credential)
const graphFrom = R.converge(
  R.assoc('credential'),
  [credentialFrom, userFrom]
)

//

async function createUser (signupForm) {
  const graph = graphFrom(signupForm)

  return User
    .query()
    .insertGraph(graph)
    .catch(fromDbError)
}

//

module.exports = createUser
