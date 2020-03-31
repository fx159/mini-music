<template>
  <div class="recommended">
    <Scroll :data = "loadimg" class="scroll-content" ref="scroll">
    <div>
    <div v-if="banners.length">
      <!-- 判断是否拿到轮播图数据 -->
    <Loop>
      <div v-for="(banner,index) in banners" :key="`${index}+banner`">
         <a href="#">
            <img :src="banner.imageUrl" alt="" @load="loadbannerimg">
         </a>
      </div>
    </Loop>
    </div>
    <div style="text-align:center">热门推荐</div>
      <div class="recommend">
      <div class="recommend-left">
      <div v-for="(list,index) in loadname" :key="index" class="recommend-name">
           {{list.name}}
      </div>
      </div>
      <div class="recommend-right">
      <div v-for="(item, index) in loadimg" :key="`${index}+img`" class="recommend-img">
         <div class="img-content">
           <img v-lazy="item.coverImgUrl" alt="">
           <div>创作者：{{item.creator.nickname}}</div>
         </div>
      </div>
      </div>
    </div>
    </div>
    </Scroll>
    <div class="load-img"><load v-show="!loadimg.length"></load></div>
  </div>
</template>
<script>
import { loadbanner, loadplayhot, loaddetail } from '@/api/api'
import Loop from '@/base/Loop'
import Scroll from '@/base/Scroll'
import load from '@/base/loading.vue'
export default {
  name: 'Recommended',
  data () {
    return {
      banners: [],
      loadimg: [],
      loadname: {},
      loadid: []
    }
  },
  methods: {
    loadrecommend () {
      loadplayhot().then(data => {
        for (let i = 0; i < data.length; i++) {
          this.loadid[i] = data[i]
          this.loadname[i] = Object.assign({}, this.loadid[i].playlistTag)
          loaddetail(this.loadid[i].id).then(data => {
            this.loadimg.push(data.playlist)
          })
        }
        this.loadname = Object.assign({}, this.loadname)
      })
    },
    // eslint-disable-next-line vue/no-dupe-keys
    loadbannerimg () {
      if (!this.chickout) {
        this.$refs.scroll.refresh()
        console.log(1)
        this.chickout = true
      }
    }
  },
  created () {
    loadbanner().then(data => {
      this.banners = data
    })
    setTimeout(() => {
      this.loadrecommend()
    }, 2000)
  },
  mounted () {
  },
  components: {
    Loop,
    Scroll,
    load
  }
}
</script>
<style lang="less" scoped>
.recommended{
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top:40px;
  .scroll-content{
    width: 100%;
    overflow: hidden;
    height: 100%;
  }
}
.load-img{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.recommend{
  height: 100%;
  display: flex;
  position: relative;
  background-color: @bgc;
   .recommend-left{
     flex: 0 auto 50px;
     color: @font;
     text-align: center;
     line-height: 100px;
   }
  .recommend-name{
    min-height: 120px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    display: flex;
    flex-flow: column;
  }
  .recommend-right{
    .recommend-img{
     width: 300px;
     height: 120px;
     display: flex;
     border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
     line-height: 100px;
     flex-flow: column;
     overflow: hidden;
     position: relative;
     .img-content{
      position: absolute;
      left: 0;
      top:0;
      display: flex;
       img{
         width: 100px;
         height: 100px;
       }
     }
  }
  }

}
</style>
