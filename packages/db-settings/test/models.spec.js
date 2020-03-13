const { serial: test } = require('ava')

const { Model, snakeCaseMappers } = require('objection')

const { knex } = require('..')

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

test('user account graph', async t => {
  class BaseModel extends Model {
    static get columnNameMappers () {
      return snakeCaseMappers()
    }
  }

  //
  class User extends BaseModel {
    static get tableName () {
      return 'users'
    }

    static get relationMappings () {
      return {
        credential: {
          relation: Model.HasOneRelation,
          modelClass: Credential,
          join: {
            from: 'users.id',
            to: 'user_credentials.user_id'
          }
        }
      }
    }
  }

  class Credential extends BaseModel {
    static get tableName () {
      return 'user_credentials'
    }
  }

  const body = {
    name: 'Exo',
    email: 'exo@freenet.am',
    credential: {
      hash: 'xxx'
    }
  }

  await User
    .query()
    .insertGraph(body)

  const res = await User
    .query()
    .where({ email: body.email })
    .withGraphJoined('credential')
    .first()

  t.not(res.id, undefined)
  t.is(res.name, body.name)
  t.is(res.email, body.email)
  t.is(res.credential.hash, body.credential.hash)
})
