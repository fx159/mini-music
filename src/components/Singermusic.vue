<template>
  <div class="singer-music">
    <div class="singer-img" v-if="artists.img1v1Url" :style="{'backgroundImage': `url(${artists.img1v1Url})`,backgroundSize:'100% ',backgroundRepeat:'no-repeat'}">
      <!-- <img :src="artists.img1v1Url" alt="" width="100%"> -->
      <div class="singer-descrtion">
        <span>{{artists.name}}</span>
      </div>
    </div>
    <scroll class="hotsong-list">
      <div>
        <div v-for="(hotsong, index) in hotsongs" :key="index">
          {{hotsong.name}}
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import { loadsingermusic } from '@/api/singer'
import scroll from '@/base/Scroll'
export default {
  name: 'Singermisic',
  data () {
    return {
      lists: [],
      artists: '',
      hotsongs: []
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    descr () {
      return this.artists.briefDesc.substr(0, 32)
    }
  },
  methods: {
    loadmusiclist () {
      loadsingermusic(this.$route.params.id).then(res => {
        console.log(res)
        this.artists = res.artist
        this.hotsongs = res.hotSongs
      })
    }
  },
  components: {
    scroll
  },
  created () {
    this.loadmusiclist()
  }
}
</script>
<style lang="less" scoped>
.singer-music{
  position: fixed;
  right: 0;
  bottom: 0;
  top:0;
  left: 0;
  background-color: @bgc;
  z-index: 100;
  .singer-img{
    height: 280px;
    width: 100%;
    position: relative;
    color:#fff
  }
  .singer-descrtion{
    position: absolute;
    left: 20px;
    bottom: 50px;
  }
  .hotsong-list{
    position:absolute;
    top:300px;
    width:100%;
    overflow:hidden;
    right:0;
    bottom:0
  }
}
</style>
