<template>
  <scroll class="hotsong-list">
    <div>
    <div class="singer-img" v-if="img" :style="{'backgroundImage': `url(${img})`,backgroundSize:'100% ',backgroundRepeat:'no-repeat'}">
      <!-- <img :src="artists.img1v1Url" alt="" width="100%"> -->
      <div class="singer-descrtion">
        <span>{{title}}</span>
      </div>
    </div>
      <div>
        <div v-for="(hotsong, index) in song" :key="index">
          {{hotsong.name}}
        </div>
    </div>
    </div>
    </scroll>
</template>
<script>
import scroll from '@/base/Scroll'
export default {
  name: 'ListMusic',
  props: {
    img: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    song: {
      type: Array,
      default: null
    }
  },
  components: {
    scroll
  }
}
</script>
<style lang="less" scoped>
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
    top:20px;
    width:100%;
    overflow:hidden;
    right:0;
    bottom:0
  }
</style>
