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
  methods: {
    getMenuList(routes = [], parentNames = [], activeName) {
      const menuList = []
      routes.forEach(route => {
        if (route.hideInMenu) return
        if (
          route.meta &&
          route.meta.authority &&
          !hasAuthority(route.meta.authority)
        )
          return

        this.openNamesMap[route.path] = parentNames
        this.activeNamesMap[route.path] = activeName || route.path

        route = { ...route }

        if (route.children) {
          if (route.hideChildrenInMenu) {
            this.getMenuList(
              route.children,
              activeName ? parentNames : [...parentNames, route.path],
              activeName || route.path,
            )

            delete route.children
          } else {
            route.children = this.getMenuList(route.children, [
              ...parentNames,
              route.path,
            ])
          }
        }

        if (route.meta && route.meta.title) menuList.push(route)
        else if (route.children) menuList.push(...route.children)
      })
      return menuList
    },
    handleSelect(path) {
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
