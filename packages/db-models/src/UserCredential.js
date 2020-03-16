const BaseModel = require('./internal/BaseModel')

class Credential extends BaseModel {
  static get tableName () {
    return 'user_credential'
  }
}

module.exports = Credential
