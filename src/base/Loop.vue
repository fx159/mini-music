<template>
  <div class="scroll" ref="scroll">
    <div class="scroll-group" ref="scrollgroup">
       <slot></slot>
    </div>
    <div class="dots"></div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Bscroll from 'better-scroll'
import { addclass } from '../utils/util'
export default {
  name: 'Loop',
  props: {
    isloop: {
      default: true,
      type: Boolean
    },
    autoloop: {
      default: true,
      type: Boolean
    },
    looptime: {
      default: 4000,
      type: Number
    }
  },
  methods: {
    initloop () {
      this.slider = new Bscroll(this.$refs.scroll, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: { loop: this.isloop },
        snapLoop: true,
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
    },
    setloopwidth () {
      this.children = this.$refs.scrollgroup.children
      console.log(this.children.length)
      // eslint-disable-next-line no-unused-vars
      let width = 0
      // eslint-disable-next-line no-unused-vars
      const sliderwidth = this.$refs.scroll.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i]
        addclass(child, 'slider-item')

        child.style.width = sliderwidth + 'px'
        width += sliderwidth
      }

      if (this.isloop) {
        width += sliderwidth
      }
      this.$refs.scrollgroup.style.width = width + 'px'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initloop()
      this.setloopwidth()
    })
  }
}
</script>
<style lang="less" scoped>
.scroll{
   height: 100%;
  .scroll-group{
    height: 200px;
    overflow: hidden;
    white-space: nowrap;
    img{
      width: 100%
    }
  }
  .slider-item{
    float: left;
    text-align: center;
    overflow: hidden;
    }
}
</style>
