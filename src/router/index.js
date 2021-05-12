import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: '行事曆',
        component: () => import('../views/Calendar.vue'),
      },
      {
        path: encodeURI('歷史記錄'),
        name: '歷史記錄',
        component: () => import('../views/History.vue'),
      },
      {
        path: encodeURI('例行路線'),
        name: '例行路線',
        component: () => import('../views/Paths.vue'),
      },
      {
        path: encodeURI('實名制'),
        name: '實名制',
        component: () => import('../views/RealName.vue'),
      },
    ],
  },
  {
    path: encodeURI('/eBird記錄/:sid'),
    name: 'eBird記錄',
    component: () => import('@/views/eBird.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
