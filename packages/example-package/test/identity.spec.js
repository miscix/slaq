const test = require('ava')

const { identity } = require('..')

test('primitives', t => {
  t.is(identity(1), 1)
  t.is(identity('a'), 'a')
  t.is(identity(true), true)
})

test('objects', t => {
  const obj = { a: 1 }

  t.is(identity(obj), obj)
})

test('void', t => {
  t.is(identity(), undefined)
})
