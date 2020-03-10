module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './tmp/sqlite3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test/tmp/sqlite3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './test/data/seeds'
    }
  }
}
