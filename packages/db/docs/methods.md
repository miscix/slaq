### Methods

All methods are curried and accept `Knex` instance as the first argument.

#### createUser :: Knex -> UserData -> Promise(User|Error)

#### getUser :: Knex -> Selector -> Promise(User|Error)

#### getUserById :: Knex -> Id -> Promise(User|Error)

#### getUserByEmail :: Knex -> Email -> Promise(User|Error)


#### createWorkspaceAsUser :: Knex -> Id -> WorkspaceData -> Promise(Workspace|Error)

#### getWorkspaceById :: Knex -> Id -> Promise(Workspace)

#### removeWorkspaceById :: Knex -> Id -> Promise


#### addWorkspaceMember :: Knex -> Id -> Id -> Promise

#### getWorkspaceMemberList :: Knex -> Id -> Promise([User]|Error)

#### getWorkspaceOwner :: Knex -> Id -> Promise(User|Error)

#### removeWorkspaceMember :: Knex -> Id -> Id -> Promise

