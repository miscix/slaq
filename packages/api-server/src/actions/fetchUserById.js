const { User } = require('@bee/db-models')

const errorFrom = require('../helpers/error-handler-db')

//

async function fetchUserById (id) {
  return User
    .query()
    .findById(id)
    .throwIfNotFound()
    .catch(errorFrom)
}

//

module.exports = fetchUserById
