const { resolve: resolvePath } = require('path')

const getenv = require('getenv')

// defaults

const env = getenv('NODE_ENV', 'development')

const CONNECTION = `/tmp/slaq-${env}.sqlite3`
const MIGRATIONS_DIR = resolvePath(__dirname, './migrations')
const SEEDS_DIR = resolvePath(__dirname, './seeds')

//

const connection = {
  filename: getenv('DB_CONNECTION', CONNECTION)
}

const migrations = {
  directory: getenv('DB_MIGRATIONS_DIR', MIGRATIONS_DIR)
}

const seeds = {
  directory: getenv('DB_SEEDS_DIR', SEEDS_DIR)
}

const pool = {
  afterCreate (conn, done) {
    conn.run('PRAGMA foreign_keys = ON', done)
  }
}

//

const sharedConfig = {
  client: 'sqlite3',
  connection,
  migrations,
  seeds,
  pool,
  useNullAsDefault: true
}

module.exports = {
  development: sharedConfig,
  test: sharedConfig,
  production: sharedConfig
}
