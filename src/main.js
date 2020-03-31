import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('@/assets/img/loading.gif')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
