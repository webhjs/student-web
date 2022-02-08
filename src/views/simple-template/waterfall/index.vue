<template>
<div>
  <div v-flow-drag v-flow-wheel="initWheel" @wheelEmit="wheelEmit" class="relative h-full">
    <waterfall :col="col" :data="data">
      <template>
        <div style="height: 100px;" class="item">
          1
        </div>
        <div style="height: 200px;" class="item">
          2
        </div>
        <div style="height: 50px;" class="item">
          3
        </div>
        <div style="height: 150px;" class="item">
          4
        </div>
        <div style="height: 250px;" class="item">
          5
        </div>
      </template>
    </waterfall>
    <div class="absolute bottom-0 w-full flex items-center">
      <el-button type="primary" size="mini" @click="initWheel = initWheel-0.05" plain>-</el-button>
      <el-progress class="flex-1 mx-2" :percentage="parseInt(initWheel * 100)"></el-progress>
      <el-button type="primary" size="mini" @click="initWheel = initWheel+0.05" plain>+</el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      col: 3,
      initWheel: 1
    }
  },
  methods: {
    wheelEmit(scl) {
      this.initWheel = scl;
      this.$forceUpdate();
    }
  }
}
</script>
<style lang="stylus" scoped>
.item {
  background #ccc;
  width 200px;
  margin-bottom: 10px;
}
</style>