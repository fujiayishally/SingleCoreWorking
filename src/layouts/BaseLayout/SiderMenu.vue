<template>
  <div class="sider-menu" :class="this.isCollapsed ? 'collapsed-menu' : ''">
    <Menu
      width="100%"
      :open-names="openNames"
      :active-name="activeName"
      @on-select="handleSelect"
    >
      <template v-for="menu in menuList">
        <MenuItem v-if="!menu.children" :name="menu.path" :key="menu.path">
          <Icon class="title-icon" type="ios-shirt-outline" />
          <span class="title">{{ menu.meta.title }}</span>
        </MenuItem>
        <Submenu v-else :name="menu.path" :key="menu.path">
          <template slot="title">
            <Icon class="title-icon" type="ios-shirt-outline" />
            <span class="title">{{ menu.meta.title }}</span>
          </template>
          <MenuItem
            v-for="children in menu.children"
            :name="children.path"
            :key="children.path"
          >
            <span class="title">{{ children.meta.title }}</span>
          </MenuItem>
        </Submenu>
      </template>
    </Menu>
  </div>
</template>

<script>
import { hasAuthority } from '@/utils/authority'

export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    this.openNamesMap = {}
    this.activeNamesMap = {}
    const path = this.$route.path
    const menuList = this.getMenuList(this.$router.options.routes)
    return {
      menuList,
      openNames: this.openNamesMap[path],
      activeName: this.activeNamesMap[path],
    }
  },
  watch: {
    '$route.path': function(path) {
      this.openNames = this.openNamesMap[path]
      this.activeName = this.activeNamesMap[path]
    },
  },
  methods: {
    getMenuList(routes = [], parentNames = [], activeName) {
      const menuList = []
      routes.forEach(route => {
        // 是否在菜单显示
        if (route.hideInMenu) return
        // 是否具有权限
        if (
          route.meta &&
          route.meta.authority &&
          !hasAuthority(route.meta.authority)
        )
          return

        //保存当前路径对应的的打开菜单和激活菜单
        //只要指定过激活菜单，就表示是隐子路由的后代，会一直沿用这个激活菜单
        this.openNamesMap[route.path] = parentNames
        this.activeNamesMap[route.path] = activeName || route.path

        // 复制对象，以免影响源对象
        route = { ...route }

        if (route.children) {
          if (route.hideChildrenInMenu) {
            // 如果当前路拥有隐藏子路由，
            // 需要指定隐藏子路由的展开菜单和激活菜单
            //第一代隐藏路由的展开菜单包括父路由及父路由的展开菜单
            // 然后删除子路由
            this.getMenuList(
              route.children,
              activeName ? parentNames : [...parentNames, route.path],
              activeName || route.path,
            )

            delete route.children
          } else {
            // 如果当前路由的子路由正常显示，
            // 则为子路由指定展开菜单为当前路由的展开菜单加上当前路由
            //无需指定激活菜单（默认各自的路径为激活菜单）
            route.children = this.getMenuList(route.children, [
              ...parentNames,
              route.path,
            ])
          }
        }

        // 如果设置了标题名，则添加到菜单列表
        if (route.meta && route.meta.title) menuList.push(route)
        // 没有标题名，但有子路由，则子路由上移一层（例如根路由‘/’）
        else if (route.children) menuList.push(...route.children)
      })
      return menuList
    },
    handleSelect(path) {
      if (this.$route.path != path)
        this.$router.push({ path, query: this.$route.query })
    },
  },
}
</script>

<style lang="scss">
.sider-menu {
  .ivu-menu .ivu-menu {
    display: block;
  }
  .title-icon {
    font-size: 16px;
    vertical-align: middle;
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
  }
  .title {
    display: inline-block;
    width: 7em;
    vertical-align: bottom;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: width 0.5s ease;
  }
  .ivu-menu-submenu-title-icon {
    opacity: 1;
    transition: opacity 0.2s ease;
    transition-delay: 0.2s;
  }
}
.sider-menu.collapsed-menu {
  .ivu-menu .ivu-menu {
    display: none;
  }
  .title-icon {
    font-size: 22px;
    vertical-align: middle;
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  }
  .title {
    width: 0px;
    transition: width 0.2s ease;
  }
  .ivu-menu-submenu-title-icon {
    opacity: 0;
    transition: opacity 0s ease;
    transition-delay: 0s;
  }
}
</style>
