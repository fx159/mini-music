<template>
  <div class="about">
    <h1>推荐页</h1>
    <div v-if="banners.length">
      <div>
    <Loop>
      <div v-for="(banner,index) in banners" :key="`${index}+banner`">
         <a href="#">
            <img :src="banner.imageUrl" alt="">
         </a>
      </div>
    </Loop>
    </div>
    </div>
  </div>
</template>
<script>
import { loadbanner } from '../api/api'
import Loop from '../base/Loop'
export default {
  name: 'Recommended',
  data () {
    return {
      bannerid: 2,
      banners: ''
    }
  },
  created () {
    loadbanner(this.bannerid).then(data => {
      this.banners = data
    })
  },
  components: {
    Loop
  }
}
</script>
