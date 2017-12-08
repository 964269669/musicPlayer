<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wraper">
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img :src="item.picUrl"/>
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'

  export default {
    data() {
      return {
        recommends: []
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      // 获得推荐(轮播图数据)
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      // 获得歌单
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            console.log(1)
          } else {
            console.log(2)
          }
        })
      }
    },
    components: {
      Slider
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable";

</style>