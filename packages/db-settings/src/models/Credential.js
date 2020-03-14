const BaseModel = require('./internal/BaseModel')

//

const TABLE_NAME = 'user_credentials'

//

class Credential extends BaseModel {
  static get tableName () {
    return TABLE_NAME
  }
}

//

module.exports = Credential
