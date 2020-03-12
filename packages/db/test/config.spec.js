const test = require('ava')

const Knex = require('knex')

const config = require('../config')

test('development', async t => {
  const knex = Knex(config.development)

  await knex
    .raw('SELECT 1 + 1')
    .then(() => t.pass())
})

test('production', async t => {
  const knex = Knex(config.production)

  await knex
    .raw('SELECT 1 + 1')
    .then(() => t.pass())
})
