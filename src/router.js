import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import findLast from 'lodash/findLast'
import { hasAuthority, isLogin } from '@/utils/authority'
import { Notice } from 'iview'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user',
      hideInMenu: true,
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
      meta: {
        authority: ['user', 'admin'],
      },
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/BaseLayout'),
      children: [
        {
          path: '/',
          redirect: '/singlecore',
        },
        {
          path: '/singlecore',
          meta: {
            title: '工作台',
            icon: 'Icon',
            type: 'ios-list-box-outlinex',
          },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/',
              redirect: '/singlecore/quicklist',
            },
            {
              path: '/singlecore/quicklist',
              name: 'singlecore-quicklist',
              meta: {
                title: '快捷清单',
              },
              component: () =>
                import(/* webpackChunkName: "mower" */ './views/Singlecore/QuickList'),
            },
            {
              path: '/singlecore/progress',
              name: 'singlecore-progress',
              meta: {
                title: '清单进度',
              },
              component: () =>
                import(/* webpackChunkName: "mower" */ './views/Singlecore/Progress'),
            },
            {
              path: '/singlecore/feedback',
              name: 'singlecore-feedback',
              meta: {
                title: '今日反馈',
              },
              component: () =>
                import(/* webpackChunkName: "mower" */ './views/Singlecore/Feedback'),
            },
          ],
        },
        {
          path: '/store',
          meta: {
            title: '存储室',
            icon: 'Icon',
            type: 'ios-albums',
          },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/',
              redirect: '/store/mower',
            },
            {
              path: '/store/mower',
              name: 'mower',
              meta: {
                title: '集草器',
              },
              component: () =>
                import(/* webpackChunkName: "mower" */ './views/Store/Mower'),
            },
          ],
        },
        {
          path: '/more',
          meta: {
            title: '更多',
            icon: 'Icon',
            type: 'more',
          },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/',
              redirect: '/more/settings',
            },
            {
              path: '/more/settings',
              name: 'more-settings',
              meta: {
                title: '平台设置',
              },
              component: () =>
                import(/* webpackChunkName: "setting" */ './views/More/Settings'),
            },
            {
              path: '/more/statistics',
              hideChildrenInMenu: true,
              meta: {
                title: '数据统计',
                authority: ['admin'],
              },
              component: { render: h => h('router-view') },
              children: [
                {
                  path: '/',
                  redirect: '/more/statistics/user',
                },
                {
                  path: '/more/statistics/user',
                  name: 'more-statistics-user',
                  component: () =>
                    import(/* webpackChunkName: "more" */ './views/More/StatisticsUser'),
                },
                {
                  path: '/more/statistics/buried',
                  name: 'more-statistics-buried',
                  component: () =>
                    import(/* webpackChunkName: "more" */ './views/More/StatisticsBuried'),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/403',
      name: '403',
      hideInMenu: true,
      component: () => import(/* webpackChunkName: "403" */ './views/403.vue'),
    },
    {
      path: '*',
      name: '404',
      hideInMenu: true,
      component: () => import(/* webpackChunkName: "404" */ './views/404.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  // 打开进度条
  if (to.path != from.path) {
    nprogress.start()
  }

  const record = findLast(to.matched, item => {
    return item.meta && item.meta.authority
  })

  if (record && !hasAuthority(record.meta.authority)) {
    if (!isLogin()) {
      next({ path: '/user/login' })
    } else {
      Notice.error({
        title: '权限有误',
        desc: '抱歉，你没有访问权限，请联系管理员获取更多信息！',
      })
      next({ path: '/403' })
    }
    nprogress.done()
  }
  next()
})
router.afterEach(() => {
  nprogress.done()
})

export default router
