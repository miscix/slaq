import Vue from 'vue'

import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import './element-variables.scss'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Element, { locale })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
