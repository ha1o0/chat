import Vue from 'vue'
// import App from './App.vue'
import Main from './Main.vue'
import router from './router'
import vant from './components/vant'
import './plugins/element.js'
import Vuex from 'vuex'
import storeModules from './store/index'

Vue.use(Vuex)

window.EventBus = new Vue()
Vue.config.productionTip = false
Vue.use(vant)

const store = new Vuex.Store(storeModules)

new Vue({
  router,
  store: store,
  render: h => h(Main)
}).$mount('#app')
