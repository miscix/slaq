const BaseModel = require('./internal/BaseModel')

const Credential = require('./Credential')

//

const TABLE_NAME = 'user'

//

const { HasOneRelation } = BaseModel

const relationMappings = {
  credential: {
    relation: HasOneRelation,
    modelClass: Credential,
    join: {
      from: 'user.id',
      to: 'user_credential.user_id'
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
