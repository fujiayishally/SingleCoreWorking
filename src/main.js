import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
  Button,
  Layout,
  Content,
  Header,
  Sider,
  Footer,
  Menu,
  Submenu,
  Icon,
  MenuGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
} from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;

Vue.component('Button', Button);
Vue.component('Layout', Layout);
Vue.component('Content', Content);
Vue.component('Header', Header);
Vue.component('Sider', Sider);
Vue.component('Footer', Footer);
Vue.component('Menu', Menu);
Vue.component('Submenu', Submenu);
Vue.component('Icon', Icon);
Vue.component('MenuGroup', MenuGroup);
Vue.component('MenuItem', MenuItem);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('BreadcrumbItem', BreadcrumbItem);
Vue.component('Card', Card);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
