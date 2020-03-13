const files = [
  'test/**/*.spec.js',
  'test/**/*.test.js'
]

// const ignoredByWatcher = []

const environmentVariables = {
  NODE_ENV: 'test',
  DB_SEEDS_DIR: './assets/seeds'
}

const serial = true

const require = []

const nodeArguments = []

const verbose = false

export default {
  files,
  // ignoredByWatcher,
  environmentVariables,
  serial,
  require,
  nodeArguments,
  verbose
}
