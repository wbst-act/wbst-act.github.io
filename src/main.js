import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import VueOffline from 'vue-offline'
import VueCookies from 'vue-cookies'
import VueGtag from 'vue-gtag'
import i18n from './plugins/vue-i18n'

require('moment/locale/zh-tw')

Vue.config.productionTip = false

Vue.use(VueGtag, { config: { id: 'G-8MND1DTFLR' } }, router)
Vue.use(VueAxios, axios)
Vue.use(VueOffline)
Vue.use(VueCookies)
Vue.use(VueMoment, {
  moment,
})
new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
