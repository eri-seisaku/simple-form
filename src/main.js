import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import moment from "moment";

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  Vuex,
  moment,
  render: h => h(App)
}).$mount('#app')
