import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from '../views/Home'
import AuthPage from '../views/Auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/auth',
    name: 'AuthPage',
    component: AuthPage
  }
]

const router = new VueRouter({
  routes
})

export default router
