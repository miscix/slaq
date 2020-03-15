import test from 'ava'

import { createLocalVue, shallowMount } from '@vue/test-utils'

import Element from 'element-ui'

import App from '@/App'

test.before(t => {
  const localVue = createLocalVue()
  localVue.use(Element)

  t.context = { localVue }
})

test.skip('App should render', t => {
  const wrapper = shallowMount(App, t.context)
  t.is(wrapper.constructor.name, 'VueWrapper')
})
