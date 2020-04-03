<template>
  <div class="singer">
    <scroll class="singer-scroll" ref="singerscroll">
    <div class="singer-list" ref="singerlist" @touchstart='hover'  @touchend='offhover' @touchmove='itemmove'>
       <h2 class="singer-title" style="font-size:16px">热门歌手TOP100</h2>
       <div v-for="(list, index) in singerlists"
       :key="index" ref="listitem"
       :data-index='index'
       class="singer-item">
         <span style="margin-left:0;margin-right:20px">{{index+1}}</span>
         <img v-lazy="list.img1v1Url" alt="">
         <span>{{list.name}}</span>
       </div>
    </div>
    </scroll>
    <div class="load-img">
      <load v-show="!singerlists.length"></load>
    </div>
    <div class="singer-tip" ref="singertip" v-show="show" @touchstart ='gototop'>
      ↑
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
      singerlists: [],
      show: false
    }
  },
  methods: {
    loadsingerdata () {
      loadsinger(this.limit).then(data => {
        this.singerlists = data.artists
      })
    },
    hover (e) {
      this.item.y1 = e.targetTouches[0].pageY
      // console.log(e.targetTouches[0].pageY)
      if (e.target.className === 'singer-item') {
        // console.log(e.targetTouches[0].pageY)
        if (e.target.className.indexOf('active') === 12) return
        addclass(e.target, ' active')
      }
    },
    itemmove (e) {
      // console.log(e.targetTouches[0].pageY)
      this.item.y2 = e.targetTouches[0].pageY
      const scroll = this.item.y2 - this.item.y1
      if (scroll < 0) {
        this.show = true
      } else {
        this.show = false
      }
    },
    offhover (e) {
      if (e.target.className === 'singer-item active') e.target.className = 'singer-item'

      // this.$refs.singerscroll.scrolltoelement(this.$refs.listitem[index - 2], 0)
    },
    gototop () {
      this.$refs.singerscroll.scrollto(0, 0, 3000)
      this.show = false
    }
  },
  components: {
    scroll,
    load
  },
  created () {
    this.loadsingerdata()
    this.item = {}
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
    border-radius: 50px;
  }
}

.load-img{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
}
.singer-tip{
  position: fixed;
  bottom: 10px;
  right: 10px;
  height: 20px;
  width: 20px;
  background-color: red;
  overflow: hidden;
  text-align: center;
}
</style>
