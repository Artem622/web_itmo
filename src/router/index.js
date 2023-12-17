import { createRouter, createWebHistory } from 'vue-router'



const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },

  {
    path: '/logUp',
    name: 'logUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/LogUpView.vue')
  },

  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "about" */ '../views/MainView.vue')
  },

  {
    path: '/graph',
    name: 'graph',
    component: () => import(/* webpackChunkName: "about" */ '../views/GraphView.vue')
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
