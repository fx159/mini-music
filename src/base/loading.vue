<template>
  <div>
    <div class="load-content">
     <div class="load-img"><img src="../assets/img/loading.gif" alt=""></div>
     <div class="load-title">{{title}}</div>
     </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载'
    }
  }
}
</script>
<style lang="less" scoped>
.load-conent{
  display: flex;
  height: 100px;
  width: 100px;
  flex-flow: column;
  .load-img{
    width: 100%;
    height: 80px;
    >img{
      width: 100%;
    }
  }
  .load-title{
    font-size: 20px;
    color: @font;
  }
}
</style>
