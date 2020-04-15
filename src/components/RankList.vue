<template>
  <div  class="ranking-list">
    <list-music :img ='detaillist.coverImgUrl' :title ='detaillist.name' :song ='songlist'></list-music>
  </div>
</template>
<script>
import ListMusic from '@/base/ListMusic'
import { loaddetail } from '@/api/recommend.js'
import { loadmusicmsg } from '@/api/song'
export default {
  data () {
    return {
      detaillist: '',
      ids: [],
      songlist: []
    }
  },
  components: {
    ListMusic
  },
  methods: {
    loaddetaillist () {
      const request = new Promise((resolve, reject) => {
        loaddetail(this.$route.params.id).then(data => {
          this.detaillist = data.playlist
          console.log(this.detaillist)
          this.ids = data.playlist.trackIds
          resolve(this.ids)
        })
      })
      return request
    },
    loadlistmusic () {
      this.loaddetaillist().then(data => {
        for (let i = 0; i < data.length; i++) {
          loadmusicmsg(data[i].id).then(data => {
            this.songlist.push(data)
          })
        }
      })
    }
  },
  created () {
    this.loadlistmusic()
  }
}
</script>
<style lang="less" scoped>
.ranking-list{
  position: fixed;
  right: 0;
  bottom: 0;
  top:0;
  left: 0;
  background-color: @bgc;
  z-index: 100;
}
</style>
