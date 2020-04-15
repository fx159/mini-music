<template>
  <div class="recommended">
    <Scroll :data = "recommendlist" class="scroll-content" ref="scroll">
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
    <div>
      <h2 class="recommend-title">热门推荐</h2>
    </div>
    <div class="recommend-list">
      <div v-for="(list,index) in recommendlist" :key="`${index}+list`" class="list-item">
        <router-link :to="{name:'recommendedlist',params:{id:list.id}}" tag="div">
        <img v-lazy="list.picUrl" alt="">
         <p style="">{{list.name}}</p>
         </router-link>
      </div>
    </div>
    <div class="recommend-music">
       <h2 class="recommend-title">最新音乐</h2>
       <div v-for="(item, index) in recommendmusic" @click="playnewmusic(item,index)" :key="`${index}+item`" class="music-item" @touchstart='hover' @touchend='hoverleave'>
         <div class="item-top">{{item.song.name}}
         <span v-show='item.song.alias.length' style="color:#888">({{item.song.alias[0]}})</span>
         </div>
        <div class="item-bottom" style="color:#888">
        <span  v-for="(artist,index) in item.song.artists" :key="`${index}+artist`"><i v-show="index>0">/</i>{{artist.name}}</span>
         {{item.song.album.name}}
        </div>
       </div>
    </div>
    </div>
    </Scroll>
    <div class="load-img"><load v-show="!recommendmusic.length"></load></div>
    <transition name='musiclist'>
    <router-view/>
    </transition>
  </div>
</template>
<script>
import { loadbanner, loadrecommendlist, loadnewmusic } from '@/api/recommend'
import Loop from '@/base/Loop'
import Scroll from '@/base/Scroll'
import load from '@/base/loading.vue'
import { addclass } from '@/utils/util'
import { mapActions } from 'vuex'
export default {
  name: 'Recommended',
  data () {
    return {
      banners: [],
      recommendlist: [],
      recommendmusic: [],
      limit: 6
    }
  },
  methods: {
    ...mapActions(['playmusic']),
    hover (e) {
      if (e.target.className === 'music-item') {
        // console.log(e.targetTouches[0].pageY)
        if (e.target.className.indexOf('active') === 11) return
        addclass(e.target, ' active')
      }
    },
    hoverleave (e) {
      if (e.target.className === 'music-item active') e.target.className = 'music-item'
    },
    loadbannerd () {
      loadbanner().then(data => {
        this.banners = data
      })
    },
    loadrecommend () {
      loadrecommendlist(this.limit).then(data => {
        this.recommendlist = data.result
        console.log(this.recommendlist)
      })
    },
    loadmusic () {
      loadnewmusic().then(data => {
        console.log(data)
        this.recommendmusic = data.result
      })
    },
    playnewmusic (item, index) {
      this.playmusic({ list: this.recommendmusic, index: index })
    },
    // loadrecommend () {
    //   loadplayhot().then(data => {
    //     for (let i = 0; i < data.length; i++) {
    //       this.loadid[i] = data[i]
    //       this.loadname[i] = Object.assign({}, this.loadid[i].playlistTag)
    //       loaddetail(this.loadid[i].id).then(data => {
    //         this.loadimg.push(data.playlist)
    //       })
    //     }
    //     this.loadname = Object.assign({}, this.loadname)
    //   })
    // },
    // eslint-disable-next-line vue/no-dupe-keys
    loadbannerimg () {
      if (!this.chickout) {
        this.$refs.scroll.refresh()
        this.chickout = true
      }
    }
  },
  created () {
    this.loadbannerd()
    this.loadrecommend()
    this.loadmusic()
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
  .scroll-content{
    width: 100%;
    position: absolute;
    top:40px;
    overflow: hidden;
    right: 0;
    bottom: 0;
  }
  .recommend-list{
     display: flex;
     height: 100%;
     width: 100%;
     flex-wrap: wrap ;
     justify-content: space-between;
   .list-item{
     width: 33%;
     padding: 2px;
     box-sizing: border-box;
     p{
       font-size:13px;
       overflow:hidden;
       height:36px;
       display: -webkit-box;
       -webkit-box-orient: vertical;
       -webkit-line-clamp: 2;
     }
     img{
       width: 100%;
     }
   }
  }
  .recommend-music{
    .music-item{
      border-bottom: 1px solid #ccc;
      padding: 10px;
      height: 40px;
      width: 100%;
      .item-top{
      display: flex;
      overflow:hidden;
      width: 40%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    .item-bottom{
     color: rgb(136, 136, 136);
     width: 50%;
     font-size: 12px;
     overflow:hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    }
  }
}
.active{
    background-color: #ccc;
  }
.recommend-title{
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
}
.musiclist-enter-active, .musiclist-leave-active{
   transition: all 1s ;
 }
 .musiclist-enter, .musiclist-leave-to{
   transform: translate3d(100%,0,0);
 }
</style>
