const BaseModel = require('./internal/BaseModel')

const Credential = require('./Credential')

//

const TABLE_NAME = 'users'

//

const { HasOneRelation } = BaseModel

const relationMappings = {
  credential: {
    relation: HasOneRelation,
    modelClass: Credential,
    join: {
      from: 'users.id',
      to: 'user_credentials.user_id'
    }
  }
}

//

class User extends BaseModel {
  static tableName () {
    return TABLE_NAME
  }

  static get relationMappings () {
    return relationMappings
  }
}

module.exports = User
