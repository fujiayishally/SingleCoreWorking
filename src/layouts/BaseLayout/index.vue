<template>
  <Layout :class="['theme-' + layoutTheme]">
    <Sider
      class="layout-sider-menu"
      hide-trigger
      collapsible
      breakpoint="md"
      :collapsed-width="78"
      v-model="isCollapsed"
    >
      <LogoVue />
      <SiderMenuVue :is-collapsed="isCollapsed" />
    </Sider>
    <Layout>
      <Header class="layout-header-bar">
        <SvgIcon
          class="sider-menu-trigger"
          :type="isCollapsed ? 'menu-unfold' : 'menu-fold'"
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
import SiderMenuVue from './SiderMenu.vue'

export default {
  components: { HeaderVue, LogoVue, FooterVue, SettingDrawerVue, SiderMenuVue },
  data() {
    return {
      isCollapsed: false,
    }
  },
  computed: {
    layoutTheme() {
      return this.$route.query.layoutTheme || 'dark'
    },
  },
  methods: {
    handleSiderMenuTrigger() {
      this.isCollapsed = !this.isCollapsed
    },
  },
}
</script>

<style lang="scss" scoped>
$normalHeight: 64px;

.layout-sider-menu {
  position: relative;
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.layout-header-bar {
  position: relative;
  display: flex;
  width: 100%;
  height: $normalHeight;
  padding: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.layout-footer-bar {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: $normalHeight;
  box-shadow: 0px -1px 2px #ddd;
  background-color: white;
}
.sider-menu-trigger {
  transition: all 0.3s, padding 0s;
  height: $normalHeight;
  padding: 19px 24px;
  font-size: 20px;
  cursor: pointer;
  display: inline-block;
  &:hover {
    background-color: hsla(0, 0%, 0%, 0.05);
  }
}
</style>
