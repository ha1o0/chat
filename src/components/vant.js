import { Tabbar, TabbarItem, Button, List, Cell } from 'vant'
let vantUIs = [Tabbar, TabbarItem, Button, List, Cell]

export default {
  install (Vue) {
    vantUIs.forEach(vantUI => {
      Vue.component(vantUI.name, vantUI)
      // Vue.use(vantUI)    // 也可以使用 Vue.use()
    })
  }
}