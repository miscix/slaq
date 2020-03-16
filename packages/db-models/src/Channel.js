const BaseModel = require('./internal/BaseModel')

//

const { HasOneRelation } = BaseModel

//

class Channel extends BaseModel {
  static tableName () {
    return 'channel'
  }

  static idColumn () {
    return ['workspace_uri', 'uri']
  }

  static get relationMappings () {
    const workspace = {
      relation: HasOneRelation,
      modelClass: require('./Workspace'),
      join: {
        from: 'channel.workspace_uri',
        to: 'workspace.uri'
      }
    }

    return {
      workspace
    }
  }
}

module.exports = Channel


