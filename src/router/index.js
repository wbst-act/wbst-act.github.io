import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '台北鳥會例行活動',
    component: () => import('../views/Activity.vue'),
  },
  {
    path: encodeURI('/回首頁'),
    name: '回首頁',
    redirect: '/',
  },
  {
    path: encodeURI('/歷史記錄查詢'),
    name: '歷史記錄查詢',
    component: () => import('../views/History.vue'),
  },
  {
    path: encodeURI('/例行路線查詢'),
    name: '例行路線查詢',
    component: () => import('../views/Paths.vue'),
  },
  {
    path: encodeURI('/實聯制個資設定'),
    name: '實聯制個資設定',
    component: () => import('../views/RealName.vue'),
  },
  {
    path: encodeURI('/志工排班查詢'),
    name: '志工排班查詢',
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
    path: encodeURI('/分享APP'),
    name: '分享APP',
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
