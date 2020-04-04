<template>
  <div id="app">
    <nav-bar/>
    <keep-alive>
    <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import NavBar from '@/components/Navbar'
export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>
<style lang="less">
#app{
  height: 100%;
  width: 100%;
  background-color: @bgc;
}

</style>
