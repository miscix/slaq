const test = require('ava')

const knex = require('..')

// test

test('exists', async t => {
  t.not(knex, undefined)
})
