const express = require('express')

const bodyParser = require('body-parser')

const checkAuth = require('./middlewares/check-auth')

const router = require('./router')

// settings

const JWT_SECRET = 'no-secret'

// middleware setup

const app = express()

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))

app
  .use(checkAuth({ secret: JWT_SECRET }))

app.use('/', router)

module.exports = app
