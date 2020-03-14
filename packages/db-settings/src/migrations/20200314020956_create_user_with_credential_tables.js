exports.up = function (knex) {
  return knex.schema
    .createTable('user', tt => {
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
    .createTable('user_credential', tt => {
      // columns

      tt.integer('user_id')
        .unsigned()
        .references('user.id')
        .onDelete('CASCADE')

      tt.string('hash', 60)
        .notNullable()

      tt.unique('user_id')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('user')
    .dropTableIfExists('user_credential')
}
