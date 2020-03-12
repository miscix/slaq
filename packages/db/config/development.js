const { resolve: resolvePath } = require('path')
const { sync: getRootDir } = require('pkg-dir')

//

const ROOT_DIR = getRootDir()

const DB_FILENAME = '/tmp/slaq-dev.sqlite3'
const MIGRATIONS_DIR = resolvePath(ROOT_DIR, './src/migrations')
const SEEDS_DIR = resolvePath(ROOT_DIR, './assets/seeds')

// fix foreign keys off by default on SQLite3
function afterCreate (conn, done) {
  conn.run('PRAGMA foreign_keys = ON', done)
}

// dev. config

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: DB_FILENAME
  },
  migrations: {
    directory: MIGRATIONS_DIR
  },
  seeds: {
    directory: SEEDS_DIR
  },
  pool: {
    afterCreate
  },
  useNullAsDefault: true
}
