<template>
  <div class="scroll" ref="scroll">
    <div class="scroll-group" ref="scrollgroup">
       <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" @touchstart="selectdot(index)" v-for="(item, index) in dots" :class="{active: currtindex===index}" :key="index"></span>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Bscroll from 'better-scroll'
import { addclass } from '../utils/util'
export default {
  name: 'Loop',
  data () {
    return {
      currtindex: 0,
      dots: []
    }
  },
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
      default: 2000,
      type: Number
    }
  },
  methods: {
    selectdot (index) {
      this.currtindex = index
      this.slider.goToPage(this.currtindex, 0, 400)
    },
    indots () {
      const length = this.children.length - 2
      this.dots = new Array(length)
    },
    initloop () {
      this.slider = new Bscroll(this.$refs.scroll, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: { loop: true },
        snapLoop: true,
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
      this.slider.on('scrollEnd', () => {
        const index = this.slider.getCurrentPage().pageX
        if (this.isloop) this.currtindex = index
        if (this.autoplay) {
          clearTimeout(this.timer)
          this.autoplay()
        }
      })
    },
    setloopwidth () {
      this.children = this.$refs.scrollgroup.children
      let width = 0
      const sliderwidth = this.$refs.scroll.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i]
        addclass(child, 'scroll-item')
        child.style.width = sliderwidth + 'px'
        width += sliderwidth
      }
      this.$refs.scrollgroup.style.width = width + 'px'
    },
    autoplay () {
      let pageindex = this.currtindex + 1
      if (this.autoplay) {
        this.timer = setTimeout(() => {
          if (pageindex === this.children.length - 2) pageindex = 0
          this.slider.goToPage(pageindex, 0, 400)
        }, this.looptime)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initloop()
      this.setloopwidth()
      this.indots()
    })
    if (this.autoplay) {
      this.autoplay()
    }
    window.addEventListener('resize', () => {
      if (!this.slider) return
      this.setloopwidth()
      this.initloop()
    })
  },
  activated () {
    // this.initloop()
    // this.setloopwidth()
    // this.indots()
    // if (this.autoplay) {
    //   this.autoplay()
    // }
  }
}
</script>
<style lang="less" scoped>
.scroll{
   min-height: 1px;
   max-height: 300px;
   position: relative;
  .scroll-group{
    overflow: hidden;
    white-space: nowrap;
    img{
      width: 100%
    }
  }
  .scroll-item{
    float: left;
    text-align: center;
    overflow: hidden;
    }
  .dots{
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot{
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: red;
      &.active{
        width: 20px;
        border-radius: 5px;
        background-color: red;
      }
     }
  }
}
</style>
