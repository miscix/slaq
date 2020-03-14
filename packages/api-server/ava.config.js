const files = [
  'test/**/*.spec.js',
  'test/**/*.test.js'
]

const environmentVariables = {
  NODE_ENV: 'test',
  DB_SEEDS_DIR: './assets/seeds'
}

const require = []

const nodeArguments = []

const verbose = false

export default {
  files,
  environmentVariables,
  require,
  nodeArguments,
  verbose
}
