import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: encodeURI('/台北鳥會例行活動行事曆'),
  },
  {
    path: encodeURI('/台北鳥會例行活動行事曆'),
    component: Home,
    name: '台北鳥會例行活動行事曆',
  },
  {
    path: encodeURI('/歷史記錄'),
    name: '歷史記錄',
    component: () => import('../views/History.vue'),
  },
  {
    path: encodeURI('/例行路線'),
    name: '例行路線',
    component: () => import('../views/Paths.vue'),
  },
  {
    path: encodeURI('/實名制'),
    name: '實名制個資設定',
    component: () => import('../views/RealName.vue'),
  },
  {
    path: encodeURI('/eBird記錄/:sid'),
    name: 'eBird記錄',
    component: () => import('@/views/eBird.vue'),
  },
  {
    path: encodeURI('/排班查詢'),
    name: '排班查詢',
    component: () => import('@/views/Search.vue'),
  },
  {
    path: encodeURI('/駐站解說'),
    name: '駐站解說',
    component: () => import('@/views/Station.vue'),
  },
  {
    path: encodeURI('/大型活動資訊'),
    name: '大型活動資訊',
    component: () => import('@/views/Travel.vue'),
  },
  {
    path: encodeURI('/相關網站'),
    name: '相關網站',
    component: () => import('@/views/Site.vue'),
  },
  {
    path: encodeURI('/分享'),
    name: '分享',
    component: () => import('@/views/Share.vue'),
  },
  {
    path: encodeURI('/電子發票捐贈碼'),
    name: '電子發票捐贈碼',
    component: () => import('@/views/Einvoice.vue'),
  },
  {
    path: encodeURI('/關渡自然公園即時鳥況'),
    name: '關渡自然公園即時鳥況',
    component: () => import('@/views/Guandu.vue'),
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
