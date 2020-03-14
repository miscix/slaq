const express = require('express')

const { Model } = require('objection')

const bodyParser = require('body-parser')

const checkAuth = require('./middlewares/check-auth')

const router = require('./router')

const knex = require('./knex')

// settings

const JWT_SECRET = 'no-secret'

//

Model.knex(knex)

// app setup

const app = express()

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))

app
  .use(checkAuth({ secret: JWT_SECRET }))

app.use('/', router)

module.exports = app
