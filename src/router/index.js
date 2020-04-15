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
    component: () => import('@/views/Recommended.vue'),
    children: [{
      path: ':id',
      name: 'recommendedlist',
      component: () => import('@/components/RecommendList')
    }]
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('@/views/Ranking.vue'),
    children: [{
      path: ':id',
      name: 'ranklist',
      component: () => import('@/components/RankList')
    }]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/singer',
    name: 'Singer',
    component: () => import('@/views/Singer.vue'),
    children: [{
      path: ':id',
      name: 'Singermusic',
      component: () => import('../components/Singermusic.vue')
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
