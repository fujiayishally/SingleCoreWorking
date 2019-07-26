import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Layout, Sider, Icon, Menu, Submenu, MenuItem, Drawer } from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.component('Layout', Layout)
Vue.component('Sider', Sider)
Vue.component('Icon', Icon)
Vue.component('Menu', Menu)
Vue.component('Submenu', Submenu)
Vue.component('MenuItem', MenuItem)
Vue.component('Drawer', Drawer)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
