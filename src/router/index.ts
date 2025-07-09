import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Auth from '../views/Auth.vue'
import App from '../App.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/',
    name: 'Home',
    component: App
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
