<template>
  <div class="layout">
    <Sider
      :style="{ position: 'fixed', height: '100vh', left: 0, overflow: 'auto' }"
    >
      <SiderMenuVue></SiderMenuVue>
    </Sider>
    <Layout :style="{ marginLeft: '200px' }">
      <Header>
        <HeaderVue></HeaderVue>
      </Header>
      <Content>
        <router-view></router-view>
      </Content>
      <Footer>
        <FooterVue></FooterVue>
      </Footer>
    </Layout>
  </div>
</template>

<script>
import HeaderVue from './Header.vue';
import SiderMenuVue from './SiderMenu.vue';
import FooterVue from './Footer.vue';

export default {
  props: {},
  components: { HeaderVue, SiderMenuVue, FooterVue },
};
</script>

<style>
.layout {
  color: red;
}
</style>
