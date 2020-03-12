// createUser :: Knex -> UserData -> Promise(User|Error)
module.exports.createUser = require('./createUser')
// getUser :: Knex -> Selector -> Promise(User|Error)
module.exports.getUser = require('./getUser')
// getUserById :: Knex -> Id -> Promise(User|Error)
module.exports.getUserById = require('./getUserById')
// getUserByEmail :: Knex -> Email -> Promise(User|Error)
module.exports.getUserByEmail = require('./getUserByEmail')

// createWorkspaceAsUser :: Knex -> Id -> WorkspaceData -> Promise(Workspace|Error)
module.exports.createWorkspaceAsUser = require('./createWorkspaceAsUser')
// getWorkspaceById :: Knex -> Id -> Promise(Workspace)
module.exports.getWorkspaceById = require('./getWorkspaceById')
// removeWorkspaceById :: Knex -> Id -> Promise
module.exports.removeWorkspaceById = require('./removeWorkspaceById')

// addWorkspaceMember :: Knex -> Id -> Id -> Promise
module.exports.addWorkspaceMember = require('./addWorkspaceMember')
// getWorkspaceMemberList :: Knex -> Id -> Promise([User]|Error)
module.exports.getWorkspaceMemberList = require('./getWorkspaceMemberList')
// getWorkspaceOwner :: Knex -> Id -> Promise(User|Error)
module.exports.getWorkspaceOwner = require('./getWorkspaceOwner')
// removeWorkspaceMember :: Knex -> Id -> Id -> Promise
module.exports.removeWorkspaceMember = require('./removeWorkspaceMember')
