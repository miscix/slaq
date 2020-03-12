const TABLE_NAME = 'workspaces'

exports.up = knex => {
  return knex.schema
    .createTable(TABLE_NAME, table => {
      table.increments('id').unsigned().primary()
      table.string('uri').unique().notNullable()
      table.string('name').notNullable()
    })
}

exports.down = knex => {
  return knex.schema
    .dropTableIfExists(TABLE_NAME)
}
