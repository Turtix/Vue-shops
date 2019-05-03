<template>
    <div>
      <ShopHeader />
      <div class="tab">
        <div class="tab-item">
          <router-link to="/shop/goods">点餐</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/shop/ratings">评价</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/shop/info">商家</router-link>
        </div>
      </div>
      <!-- 缓存路由组件: 上一个路由做了一些操作,切到下一个路由后再切回来,这些操作会被清空掉, 用keep-alive可以缓存路由 -->
      <keep-alive>
        <router-view/>
      </keep-alive>

    </div>

</template>

<script>
  import ShopHeader from  '../../components/ShopHeader/ShopHeader'
  import {reqGoods, reqRatings, reqInfo} from '../../api'
  import { RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO } from '../../store/mutataionsType'

  export default {
    name: 'Shop',
    components: {
      ShopHeader
    },
    async mounted () {
        // 发送三个请求分别获取: 商品列表 ,商家评价列表 ,商家信息
        const results = await Promise.all([reqGoods(), reqRatings(), reqInfo()])
        const goods = results[0].data
        const ratings = results[1].data
        const info = results[2].data
        this.$store.commit(RECEIVE_GOODS,goods)
        this.$store.commit(RECEIVE_RATINGS,ratings)
        this.$store.commit(RECEIVE_INFO,info)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774

</style>
