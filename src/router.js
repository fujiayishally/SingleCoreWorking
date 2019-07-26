import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user',
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/UserLayout'),
      children: [
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          path: '/user/login',
          name: 'login',
          component: () =>
            import(/* webpackChunkName: "user" */ './views/user/Login.vue'),
        },
        {
          path: '/user/register',
          name: 'register',
          component: () =>
            import(/* webpackChunkName: "user" */ './views/user/Login.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/BaseLayout'),
      children: [
        {
          path: '/',
          redirect: '/quicklist',
        },
        {
          path: '/quicklist',
          component: () =>
            import(/* webpackChunkName: "layout" */ './views/QuickList'),
        },
        {
          path: '/mower',
          component: () =>
            import(/* webpackChunkName: "layout" */ './views/Mower'),
        },
      ],
    },
    {
      path: '*',
      component: () =>
        import(/* webpackChunkName: "layout" */ './views/404.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    nprogress.start()
  }
  next()
})
router.afterEach(() => {
  nprogress.done()
})

export default router
