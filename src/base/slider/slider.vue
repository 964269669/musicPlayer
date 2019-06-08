<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'

  export default {
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    // 轮播图的属性
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 1000
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots() // 初始化小圆点
        this._initSlider()
        // 如果是自动播放 一进入页面就调用
        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => {
        // 如果slider还没初始化 什么也不做
        if (!this.slider) {
          return
        }
        // 参数用来标记是否resize
        this._setSliderWidth(true)
        // 宽度重新计算完刷新slider
        this.slider.refresh()
      })
    },
    methods: {
      // 获取轮播图总宽度
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        // 轮播图总宽度
        let width = 0
        // 外层父盒子宽度
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          // 给每个轮播图添加样式
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          // 轮播图总宽度
          width += sliderWidth
        }
        // 如果是循环播放 BScroll会左右各克隆一个DOM(图片)
        // 所以加两个宽度，但是resize的时候不能再加
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        // 设置总宽度
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      // 初始化小圆点
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      // 初始化轮播
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false, // 当快速滑动时是否开启滑动惯性
          snap: true, // 是否允许捕捉元素
          snapLoop: this.loop,
          snapThreshold: 0.3, // 手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
          snapSpeed: 400
        })
        // 绑定scrollEnd(BScroll中)事件 处理当前显示的图片索引
        this.slider.on('scrollEnd', () => {
          // BScroll中的方法getCurrentPage().pageX
          let pageIndex = this.slider.getCurrentPage().pageX
          // 由于bscroll循环播放首尾各加一个,因此索引-1
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          // 如果是循环播放 再次调用this._paly()
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      // 轮播方法
      _play() {
         // currentPageIndex为不含首尾副本的索引，因此若循环要+1
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          // BScroll的方法 0 代表Y方向
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    // 切换歌单触发destroyed  生命周期destroyed销毁清除定时器，有利于内存释放
    destroyed() {
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable";

  .slider
    min-height: 1px
    overflow hidden
    position relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>