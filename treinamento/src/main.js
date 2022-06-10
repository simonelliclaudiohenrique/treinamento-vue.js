import '@/plugins/axios'
import '@/plugins/crypto'
import '@/plugins/dayjs'
import '@/plugins/validate'

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import VueMask from 'v-mask'
import VueMeta from 'vue-meta'
Vue.component('notificacao', () => import('./components/notificacao'))
Vue.component('loading', () => import('./components/loading'))

Vue.use(VueMask)

Vue.config.productionTip = false

Vue.use(VueMeta)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
