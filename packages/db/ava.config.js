const files = [
  'test/**/*.spec.js',
  'test/**/*.test.js'
]

const ignoredByWatcher = [
  'test/tmp/**'
]

const environmentVariables = {
  NODE_ENV: 'test'
}

const require = []

const nodeArguments = []

const verbose = false

export default {
  files,
  ignoredByWatcher,
  environmentVariables,
  require,
  nodeArguments,
  verbose
}
