module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './tmp/dev.sqlite3'
    },
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate (conn, done) {
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    },
    useNullAsDefault: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './tmp/test.sqlite3'
    },
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './test/data/seeds'
    },
    pool: {
      afterCreate (conn, done) {
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    },
    useNullAsDefault: true
  }
}
