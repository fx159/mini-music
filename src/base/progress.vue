<template>
  <div class="progress-tab">
    <div class="in-progress" ref="progresstab">
      <div class="progress" ref="progress">
      </div>
      <div class="progress-btn-wrapper" >
        <div class="progress-btn" ref="progressbtn"></div>
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
  watch: {
    progress (nvl) {
      const width = this.$refs.progresstab.clientWidth * this.progress
      this.$refs.progress.style.width = width + 'px'
      this.$refs.progressbtn.style.transform = `translateX(${width}px)`
    }
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
