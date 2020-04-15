<template>
  <div class="recommen-list">
     <list-music :img ='listmusic.coverImgUrl' :song ='songlist' :title="listmusic.name"></list-music>
  </div>
</template>
<script>
import ListMusic from '@/base/ListMusic'
import { loaddetail } from '@/api/recommend.js'
import { loadmusicmsg } from '@/api/song'
export default {
  name: 'RecommendList',
  data () {
    return {
      listmusic: '',
      ids: [],
      songlist: []
    }
  },
  components: {
    ListMusic
  },
  methods: {
    loadmusiclist () {
      const request = new Promise((resolve, reject) => {
        loaddetail(this.$route.params.id).then(data => {
          this.listmusic = data.playlist
          console.log(this.listmusic)
          this.ids = data.playlist.trackIds
          resolve(this.ids)
        })
      })
      return request
    },
    loadsonglist () {
      this.loadmusiclist().then(res => {
        for (let i = 0; i < res.length; i++) {
          loadmusicmsg(res[i].id).then(data => {
            this.songlist.push(data)
          })
        }
        console.log(this.songlist)
      })
    }
  },
  created () {
    this.loadsonglist()
  }
}
</script>
<style lang="less" scoped>
.recommen-list{
  position: fixed;
  right: 0;
  bottom: 0;
  top:0;
  left: 0;
  background-color: @bgc;
  z-index: 100;
}
</style>
