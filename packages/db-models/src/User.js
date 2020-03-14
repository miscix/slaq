const BaseModel = require('./internal/BaseModel')

//

const { HasOneRelation } = BaseModel

//

class Credential extends BaseModel {
  static get tableName () {
    return 'user_credential'
  }
}

//

class User extends BaseModel {
  static tableName () {
    return 'user'
  }

  static get relationMappings () {
    const credential = {
      relation: HasOneRelation,
      modelClass: Credential,
      join: {
        from: 'user.id',
        to: 'user_credential.user_id'
      }
    }

    return {
      credential
    }
  }
}

module.exports = User
