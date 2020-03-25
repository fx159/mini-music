<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

  </div>
</template>

<script>
// @ is an alias to /src
import { loadtest } from '../api/test'
export default {
  name: 'Home',
  created () {
    loadtest().then(data => {
      console.log(data)
    })
  }
}
</script>
