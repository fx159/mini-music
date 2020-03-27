import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommended'
  },
  {
    path: '/recommended',
    name: 'Recommended',
    component: () => import('@/views/Recommended.vue')
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('@/views/Ranking.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/singer',
    name: 'Singer',
    component: () => import('@/views/Singer.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
