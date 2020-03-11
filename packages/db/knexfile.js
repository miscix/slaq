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
    useNullAsDefault: true
  }
}
