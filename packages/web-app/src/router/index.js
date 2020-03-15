import Vue from 'vue'
import VueRouter from 'vue-router'

import ProfilePage from '../views/Profile'
import WorkspacePage from '../views/Workspace'

Vue.use(VueRouter)

const routes = [
  {
    path: '/'
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage
  },
  {
    path: '/workspace',
    name: 'WorkspacePage',
    component: WorkspacePage
  }
]

const router = new VueRouter({
  routes
})

export default router
