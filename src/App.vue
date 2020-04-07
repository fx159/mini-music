<template>
  <div id="app">
    <nav-bar/>
    <keep-alive>
    <router-view/>
    </keep-alive>
    <play-song></play-song>
  </div>
</template>
<script>
import NavBar from '@/components/Navbar'
import PlaySong from '@/components/PlaySong'
export default {
  name: 'app',
  components: {
    NavBar,
    PlaySong
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
