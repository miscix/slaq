exports.up = function (knex) {
  return knex.schema
    .createTable('users', tt => {
      // columns

      tt.increments('id')
        .unsigned()
        .primary()

      tt.string('name')
        .notNullable()

      tt.string('email')
        .notNullable()

      tt.string('image_url')

      // constraints

      tt.unique('email')
    })
    .createTable('user_credentials', tt => {
      // columns

      tt.integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')

      tt.string('hash', 60)
        .notNullable()

      tt.unique('user_id')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('user_credentials')
}
