const express = require('express')

const Router = require('./routes')

function createApp () {
  const app = express()

  app.use('/', Router())

  return app
}

module.exports = createApp
