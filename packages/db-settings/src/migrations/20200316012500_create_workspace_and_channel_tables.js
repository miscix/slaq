exports.up = function (knex) {
  return knex.schema
    .createTable('workspace', tt => {
      // columns

      tt.string('uri')
        .primary()
        .notNullable()

      tt.string('name')
        .notNullable()

      tt.integer('created_by')
        .unsigned()
        .references('user.id')
        .onDelete('CASCADE')
        .notNullable()
    })
    .createTable('workspace_user', tt => {
      // columns

      tt.string('user_id')
        .references('user.id')
        .onDelete('CASCADE')
        .notNullable()

      tt.string('workspace_uri')
        .references('workspace.uri')
        .onDelete('CASCADE')
        .notNullable()

      // constraints

      tt.unique(['user_id', 'workspace_uri'])
    })
    .createTable('channel', tt => {
      // columns

      tt.string('uri')
        .notNullable()

      tt.string('workspace_uri')
        .references('workspace.uri')
        .onDelete('CASCADE')
        .notNullable()

      // constraints

      tt.unique(['uri', 'workspace_uri'])
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('workspace')
    .dropTableIfExists('workspace_user')
    .dropTableIfExists('channel')
}
