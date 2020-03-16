const BaseModel = require('./internal/BaseModel')

//

const { HasOneRelation, HasManyRelation, ManyToManyRelation } = BaseModel

//

class Workspace extends BaseModel {
  static tableName () {
    return 'workspace'
  }

  static idColumn () {
    return 'uri'
  }

  static get relationMappings () {
    const owner = {
      relation: HasOneRelation,
      modelClass: require('./User'),
      join: {
        from: 'workspace.created_by',
        to: 'user.id'
      }
    }

    const members = {
      relation: ManyToManyRelation,
      modelClass: require('./User'),
      join: {
        from: 'workspace.uri',
        through: {
          // persons_movies is the join table.
          from: 'workspace_user.workspace_uri',
          to: 'workspace_user.user_id'
        },
        to: 'user.id'
      }
    }

    const channels = {
      relation: HasManyRelation,
      modelClass: require('./Channel'),
      join: {
        from: 'workspace.uri',
        to: 'channel.workspace_uri'
      }
    }

    return {
      owner,
      members,
      channels
    }
  }
}

module.exports = Workspace
