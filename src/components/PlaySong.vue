<template>
<!-- 播放器组件 -->
  <div class="play-song" v-show="songlist.length" ref="playsong">
   <transition name="fullscreen">
   <div class="full-screen"  ref="fullscreen" v-show="fullscreen" >
      <div class="full-top">
        <span class="span1"  @click="setminiscreen"> 返回</span>
        <span class="span2">
          <div>{{playsong.name}}</div>
           <div v-if="playsong.ar">{{playsong.ar[0].name}}</div>
        </span>
      </div>
      <div class="full-img" >
        <img v-if="playsong.al" :src="playsong.al.picUrl" alt="" width="100%" height="80%">
      </div>
      <div class="full-tab">
        <span>随机播放</span>
        <span>上一首</span>
        <span @click="playmusic">播放</span>
        <span>下一首</span>
        <span>收藏</span>
      </div>
      <div class="full-play"></div>
   </div>
   </transition>
   <transition name="miniscreen">
   <div class="mini-screen" v-show="!fullscreen" @click="letfullscreen">
     456777
   </div>
   </transition>
   <audio :src="url" ref="audio"></audio>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { playmusic } from '@/api/song'
export default {
  name: 'PlaySong',
  data () {
    return {
      id: '',
      url: ''
    }
  },
  computed: {
    ...mapGetters(['songlist', 'fullscreen', 'playsong', 'playing'])
  },
  methods: {
    ...mapMutations({ setfullscreen: 'SET_FULLSCREEN', setplay: 'SET_PLAY' }),
    setminiscreen () {
      this.setfullscreen(false)
    },
    letfullscreen () {
      this.setfullscreen(true)
    },
    loadmusic () {
      playmusic(this.playsong.id).then(data => {
        console.log(data)
        this.url = data.data[0].url
      })
    },
    playmusic () {
      this.setplay(!this.playing)
    }
  },
  created () {
  },
  watch: {
    playsong () {
      this.loadmusic()
      setTimeout(() => {
        this.$refs.audio.play()
        console.log(this.url.length)
      }, 300)
    },
    playing (nvl) {
      const audio = this.$refs.audio
      nvl ? audio.play() : audio.pause()
    }
  }
}
</script>

<style lang="less" scoped>
  .play-song{
    .full-screen{
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      width: 100%;
      overflow: hidden;
      background-color: #ffffff;
      .full-top{
        height: @height;
        display: flex;
        span{
          display: inline-block;
          height: 100%;
          width: 40px;
        }
        .span2{
          flex: 1 auto;
          text-align: center;
        }
      }
      .full-img{
        height: 70%;
        margin-top: 60px;
        img{
          border-radius: 50%;
        }
      }
    }
    .mini-screen{
      height: @height;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background-color: green;
    }
    .fullscreen-enter-active, .fullscreen-leave-active{
      transition: all 1s;
    }
    .fullscreen-enter, .fullscreen-leave-to{
       opacity: 0;
    }
    .miniscreen-enter-active, .miniscreen-leave-active{
      transition: all 1s;
    }
    .miniscreen-enter, .miniscreen-leave-to{
       opacity: 0;
    }
  }
</style>
