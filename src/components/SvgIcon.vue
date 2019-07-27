<template>
  <span :class="className" v-on="$listeners">
    <i class="svg-icon">
      <svg
        viewBox="64 64 896 896"
        width="1em"
        height="1em"
        fill="currentColor"
        focusable="false"
        aria-hidden="true"
      >
        <use :xlink:href="iconName" />
      </svg>
    </i>
  </span>
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    type: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.type}`
    },
  },
}
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
</style>
