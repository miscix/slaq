const files = [
  'test/**/*.spec.js',
  'test/**/*.test.js'
]

const ignoredByWatcher = [
  'tmp/**'
]

const environmentVariables = {
  NODE_ENV: 'test'
}

const serial = true

const require = []

const nodeArguments = []

const verbose = false

export default {
  files,
  ignoredByWatcher,
  environmentVariables,
  serial,
  require,
  nodeArguments,
  verbose
}
