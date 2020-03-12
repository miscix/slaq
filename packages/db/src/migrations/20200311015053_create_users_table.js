const TABLE_NAME = 'users'

exports.up = knex => {
  return knex.schema
    .createTable(TABLE_NAME, table => {
      table.increments('id').unsigned().primary()
      table.string('email').unique().notNullable()
      table.string('name').notNullable()
      table.string('password').notNullable()
    })
}

exports.down = knex => {
  return knex.schema
    .dropTableIfExists(TABLE_NAME)
}
