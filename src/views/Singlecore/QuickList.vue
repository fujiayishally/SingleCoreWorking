<template>
  <div class="layout">
    <TimeCounter :mm="25" format="h:m:s" :toggle="clockToggle">
      <template slot-scope="{ contentText }">
        <ScrollBillboard :content-text="contentText" />
      </template>
    </TimeCounter>

    <div class="list-item" v-for="item in todayList" :key="item.id">
      <div>
        <div class="item-title">{{ item.title }}</div>
        <p>{{ item.desc }}</p>
      </div>
      <div class="controller">
        <Button
          shape="circle"
          size="large"
          :icon="
            clockToggle ? 'ios-refresh-circle-outline' : 'ios-cafe-outline'
          "
          @click="handleToggleClock"
        ></Button>
        <Button shape="circle" size="large" icon="ios-trash-outline"></Button>
      </div>
    </div>
  </div>
</template>

<script>
import TimeCounter from '@/components/TimeCounter'
import ScrollBillboard from '@/components/ScrollBillboard'
export default {
  mounted() {
    this.getQuicklist()
  },
  components: { TimeCounter, ScrollBillboard },
  data() {
    return {
      todayList: [],
      clockToggle: false,
    }
  },

  methods: {
    handleClick() {
      console.log('parent click')
    },
    getQuicklist() {
      this.$request({
        url: '/api/singlecore/quicklist',
        method: 'GET',
      }).then(res => {
        this.todayList = res.data
      })
    },
    handleToggleClock() {
      this.clockToggle = !this.clockToggle
    },
  },
}
</script>

<style scoped>
.layout {
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 0 5px #eee;
  background-color: #fff;
}
.list-item {
  margin: 20px 0;
  padding: 20px;
  border: solid 1px #eee;
  box-shadow: 0 0 5px #eee;
  display: flex;
  justify-content: space-between;
}
.item-title {
  position: relative;
  display: inline-block;
  padding-bottom: 5px;
  font-size: 22px;
  font-weight: bold;
}
.controller {
  display: flex;
  align-items: center;
}
.controller > button {
  margin-left: 10px;
}
</style>
