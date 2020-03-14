const { serial: test } = require('ava')

const { Model } = require('objection')

const { knex, models } = require('..')

//

const { User, Credential } = models

//

test.before(async t => {
  Model.knex(knex)
})

test.beforeEach(async t => {
  await knex.migrate.latest()
  // await knex.seed.run()
})

test.afterEach.always(async t => {
  await knex.migrate.rollback()
})

test('user with credential (graph)', async t => {
  const body = {
    name: 'Exo',
    email: 'exo@freenet.am',
    credential: {
      hash: 'xxx'
    }
  }

  //

  await User
    .query()
    .insertGraph(body)
    .then(assertGraph)

  await User
    .query()
    .where({ email: body.email })
    .withGraphJoined('credential')
    .first()
    .then(assertGraph)

  await User
    .query()
    .where({ email: body.email })
    .withGraphFetched('credential')
    .first()
    .then(assertGraph)

  const user = await User
    .query()
    .where({ email: body.email })
    .first()

  await user
    .$relatedQuery('credential')
    .then(assertCredential)

  //

  function assertUser (user) {
    t.true(user instanceof User)

    t.not(user.id, undefined)
    t.is(user.name, body.name)
    t.is(user.email, body.email)
  }

  function assertCredential (credential) {
    t.true(credential instanceof Credential)

    t.not(credential.userId, undefined)
    t.is(credential.hash, body.credential.hash)
  }

  function assertGraph (graph) {
    assertUser(graph)
    assertCredential(graph.credential)
  }
})
