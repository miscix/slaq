const { config } = require('.')

//

module.exports = config

module.exports.test = {
  ...config.development,
  connection: {
    filename: '/tmp/test.sqlite3'
  }
}
