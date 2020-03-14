const { serial: test } = require('ava')

const knex = require('@bee/db-query-builder')

const { users } = require('@bee/assets')

const { User } = require('..')

//

test.beforeEach(async t => {
  await knex.migrate.latest()
  await knex.seed.run()
})

test.afterEach.always(async t => {
  await knex.migrate.rollback()
})

test('query related `credential`', async t => {
  const user = await User
    .query()
    .where({ email: users[0].email })
    .first()

  await user
    .$relatedQuery('credential')
    .then(assertCredential)

  function assertCredential (credential) {
    t.not(credential.userId, undefined)
    t.not(credential.hash, undefined)
  }
})
