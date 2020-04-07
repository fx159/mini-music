<template>
  <div class="navbar"  v-if="show">
    <div><router-link tag="span" :to="{path:'/recommended'}">推荐</router-link></div>
    <div><router-link tag="span" :to="{path:'/singer'}">歌手</router-link></div>
    <div><router-link tag="span" :to="{path:'/ranking'}">排行</router-link></div>
    <div><router-link tag="span" :to="{path:'/search'}">搜索</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      show: true
    }
  },
  watch: {
    $route (to) {
      if (to.name === 'Singermusic') {
        this.show = false
      } else {
        this.show = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.navbar{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  height: 40px;
  line-height: 40px;
  justify-content: space-between;
  >div{
    text-align: center;
    width: 25%;
  }
  .router-link-active{
    border-bottom: 1px solid red;
  }
}
</style>
