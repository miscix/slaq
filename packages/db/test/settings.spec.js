const test = require('ava')

const Knex = require('knex')

const settingsMap = require('../knexfile')

const knexForEnv = env => {
  const settings = settingsMap[env]

  if (!settings) {
    const message = `Settings for "${env}" environment not provided`
    throw new RangeError(message)
  }

  return Knex(settings)
}

test('testing', async t => {
  const knex = knexForEnv('test')

  await knex
    .raw('SELECT 1 + 1')
    .then(() => t.pass())
})

test('development', async t => {
  const knex = knexForEnv('development')

  await knex
    .raw('SELECT 1 + 1')
    .then(() => t.pass())
})
