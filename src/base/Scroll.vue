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
      default: 3
    }
  },
  methods: {
    scoll () {
      this.$emit('scoll', this.posy)
    },
    initscroll () {
      if (!this.$refs.scroll) return
      this.scroll = new Bscroll(this.$refs.scroll, {
        probeType: this.probeType,
        click: true
      })
      this.scroll.on('scroll', ({ x, y }) => {
        this.scoll()
        this.posy = y
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
    },
    scrollto () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrolltoelement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
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
    this.scoll()
    this.$nextTick(() => {
      this.initscroll()
    })
  }
}
</script>
