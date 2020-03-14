const BaseModel = require('./internal/BaseModel')

//

const TABLE_NAME = 'user_credential'

//

class Credential extends BaseModel {
  static get tableName () {
    return TABLE_NAME
  }
}

//

module.exports = Credential
