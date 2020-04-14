<template>
  <div class="ranking">
    <p v-for="(list, index) in lists" :key="index">{{list.name}}</p>
  </div>
</template>
<script>
import { loadranktoplist } from '@/api/ranking'
export default {
  name: 'Ranking',
  data () {
    return {
      lists: []
    }
  },
  created () {
    loadranktoplist().then(data => {
      console.log(data)
      this.lists = data.list
    })
  }
}
</script>
<style lang="less" scoped>
.ranking{
  position: absolute;
  top:40px;
  left: 0;
  bottom: 0;
}
</style>
