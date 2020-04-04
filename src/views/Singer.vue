<template>
  <div class="singer">
    <list-singer></list-singer>
    <transition name='musiclist'>
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ListSinger from '@/components/ListSinger'
export default {
  name: 'Singer',
  components: {
    ListSinger
  }
}

</script>
<style lang="less" scoped>
 .musiclist-enter-active, .musiclist-leave-active{
   transition: all 1s ;
 }
 .musiclist-enter, .musiclist-leave-to{
   transform: translate3d(100%,0,0);
 }
</style>
