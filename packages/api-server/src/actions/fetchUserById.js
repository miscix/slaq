const { User } = require('@bee/db-models')

//

const assertResult = res => {
  if (res) {
    return res
  }

  const err = new Error('not found')
  return Promise.reject(err)
}

//

async function fetchUserById (id) {
  return User
    .query()
    .findById(id)
    .then(assertResult)
}

//

module.exports = fetchUserById
