<template>
  <div>
    <slot :contentText="formatedResult">{{ formatedResult }}</slot>
  </div>
</template>

<script>
const IntReg = /^[0-9]+$/

export default {
  props: {
    format: {
      type: String,
      default: 'dd-hh:mm:ss',
    },
    dd: {
      type: Number,
      default: 0,
      validator(val) {
        return IntReg.test(val)
      },
    },
    hh: {
      type: Number,
      default: 0,
      validator(val) {
        return IntReg.test(val)
      },
    },
    mm: {
      type: Number,
      default: 0,
      validator(val) {
        return IntReg.test(val)
      },
    },
    ss: {
      type: Number,
      default: 0,
      validator(val) {
        return IntReg.test(val)
      },
    },
    pause: {
      type: Boolean,
      default: false,
    },
    toggle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fullSeconds: 0,
      d: this.dd,
      h: this.hh,
      m: this.mm,
      s: this.ss,
      formatedResult: '',
      timeoutClock: null,
      manuToggle: false,
      manuPause: false,
    }
  },
  watch: {
    fullSeconds(seconds) {
      let timeArr = new Date(seconds * 1000)
        .toISOString()
        .substr(11, 8)
        .split(':')
      this.s = timeArr.pop()
      this.m = timeArr.pop()
      this.h = timeArr.pop()
      if (this.d > 0) this.d = Math.floor(seconds / 60 / 60 / 24)

      this.formatedResult = this.getFormatedResult()
    },
    toggle(turnOn) {
      if (turnOn) this.toStart()
      else this.toStop()
    },
  },
  mounted() {
    this.resetdata()
  },
  methods: {
    resetdata() {
      this.pause = false
      this.manuToggle = false
      if (this.timeoutClock) clearTimeout(this.timeoutClock)
      this.fullSeconds = this.getFullSeconds()
    },
    getFullSeconds() {
      return ((this.dd * 24 + this.hh) * 60 + this.mm) * 60 + this.ss
    },
    getFormatedResult() {
      let result = ''
      switch (this.format) {
        case 'dd':
          result = this.d + ''
          break
        case 'hh':
          result = this.d * 24 + this.h + ''
          break
        case 'mm':
          result = Math.ceil(this.fullSeconds / 60) + ''
          break
        case 'ss':
          result = this.fullSeconds + ''
          break
        default:
          result = this.format
            .replace(/d{1,2}/gi, this.d)
            .replace(/h{1,2}/gi, this.h)
            .replace(/m{1,2}/gi, this.m)
            .replace(/s{1,2}/gi, this.s)
      }
      return result
    },
    oneSecond() {
      return new Promise(resolve => {
        this.timeoutClock = setTimeout(() => resolve(), 1000)
      })
    },
    async toStart() {
      this.manuToggle = true
      this.pause = false
      this.$emit('start')
      while (
        this.manuToggle &&
        !this.manuPause &&
        this.toggle &&
        !this.pause &&
        this.fullSeconds > 0
      ) {
        await this.oneSecond()
        this.fullSeconds--
        clearTimeout(this.timeoutClock)
      }
      if (this.fullSeconds === 0) this.$emit('done')
    },
    toPause() {
      this.manuPause = true
      this.$emit('pasue')
    },
    toStop() {
      this.resetdata()
      this.$emit('stop')
    },
  },
}
</script>

<style></style>
