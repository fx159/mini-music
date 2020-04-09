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
      <div class="full-img" :class="fullimg">
        <img  v-if="playsong.al" :src="playsong.al.picUrl" alt="" >
      </div>
      <div class="full-tab">
        <span>随机播放 {{settime(currenttime)}}|{{settime(alltime)}}</span>
        <span @click="playpremusic" :class="playcls">上一首</span>
        <span @click="playmusic" :class="playcls">
          <span v-show="!playing">播放</span>
          <span v-show="playing">暂停</span>
          </span>
        <span @click="playnextmusic" :class="playcls">下一首</span>
        <span>收藏</span>
      </div>
      <div class="full-play"></div>
   </div>
   </transition>
   <transition name="miniscreen">
   <div class="mini-screen" v-show="!fullscreen" @click="letfullscreen">
     {{currentindex}}
   </div>
   </transition>
   <audio :src="url" ref="audio" @canplay="canplay"  @timeupdate="uptime"   ></audio>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playmusic, loadmusicmsg } from '@/api/song'
export default {
  name: 'PlaySong',
  data () {
    return {
      id: '',
      url: '',
      show: true,
      ready: false,
      alltime: 0,
      currenttime: 0
    }
  },
  computed: {
    ...mapGetters(['songlist', 'fullscreen', 'playsong', 'playing', 'currentindex']),
    // eslint-disable-next-line vue/return-in-computed-property
    fullimg () {
      return this.playing ? 'play' : 'play pause'
    },
    playcls () {
      return this.ready ? '' : 'disable'
    }
  },
  methods: {
    ...mapActions({ playnext: 'playnext' }),
    ...mapMutations({ setfullscreen: 'SET_FULLSCREEN', setplay: 'SET_PLAY' }),
    setminiscreen () {
      this.setfullscreen(false)
    },
    letfullscreen () {
      this.setfullscreen(true)
    },
    loadmusic () {
      // eslint-disable-next-line promise/param-names
      return new Promise((resolve, reject) => {
        playmusic(this.playsong.id).then(data => {
          console.log(data)
          this.url = data.data[0].url
          resolve(this.$refs.audio)
        })
      })
    },
    loadmusicmsg () {
      const id = this.playsong.id
      loadmusicmsg(id).then(data => {
        console.log(data)
      })
    },
    music () {
      this.loadmusic().then(res => {
        res.play()
      })
    },
    playmusic () {
      if (!this.ready) {
        return
      }
      console.log(3)
      this.setplay(!this.playing)
      this.show = !this.show
    },
    toggleshow () {
      this.show = !this.show
    },
    playnextmusic () {
      if (!this.ready) {
        return
      }
      this.playnext({ index: this.currentindex + 1, item: true })
      this.ready = false
    },
    playpremusic () {
      if (!this.ready) {
        return
      }
      this.playnext({ index: this.currentindex + 1, item: true })
      this.ready = false
    },
    canplay () {
      this.ready = true
      this.alltime = this.$refs.audio.duration
      console.log(this.$refs.audio.duration)
    },
    uptime (e) {
      this.currenttime = e.target.currentTime
    },
    settime (time) {
      time = time | 0 // 向上取整
      const second = this._padd(time % 60)
      const minute = time / 60 | 0
      return `${minute}:${second}`
    },
    _padd (num, n = 2) {
      let len = num.toString().length
      // eslint-disable-next-line no-unmodified-loop-condition
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    }
  },
  created () {
  },
  watch: {
    playsong (nvl) {
      this.music()
      this.loadmusicmsg()
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
      background-color: black !important;
      color: #fff;
      overflow: hidden;
      background-color: #ffffff;
      .full-top{
        height: @height;
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid ;
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
        position: absolute;
        height: 55%;
        width: 100%;
        border-radius: 50%;
        margin-top: 60px;
        &.play{
          animation: rotate 20s linear infinite;
        }
        &.pause{
          animation-play-state: paused;
        }
        img{
          border-radius: 50%;
          position: absolute;
          top:0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .full-tab{
        position: absolute;
        left: 0;
        bottom: 40px;
        display: flex;
        justify-content: center;
        span{
          display: inline-block;
          width: 70px;
          text-align: center;
          margin-left: 8px;
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
    .mi5niscreen-enter-active, .miniscreen-leave-active{
      transition: all 1s;
    }
    .miniscreen-enter, .miniscreen-leave-to{
       opacity: 0;
    }
  }
   @keyframes rotate{
    0%{
     transform: rotate(0)
     }
    100%{
    transform: rotate(360deg)
    }
  }
</style>
