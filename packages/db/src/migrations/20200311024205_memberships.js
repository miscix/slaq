const TABLE_NAME = 'memberships'

const ROLES = [
  'owner',
  'member'
]

exports.up = async knex => {
  return knex.schema
    .createTable(TABLE_NAME, table => {
      table.enum('role', ROLES).notNull()

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('workspace_id').unsigned().references('workspaces.id').onDelete('CASCADE')

      //
      table.unique(['user_id', 'workspace_id'])
    })
}

exports.down = knex => {
  return knex.schema
    .dropTableIfExists(TABLE_NAME)
}
