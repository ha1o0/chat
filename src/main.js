import Vue from 'vue'
// import App from './App.vue'
import Main from './Main.vue'
import router from './router'
import vant from './components/vant'
import './plugins/element.js'

window.EventBus = new Vue()
Vue.config.productionTip = false
Vue.use(vant)

new Vue({
  router,
  render: h => h(Main)
}).$mount('#app')
