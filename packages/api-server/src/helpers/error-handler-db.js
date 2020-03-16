const createError = require('http-errors')
const { errorHandler: fromDbError } = require('@bee/db-settings')

function errorHandler (err) {
  const { statusCode, message, data } = fromDbError(err)
  return Promise.reject(createError(statusCode, message, data))
}

module.exports = errorHandler
