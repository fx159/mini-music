<template>
  <div class="recommended">
    <h1>推荐页</h1>
    <div v-if="banners.length">
      <!-- 判断是否拿到轮播图数据 -->
    <Loop>
      <div v-for="(banner,index) in banners" :key="`${index}+banner`">
         <a href="#">
            <img :src="banner.imageUrl" alt="">
         </a>
      </div>
    </Loop>
    </div>
    <div class="recommend">
      热门推荐
      <div v-for="(list,index) in loadname" :key="index" class="recommend-name">
           {{list.name}}
      </div>
      <div v-for="(item, index) in loadimg" :key="`${index}+img`" class="recommend-img">
         <img :src="item.coverImgUrl" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { loadbanner, loadplayhot, loaddetail } from '../api/api'
import Loop from '../base/Loop'
export default {
  name: 'Recommended',
  data () {
    return {
      bannerid: 2,
      banners: '',
      loadimg: [],
      loadname: [],
      loadid: [],
      data: ''
    }
  },
  methods: {
    loadrecommend () {
      loadplayhot().then(data => {
        for (let i = 0; i < data.length; i++) {
          this.loadid[i] = data[i]
          this.loadname[i] = Object.assign({}, this.loadid[i].playlistTag)
          loaddetail(this.loadid[i].id).then(data => {
            this.loadimg.push(data.playlist)
          })
        }
        this.loadname = Object.assign({}, this.loadname)
      })
    }
  },
  created () {
    loadbanner().then(data => {
      this.banners = data
    })
    this.loadrecommend()
  },
  mounted () {
  },
  components: {
    Loop
  }
}
</script>
<style lang="less" scoped>
.recommend{
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .recommend-name{
     flex: 0 auto 20px
  }
  .recommend-img{
    flex-grow: 1;
    >img{
      width: 100%;
    }
  }
}
</style>
