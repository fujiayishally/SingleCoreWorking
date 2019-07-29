import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Layout,
  Sider,
  Icon,
  Menu,
  Submenu,
  MenuItem,
  Drawer,
  RadioGroup,
  Radio,
} from 'iview'
import 'iview/dist/styles/iview.css'
import '@/styles/_theme.scss'
import './icons'
import AuthorizedComponent from '@/components/Authorized'
import AuthorizedDirective from '@/directives/authorized'

Vue.config.productionTip = false

Vue.component('Authorized', AuthorizedComponent)
Vue.use(AuthorizedDirective)

Vue.component('Layout', Layout)
Vue.component('Sider', Sider)
Vue.component('Icon', Icon)
Vue.component('Menu', Menu)
Vue.component('Submenu', Submenu)
Vue.component('MenuItem', MenuItem)
Vue.component('Drawer', Drawer)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
