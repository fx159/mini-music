<template>
  <div ref='scroll'>
    <slot></slot>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    data: {
      type: Array,
      default: null
    },
    probeType: {
      type: Number,
      default: 1
    }
  },
  methods: {
    initscroll () {
      if (!this.$refs.scroll) return
      this.scroll = new Bscroll(this.$refs.scroll, {
        probeType: this.probeType,
        click: true
      })
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    data () {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initscroll()
    })
  }
}
</script>
