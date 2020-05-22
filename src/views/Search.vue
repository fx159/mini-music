<template>
<div class="search">
  <div class="search-input">
     <span></span>
    <input type="text" v-model="query"  :placeholder="keywords">
    <span v-show="query" @click="clear">x</span>
  </div>
   <Suggest :query='query' @query ='clearquery'></Suggest>
  <div class="search-list" v-show="!query">
    <div>热门搜索：</div>
    <ul class="list-item">
        <li v-for="(list,index) in lists " :key="index" class="item" @click="setquery(list)">
          {{list.first}}
        </li>
    </ul>
  </div>
</div>
</template>
<script>
import Suggest from '@/components/Suggest'
import { loadserachhot } from '@/api/serach'
export default {
  name: 'Search',
  data () {
    return {
      keywords: '请输入关键词',
      query: '',
      lists: ''
    }
  },
  components: {
    Suggest
  },
  methods: {
    clear () {
      this.query = ''
    },
    serach () {
      loadserachhot().then(data => {
        console.log(data)
        this.lists = data.result.hots
      })
    },
    setquery (list) {
      this.query = list.first
    },
    clearquery (query) {
      this.query = query
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
   position: relative;
   text-align: center;
   padding: 10px;
   input{
     width: 70%;
   }
  }
  .search-list{
    width: 100%;
    height: 100%;
    .list-item{
       padding-left: 0;
       list-style: none;
      .item{
          float: left;
          margin-left: 18px;
          margin-top: 10px;
          box-sizing: border-box;
          border: 1px #ccc solid;
          border-radius: 10px;
      }
    }
  }
}
</style>
