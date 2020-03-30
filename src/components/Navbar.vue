<template>
  <div class="navbar">
    <div><router-link tag="span" :to="{path:'/recommended'}">推荐</router-link></div>
    <div><router-link tag="span" :to="{path:'/singer'}">歌手</router-link></div>
    <div><router-link tag="span" :to="{path:'/ranking'}">排行</router-link></div>
    <div><router-link tag="span" :to="{path:'/search'}">搜索</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
<style lang="less" scoped>
.navbar{
  display: flex;
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
