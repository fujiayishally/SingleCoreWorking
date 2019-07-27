<template>
  <div class="sider-menu">
    <Menu
      width="100%"
      class="sider-menu"
      :class="menuitemClasses"
      :open-names="['1']"
      active-name="1-2"
    >
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-analytics" />
          <span>Navigation One</span>
        </template>
        <MenuItem name="1-1">
          <span>Option 1</span>
        </MenuItem>
        <MenuItem name="1-2">
          <span>Option 2</span>
        </MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-filing" />
          <span>Navigation Two</span>
        </template>
        <MenuItem name="2-1">
          <span>Option 5</span>
        </MenuItem>
        <MenuItem name="2-2">
          <span>Option 6</span>
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    },
  },
}
</script>

<style lang="scss">
.sider-menu {
  .menu-icon {
    transition: all 0.3s;
  }
  .menu-item {
    .ivu-menu-item {
      display: block;
    }
    span {
      display: inline-block;
      overflow: hidden;
      width: 69px;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
      transition: width 0.2s ease 0.2s;
    }
    i {
      transform: translateX(0px);
      transition: font-size 0.2s ease, transform 0.2s ease;
      vertical-align: middle;
      font-size: 16px;
      &.ivu-menu-submenu-title-icon {
        display: block;
      }
    }
  }
  .collapsed-menu {
    .ivu-menu-item {
      display: none;
    }
    span {
      width: 0px;
      transition: width 0.2s ease;
    }
    i {
      transform: translateX(5px);
      transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
      vertical-align: middle;
      font-size: 22px;
      &.ivu-menu-submenu-title-icon {
        display: none;
      }
    }
  }
}
</style>
