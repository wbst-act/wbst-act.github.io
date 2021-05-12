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

require('moment/locale/zh-tw')

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueOffline)
Vue.use(VueMoment, {
  moment,
})
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
