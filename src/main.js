import Vue from 'vue'
import App from './App.vue'
import Main from './Main.vue'
import router from './router'
import './plugins/element.js'

window.EventBus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(Main)
}).$mount('#app')
