<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="item" @click="playOnmusic(song,index)" v-for="(song,index) in songs" :key="index" v-show ='query'>{{song.artists[0].name}}-{{song.album.name}}</li>
    </ul>
  </div>
</template>

<script>
import { loadserachlist } from '@/api/serach'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      songs: ''
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  methods: {
    serach () {
      loadserachlist(this.query).then(data => {
        console.log(data)
        this.songs = data.result.songs
      })
    },
    playOnmusic (song, index) {
      this.playmusic({ list: this.songs, index: index })
      this.$emit('query', '')
    },
    ...mapActions(['playmusic'])
  },
  watch: {
    query (nvl) {
      if (nvl) {
        this.serach()
      }
    }
  },
  created () {
    // this.loadmusic()
  }
}
</script>

<style lang="less" scoped>
  .suggest{
    position: absolute;
    top:30px;
    left: 0;
    right: 0;
    .suggest-list{
      list-style: none;
      padding-left: 0;
      width: 80%;
      margin: 0 auto;
      overflow: hidden;
      background-color: #ccc;
      .item{
        height: 30px;
        width: 200px;
        padding: 5px 0;
        white-space: nowrap;
      }
    }
  }
</style>
