import test from 'ava'

import { createLocalVue, shallowMount } from '@vue/test-utils'

import Element from 'element-ui'

import TheGreeting from '@/components/TheGreeting'

test.before(t => {
  const localVue = createLocalVue()
  localVue.use(Element)

  t.context = { localVue }
})

test('TheGreeting should render', t => {
  const wrapper = shallowMount(TheGreeting, t.context)
  t.is(wrapper.constructor.name, 'VueWrapper')
})
