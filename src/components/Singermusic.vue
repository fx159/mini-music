<template>
  <div class="singer-music">
    <list-music :img ="artists.img1v1Url" :title="artists.name" :song="hotsongs"></list-music>
  </div>
</template>
<script>
import { loadsingermusic } from '@/api/singer'
import ListMusic from '@/base/ListMusic'
export default {
  name: 'Singermisic',
  data () {
    return {
      lists: [],
      artists: '',
      hotsongs: []
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
    ListMusic
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
}
</style>
