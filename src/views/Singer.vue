<template>
  <div class="singer">
    <scroll class="singer-scroll">
    <div>
       <h2 class="singer-title" style="font-size:16px">热门歌手TOP100</h2>
       <div v-for="(list, index) in singerlists" :key="index" class="singer-item" @touchstart='hover' @touchend='offhover'>
         <span style="margin-left:0;margin-right:20px">{{index+1}}</span>
         <img v-lazy="list.img1v1Url" alt="">
         <span>{{list.name}}</span>
       </div>
    </div>
    </scroll>
    <div class="load-img">
      <load v-show="!singerlists.length"></load>
    </div>
  </div>
</template>

<script>
import { loadsinger } from '@/api/singer'
import scroll from '@/base/Scroll'
import load from '@/base/loading.vue'
import { addclass } from '@/utils/util'
export default {
  name: 'Singer',
  data () {
    return {
      limit: 100,
      singerlists: []
    }
  },
  methods: {
    loadsingerdata () {
      loadsinger(this.limit).then(data => {
        this.singerlists = data.artists
        console.log(this.singerlists)
      })
    },
    hover (e) {
      const event = e.target
      if (e.target.className.indexOf('active') === 12) return
      addclass(event, ' active')
    },
    offhover (e) {
      e.target.className = 'singer-item'
    }
  },
  components: {
    scroll,
    load
  },
  created () {
    this.loadsingerdata()
  }
}
</script>
<style lang="less" scoped>
.singer{
  background-color: @bgc;
  .singer-scroll{
  position: absolute;
  width: 100%;
  top: 40px;
  overflow: hidden;
  right: 0;
  bottom: 0;
  }
.singer-title{
  position: relative;
  height: 20px;
  line-height: 20px;
  font-size: 17px;
  padding-left: 9px;
  margin-bottom: 14px;
  &:after{
    content: '';
    position: absolute;
    top:50%;
    left: 0;
    width: 2px;
    margin-top: -7px;
    height: 16px;
    background-color: red;
  }
}
 .active{
    background-color: #ccc;
  }
.singer-item{
  height: 50px;
  line-height: 50px;
  padding: 18px;
  display: flex;
  border-bottom: 1px #ccc solid;

  span{
    display: inline-block;
    line-height: 50px;
    font-size: 13px;
    margin-left: 30px;
  }
  img{
    height: 50px;
    flex: 0 auto 50px;
    border-radius: 5  0px;
  }
}
.load-img{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
}
</style>
