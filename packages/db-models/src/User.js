const BaseModel = require('./internal/BaseModel')

//

const { HasOneRelation, HasManyRelation, ManyToManyRelation } = BaseModel

//

class User extends BaseModel {
  static tableName () {
    return 'user'
  }

  static get relationMappings () {
    const credential = {
      relation: HasOneRelation,
      modelClass: require('./UserCredential'),
      join: {
        from: 'user.id',
        to: 'user_credential.user_id'
      }
    }

    const workspaces = {
      relation: ManyToManyRelation,
      modelClass: require('./Workspace'),
      join: {
        from: 'user.id',
        through: {
          from: 'workspace_user.user_id',
          to: 'workspace_user.workspace_uri'
        },
        to: 'workspace.uri'
      }
    }

    const ownerOf = {
      relation: HasManyRelation,
      modelClass: require('./Workspace'),
      join: {
        from: 'user.id',
        to: 'workspace.created_by'
      }
    }

    return {
      credential,
      workspaces,
      ownerOf
    }
  }
}

module.exports = User
