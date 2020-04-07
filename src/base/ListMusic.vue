<template>
    <!-- 歌手歌单列表组件 -->
    <div ref ="parent" class="singer-item">
    <div class="singer-img"  ref="img" :style="{'backgroundImage': `url(${img})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}">
      <!-- <img :src="artists.img1v1Url" alt="" width="100%"> -->
      <div class="singer-descrtion">
        <span class="span1" @click="back">返回</span>
        <span class="span2">{{title}}</span>
      </div>
       <div class="filter"></div>
    </div>
    <div class="push-list" ref="push"></div>
    <scroll class="hotsong-list" ref="list" :data ="song" @scoll="getdata">
      <div >
        <div v-for="(hotsong, index) in song" @click="inplaymusic(hotsong,index)" :key="index" class="song-item">
          {{hotsong.name}}
        </div>
    </div>
    </scroll>
    </div>
</template>
<script>
import scroll from '@/base/Scroll'
import { mapActions } from 'vuex'
export default {
  name: 'ListMusic',
  data () {
    return {
      posy: ''
    }
  },
  props: {
    img: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    song: {
      type: Array,
      default: null
    }
  },
  mounted () {
    this.minheight = -this.$refs.img.clientHeight + 40
    this.imgheight = this.$refs.img.clientHeight
    this.$nextTick(() => {
      this.$refs.list.$el.style.top = this.$refs.img.clientHeight + 'px'
    })
    document.addEventListener('resize', () => {
      this.$refs.list.$el.style.top = this.$refs.img.clientHeight + 'px'
    })
  },
  methods: {
    getdata (vl) {
      this.posy = vl
    },
    inplaymusic (hotsong, index) {
      this.playmusic({ list: this.song, index: index })
      this.$root.$emit('sendid', hotsong.id)
    },
    ...mapActions(['playmusic']),
    back () {
      this.$router.back()
    }
  },
  watch: {
    posy (nvl) {
      const height = Math.max(nvl, this.minheight)
      let zindex = 0
      this.$refs.push.style.height = this.imgheight + 'px'
      this.$refs.push.style.transform = `translateY(${height}px)`
      if (nvl < this.minheight) {
        zindex = 10
        this.$refs.img.style.paddingTop = 0
        this.$refs.img.style.height = 40 + 'px'
      } else {
        this.$refs.img.style.paddingTop = 70 + '%'
        this.$refs.img.style.height = 0
      }
      this.$refs.img.style.zIndex = zindex
    }
  },
  components: {
    scroll
  }
}
</script>
<style lang="less" scoped>
.singer-img{
    width: 100%;
    padding-top: 70%;
    height: 100%;
    position: relative;
    color:#fff;
    transform-origin: top;
  }
  .filter{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7,17,27,0.4);
  }
.singer-descrtion{
    position: absolute;
    left: 0;
    top:0;
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    .span1{
       display: inline-block;
       width: 40px;
       z-index: 10;
    }
    .span2{
     flex: 1 auto;
     display: inline-block;
     text-align: center;
    }
}
.hotsong-list{
    position:absolute;
    width:100%;
    // overflow:hidden;
    right:0;
    bottom:40px
}
.song-item{
  height: 40px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
}
.push-list{
  position: relative;
  height: 100%;
  background-color: @bgc;
}
</style>
