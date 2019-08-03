import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'

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
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Button,
} from 'iview'
import 'iview/dist/styles/iview.css'
import '@/styles/_theme.scss'
import './icons'

import AuthorizedComponent from '@/components/Authorized'
import AuthorizedDirective from '@/directives/authorized'

Vue.config.productionTip = false
Vue.prototype.$request = request

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
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Button', Button)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
