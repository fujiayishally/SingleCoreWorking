<template>
  <div class="drawer-container">
    <div class="drawer-trigger" :hidden="isOpen" @click="handleDrawerTrigger">
      <Icon class="ivu-icon-md-settings" type="md-settings" />
    </div>
    <Drawer
      :closable="true"
      :mask="false"
      :inner="true"
      :transfer="false"
      v-model="isOpen"
    >
      <h2 class="radioGroupTitle">主题</h2>
      <RadioGroup
        v-model="layoutTheme"
        type="button"
        @on-change="handleSettingsChange('layoutTheme')"
      >
        <Radio
          v-for="theme in themeList"
          :key="theme"
          :label="theme"
          :class="['theme-' + theme + '-element']"
          >&nbsp;</Radio
        >
      </RadioGroup>
    </Drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      layoutTheme: this.$route.query.layoutTheme || 'dark',
      themeList: ['light', 'yellow', 'green', 'red', 'blue', 'dark'],
    }
  },
  methods: {
    handleDrawerTrigger() {
      this.isOpen = !this.isOpen
    },
    handleSettingsChange(key) {
      this.$router.push({ query: { ...this.$route.query, [key]: this[key] } })
    },
  },
}
</script>

<style lang="scss">
.radioGroupTitle {
  margin: 10px 0;
  font-size: 18px;
}
.drawer-container {
  .ivu-drawer-close {
    position: absolute;
    left: 0;
    top: 40%;
    right: auto;
    transform: translatex(-100%);
  }
  .drawer-trigger {
    position: fixed;
    right: 0;
    top: 40%;
  }
  .ivu-drawer-close,
  .drawer-trigger {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px 0 0 3px;
    border: solid 1px #eee;
  }
  .drawer-trigger .ivu-icon-md-settings {
    font-size: 25px;
  }
  .ivu-drawer-close .ivu-icon-ios-close {
    font-size: 45px;
  }
  .ivu-radio-group-button .ivu-radio-wrapper {
    border-color: #ddd;
    &.ivu-radio-wrapper-checked {
      border-color: #6fc2d0;
      box-shadow: 0px 0px 3px 0 #6fc2d0;
    }
  }
}
</style>
