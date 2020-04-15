<template>
  <div class="ranking" >
    <scroll :data = 'lists'>
    <div>
    <div v-for="(list, index) in lists" :key="index" >
       <router-link :to="{name:'ranklist', params: {id: list.id}}"  class="rank-list" tag="div">
       <div class="list-left"><img v-lazy="list.coverImgUrl" alt="" ></div>
       <div class="list-right">
         <p>{{list.name}}</p>
         <p>{{list.description}}</p>
       </div>
       </router-link>
    </div>
    </div>
    </scroll>
    <transition name='musiclist'>
    <router-view/>
    </transition>
    <div class="load-img"><load v-show="!lists.length"></load></div>
  </div>
</template>
<script>
import { loadranktoplist } from '@/api/ranking'
import load from '@/base/loading.vue'
import scroll from '@/base/Scroll'
export default {
  name: 'Ranking',
  data () {
    return {
      lists: []
    }
  },
  components: {
    scroll,
    load
  },
  created () {
    loadranktoplist().then(data => {
      console.log(data)
      this.lists = data.list
    })
  }
}
</script>
<style lang="less" scoped>
.ranking{
  position: absolute;
  top:40px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  >div{
    height: 100%;
  }
  .rank-list{
    display: flex;
    height: 120px;
    padding: 10px 5px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    .list-left{
      width: 120px;
      flex: 0 0 100px;
      img{
        height: 100%;
      }
    }
    .list-right{
      flex: 1;
      display: flex;
      padding: 5px 10px;
      flex-flow: column;
      >p{
       font-size:14px;
       overflow:hidden;
       height:36px;
       display: -webkit-box;
       -webkit-box-orient: vertical;
       -webkit-line-clamp: 2;
      }
    }
  }
  .load-img{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.musiclist-enter-active, .musiclist-leave-active{
   transition: all 1s ;
 }
 .musiclist-enter, .musiclist-leave-to{
   transform: translate3d(100%,0,0);
 }
}
</style>
