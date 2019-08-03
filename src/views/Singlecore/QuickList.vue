<template>
  <div class="layout">
    <div class="list-item" v-for="item in todayList" :key="item.id">
      <div>
        <div class="item-title">{{ item.title }}</div>
        <p>{{ item.desc }}</p>
      </div>
      <div class="controller">
        <Button shape="circle" size="large" icon="ios-cafe-outline"></Button>
        <Button shape="circle" size="large" icon="ios-trash-outline"></Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getQuicklist()
  },
  data() {
    return {
      todayList: [],
    }
  },
  methods: {
    getQuicklist() {
      this.$request({
        url: '/api/singlecore/quicklist',
        method: 'GET',
      }).then(res => {
        this.todayList = res.data
      })
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
