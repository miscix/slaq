const { User } = require('@bee/db-models')

//

async function fetchUserList () {
  return User.query()
}

//

module.exports = fetchUserList
