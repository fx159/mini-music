<template>
<!-- 播放器组件 -->
  <div class="play-song" v-show="songlist.length" ref="playsong">
   <transition name="fullscreen">
   <div class="full-screen"  ref="fullscreen" v-show="fullscreen" >
      <div class="full-top">
        <span class="span1 iconfont icon-fanhui"  @click="setminiscreen" > </span>
        <span class="span2">
          <div>{{playsong.name}}</div>
           <div v-if="song[0]" style="display:flex; justify-content: center;overflow:hidden"><span style="height:20px;white-space:nowrap;width:100px" v-for="(names, index) in song[0].ar" :key="`${index} + name`">{{names.name}}</span></div>
        </span>
      </div>
      <div class="full-img" :class="fullimg" v-show="imgshow"  @click="showimgs">
        <img v-if='song[0]' :src="song[0].al.picUrl" alt="" >
      </div>
      <scroll v-show="!imgshow" class="full-txt">
        <div  @click="showimgs"  >
        <div v-for="(words,index) in lyricwords" :key="index+'words'" >
          {{words.txt}}
        </div>
        </div>
      </scroll>
      <div class="full-progress" >
        <div class="full-time">{{settime(currenttime)}}</div>
        <progre :progress ="progress" @setprogr ='setprogr'></progre>
        <div class="full-time">{{settime(alltime)}}</div>
      </div>
      <div class="full-tab">
        <span :class="modeicon" class="iconfont iconfont" @click="changgemode"></span>
        <span @click="playpremusic" class="iconfont icon-shangyishou" :class="playcls"></span>
        <span @click="playmusic" :class="playcls">
          <span v-show="!playing" class="iconfont icon-play_icon"></span>
          <span v-show="playing" class="iconfont icon-zanting"></span>
        </span>
        <span @click="playnextmusic" class="iconfont icon-xiayishou" :class="playcls"></span>
        <span class="iconfont icon-shoucang " :class="isactive"></span>
      </div>
      <div class="full-play"></div>
   </div>
   </transition>
   <transition name="miniscreen">
   <div class="mini-screen" v-show="!fullscreen" @click="letfullscreen">
     <div class="mini-img" :class="fullimg">
        <img v-if="playsong.al" :src="playsong.al.picUrl" width="100%" alt="">
     </div>
     <div class="mini-font">
        <div class="div1">{{playsong.name}}</div>
        <div v-if="playsong.ar">{{playsong.ar[0].name}}</div>
     </div>
     <div class="mini-play" @click.stop="play">
         <span v-show="!playing" class="iconfont icon-play_icon"></span>
         <span v-show="playing" class="iconfont icon-zanting"></span>
     </div>
   </div>
   </transition>
   <audio :src="url" ref="audio" @ended="end" @canplay="canplay"  @timeupdate="uptime"   ></audio>
  </div>
</template>
<script>
import progre from '@/base/progress'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playmusic, loadmusicmsg, loadsongwords } from '@/api/song'
import { playmode } from '@/utils/config'
import { shuffle } from '@/utils/util'
import lyric from 'lyric-parser'
import scroll from '@/base/Scroll'
export default {
  name: 'PlaySong',
  data () {
    return {
      id: '',
      url: '',
      show: true,
      song: '',
      ready: false,
      alltime: 0,
      currenttime: 0,
      lyricwords: '',
      imgshow: true
    }
  },
  computed: {
    ...mapGetters(['songlist', 'fullscreen', 'playsong', 'playing', 'currentindex', 'mode', 'sequenlist']),
    // eslint-disable-next-line vue/return-in-computed-property
    fullimg () {
      return this.playing ? 'play' : 'play pause'
    },
    playcls () {
      return this.ready ? '' : 'disable'
    },
    progress () {
      return this.currenttime / this.alltime
    },
    modeicon () {
      return this.mode === playmode.sequential ? 'icon-suijibofang' : this.mode === playmode.loop ? 'icon-shunxubofang' : 'icon-danquxunhuan'
    },
    // eslint-disable-next-line vue/return-in-computed-property
    picUrl () {
      // eslint-disable-next-line space-in-parens
      if ( this.playsong.al.picUrl.length > 0 ) {
        return this.playsong.al.picUrl
      } else {
        return this.playsong.picUrl
      }
    },
    isactive () {
      return this.playing ? 'active' : ''
    }
  },
  components: {
    progre,
    scroll
  },
  methods: {
    showimgs () {
      this.imgshow = !this.imgshow
    },
    ...mapActions({ playnext: 'playnext' }),
    ...mapMutations({ setfullscreen: 'SET_FULLSCREEN', setplay: 'SET_PLAY', setmode: 'SET_MODE', setsonglist: 'SET_SONGLIST', setcurrentindex: 'SET_CURRENTINDEX' }),
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
          this.url = data.data[0].url
          resolve(this.$refs.audio)
        })
      })
    },
    loadmusicword () {
      loadsongwords(this.playsong.id).then(data => {
        // eslint-disable-next-line new-cap
        this.word = new lyric(data.lrc.lyric)
        this.lyricwords = this.word.lines
        console.log(this.lyricwords)
      })
    },
    loadmusicmsg () {
      const id = this.playsong.id
      loadmusicmsg(id).then(data => {
        this.song = data.songs
        console.log(this.song)
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
      let index = this.currentindex
      if (this.currentindex === this.songlist.length - 1) index = -1
      this.playnext({ index: index + 1, item: true })
      this.ready = false
    },
    playpremusic () {
      if (!this.ready) {
        return
      }
      let index = this.currentindex
      if (this.currentindex === 0) {
        index = this.songlist.length
      }
      this.playnext({ index: index - 1, item: true })
      this.ready = false
    },
    canplay () {
      this.ready = true
      this.alltime = this.$refs.audio.duration
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
    },
    setprogr (val) {
      this.$refs.audio.currentTime = this.$refs.audio.duration * val
    },
    play () {
      this.setplay(!this.playing)
      this.show = !this.show
    },
    changgemode () {
      const mode = (this.mode + 1) % 3
      this.setmode(mode)
      let list = null
      if (this.mode === playmode.sequential) {
        list = shuffle(this.sequenlist)
      } else {
        list = this.sequenlist
      }
      console.log(list)
      this.setsonglist(list)
      this.keepplaysong(list)
    },
    keepplaysong (list) {
      const index = list.findIndex(item => {
        return item.id === this.playsong.id
      })
      this.setcurrentindex(index)
    },
    end () {
      if (this.mode === playmode.random) {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      } else {
        this.playnextmusic()
      }
    }
  },
  watch: {
    playsong (nvl, ovl) {
      if (nvl.id === ovl.id) return
      this.music()
      this.loadmusicmsg()
      this.loadmusicword()
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
        .iconfont{
          font-size: 26px;
        }
        .span1{
          line-height: 40px;
        }
        .span2{
          flex: 1 auto;
          text-align: center;
        }
      }
      .full-txt{
        position: absolute;
        overflow: hidden;
        top:70px;
        text-align: center;
        width: 100%;
        right: 0;
        bottom: 120px;
      }
      .full-img{
        position: absolute;
        height: 55%;
        width: 100%;
        border-radius: 50%;
        margin-top: 60px;
        overflow: hidden;
        div{
          height: 20px;
        }
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
      .full-progress{
        height: 60px;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 80px;
        display: flex;
        align-items: center;
      .full-time{
        flex: 0 0 30px;
      }
      .full-mid{
        flex-grow: 1;
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
        .iconfont{
          font-size: 27px;
        }
      }
    }
    .icon-shoucang{
      &.active{
        color: red;
      }
    }
    .mini-screen{
      height: 50px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background-color: black;
      color: @music-font;
      font-size: 14px;
      line-height: 50px;
      display: flex;
      padding: 4px 0;
      box-sizing: border-box;
      .mini-img{
        width: 12%;
        border-radius: 50%;
        height: 100%;
        &.play{
          animation: rotate 20s linear infinite;
        }
        &.pause{
          animation-play-state: paused;
        }
       img{
         border-radius: 50%;
       }
      }
      .mini-font{
         display: flex;
         flex-flow: column;
         justify-content: center;
           padding: 0 10px;
           width: 68%;
         div{
          height: 20px;
          line-height: 25px;
         }
      }
      .mini-play{
        .iconfont{
          font-size: 26px;
        }
      }
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
