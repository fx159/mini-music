<template>
<div class="search">
  <div class="search-input">
     <span></span>
    <input type="text" v-model="query"  :placeholder="keywords">
    <span v-show="query" @click="clear">x</span>
  </div>
  <div class="search-list">
    <ul>
        <li v-for="(list,index) in lists " :key="index">
          {{list.first}}
        </li>
    </ul>
  </div>
</div>
</template>
<script>
import { loadserachlist } from '@/api/serach'
export default {
  name: 'Search',
  data () {
    return {
      keywords: '请输入关键词',
      query: '',
      lists: ''
    }
  },
  methods: {
    clear () {
      this.query = ''
    },
    serach () {
      loadserachlist().then(data => {
        console.log(data)
        this.lists = data.result.hots
      })
    }
  },
  watch: {
    query: function (newquery) {
      console.log(newquery)
    }
  },
  created () {
    this.serach()
  }
}
</script>
<style lang="less" scoped>
.search{
  position: absolute;
  top:40px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .search-input{
   width: 100%;
   height: 30px;
   text-align: center;
   padding: 10px;
   input{
     width: 80%;
   }
  }
}
</style>
