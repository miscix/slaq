const test = require('ava')

const Knex = require('knex')

const { config } = require('..')

test('development', async t => {
  const knex = Knex(config.development)

  await knex
    .raw('SELECT 1 + 1')
    .then(() => t.pass())
})
