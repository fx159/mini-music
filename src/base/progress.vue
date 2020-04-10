<template>
  <div class="progress-tab">
    <div class="in-progress" ref="progresstab">
      <div class="progress" ref="progress">
      </div>
      <div class="progress-btn-wrapper" @touchstart.prevent='playstart' @touchmove.prevent ='playmove' @touchend ="playend">
        <div class="progress-btn" ref="progressbtn" ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'progre',
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  methods: {
    playstart (e) {
      this.touch.able = true
      this.touch.startx = e.touches[0].pageX
      this.touch.offsetleft = this.$refs.progress.clientWidth
    },
    playmove (e) {
      if (!this.touch.able) return
      const width = e.touches[0].pageX - this.touch.startx
      const offsetwidth = Math.max(0, Math.min(this.$refs.progresstab.clientWidth, width + this.touch.offsetleft))
      this.touch.width = width + this.touch.offsetleft
      // offsetwidth = Math.max(0, width + this.touch.offsetleft)
      this.$refs.progress.style.width = offsetwidth + 'px'
      this.$refs.progressbtn.style.transform = `translateX(${offsetwidth}px)`
    },
    playend () {
      this.touch.able = false
      this.setprogress()
    },
    setprogress () {
      const progress = this.touch.width / this.$refs.progresstab.clientWidth
      this.$emit('setprogr', progress)
    }
  },
  watch: {
    progress (nvl) {
      if (nvl > 0 && !this.touch.able) {
        const width = this.$refs.progresstab.clientWidth * nvl
        console.log(width, nvl)
        this.$refs.progress.style.width = width + 'px'
        this.$refs.progressbtn.style.transform = `translateX(${width}px)`
      }
    }
  },
  created () {
    this.touch = {}
  }
}
</script>
<style lang="less" scoped>
.progress-tab{
  height: 30px;
  width: 80%;
  .in-progress{
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0,0,220,0.5);
    .progress{
      position: absolute;
      height: 100%;
      background-color:#fff;
    }
    .progress-btn-wrapper{
      position: absolute;
      left: -8px;
      top:-13px;
      width: 30px;
      height: 30px;
      .progress-btn{
        position: relative;
        top:10px;
        left: 7px;
        box-sizing: border-box;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        color: #ffffff;
        background-color: yellow;
      }
    }
  }
}
</style>
