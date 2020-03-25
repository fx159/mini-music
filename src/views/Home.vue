<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
import { loadserachhot } from '../api/test'
export default {
  name: 'Home',
  created () {
    loadserachhot().then(data => {
      console.log(data)
    })
  }
}
</script>
