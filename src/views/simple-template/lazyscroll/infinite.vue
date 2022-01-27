<template>
  <div>
    <div class="constainer h-full w-full overflow-auto" ref="scroll">
      <div class="cntent">
        <div v-for="it in arrlength" :key="it">
          11111<br />11111<br />11111<br />11111<br />11111<br />11111<br />11111<br />11111<br />11111<br />11111<br />11111<br />
        </div>
        <img width="100px" height="100px" ref="imgwrap" data-src="https://info.compassedu.hk/info_imgUrl_phpdszGAn" alt="">
        <el-link type="primary" class="more" ref="more">更多</el-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrlength: 5
    }
  },
  mounted() {
    this.intersection()
    this.observerInit()
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer)
    this.oberverDestroy()
  },
  methods: {
    intersection() { // 定义观察器
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {// 观察对象
          entries.forEach(entr => {
            if (entr.target.localName == 'img' && entr.intersectionRatio > 0) {
              entr.target.src = entr.target.dataset.src
              entr.target.onerror = () => {
                this.intersectionObserver.unobserve(entr.target)
              }
              entr.target.onload = () => {
                this.intersectionObserver.unobserve(entr.target)
              }
            } else {
              if (this.arrlength > 14 || this.timer) return;
              this.timer = setTimeout(() => {
                this.arrlength++
                this.timer = null
              }, 5000)
            }
          })
        },
        { root: this.$refs.scroll, rootMargin: [] }
      )
    },
    observerInit() {
      this.intersectionObserver.observe(
        this.$refs.more.$el
      );
      this.intersectionObserver.observe(  
        this.$refs.imgwrap
      );
    },
    oberverDestroy() {
      this.intersectionObserver.unobserve(this.$refs.more.$el); // 停止观察
      this.intersectionObserver.disconnect(); // 关闭观察器
    }
  }
}
</script>

<style lang="stylus" scoped></style>