const {
  ValidationError,
  NotFoundError,
  DBError,
  ConstraintViolationError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError
} = require('objection')

const createError = require('http-errors')

function errorFrom (err, res) {
  if (err instanceof ValidationError) {
    switch (err.type) {
      case 'ModelValidation':
        return createError(400, {
          message: err.message,
          type: err.type,
          data: err.data
        })
      case 'RelationExpression':
        return createError(400, {
          message: err.message,
          type: 'RelationExpression',
          data: {}
        })
      case 'UnallowedRelation':
        return createError(400, {
          message: err.message,
          type: err.type,
          data: {}
        })
      case 'InvalidGraph':
        return createError(400, {
          message: err.message,
          type: err.type,
          data: {}
        })
      default:
        return createError(400, {
          message: err.message,
          type: 'UnknownValidationError',
          data: {}
        })
    }
  } else if (err instanceof NotFoundError) {
    return createError(404, {
      message: err.message,
      type: 'NotFound',
      data: {}
    })
  } else if (err instanceof UniqueViolationError) {
    return createError(409, {
      message: err.message,
      type: 'UniqueViolation',
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint
      }
    })
  } else if (err instanceof NotNullViolationError) {
    return createError(400, {
      message: err.message,
      type: 'NotNullViolation',
      data: {
        column: err.column,
        table: err.table
      }
    })
  } else if (err instanceof ForeignKeyViolationError) {
    return createError(409, {
      message: err.message,
      type: 'ForeignKeyViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      }
    })
  } else if (err instanceof CheckViolationError) {
    return createError(400, {
      message: err.message,
      type: 'CheckViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      }
    })
  } else if (err instanceof DataError) {
    return createError(400, {
      message: err.message,
      type: 'InvalidData',
      data: {}
    })
  } else if (err instanceof ConstraintViolationError) {
    return createError(400, {
      message: err.message,
      type: 'InvalidData',
      data: {}
    })
  } else if (err instanceof DBError) {
    return createError(500, {
      message: err.message,
      type: 'UnknownDatabaseError',
      data: {}
    })
  } else {
    return createError(500, {
      message: err.message,
      type: 'UnknownError',
      data: {}
    })
  }
}

//

module.exports = errorFrom
