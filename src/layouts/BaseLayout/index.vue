<template>
  <Layout>
    <Sider
      class="layout-sider-menu"
      hide-trigger
      collapsible
      :collapsed-width="78"
      v-model="isCollapsed"
      breakpoint="md"
    >
      <LogoVue />
      <!-- <SiderMenuVue /> -->
    </Sider>
    <Layout>
      <Header class="layout-header-bar">
        <Icon
          class="sider-menu-trigger"
          :type="isCollapsed ? 'md-menu' : 'md-return-left'"
          @click="handleSiderMenuTrigger"
        />
        <HeaderVue />
      </Header>
      <Content class="layout-content">
        <router-view />
      </Content>
      <Footer class="layout-footer-bar">
        <FooterVue />
      </Footer>
    </Layout>
    <SettingDrawerVue />
  </Layout>
</template>

<script>
import HeaderVue from './Header.vue'
import LogoVue from './Logo.vue'
import FooterVue from './Footer.vue'
import SettingDrawerVue from '@/components/SettingDrawer.vue'
// import SiderMenuVue from './SiderMenu.vue'

export default {
  components: { HeaderVue, LogoVue, FooterVue, SettingDrawerVue },
  data() {
    return {
      isCollapsed: false,
    }
  },
  methods: {
    handleSiderMenuTrigger() {
      this.isCollapsed = !this.isCollapsed
    },
  },
}
</script>

<style lang="scss" scoped>
.layout-sider-menu {
  min-height: 100vh;
}
.layout-header-bar {
  display: flex;
  align-items: center;
  height: 64px;
  box-shadow: 0px 2px 3px #ddd;
  background-color: white;
}
.layout-footer-bar {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 64px;
  box-shadow: 0px -1px 2px #ddd;
  background-color: white;
}
.sider-menu-trigger {
  height: 64px;
  line-height: 64px;
  padding: 0 20px;
  font-size: 35px;
  &:hover {
    background-color: #eee;
  }
}
</style>
