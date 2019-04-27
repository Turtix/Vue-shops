<template>
  <section class="msite">
    <!-- 首页头部 -->
    <Header :title="address.name || '正在获取中'">
      <!--使用插槽,子组件写<slot name='xx'>,父组件写<Son slot='xx'> -->
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right" v-show="!user._id">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container"  v-if="categories.length">
        <div class="swiper-wrapper" >
          <div class="swiper-slide" v-for="(categorys,index) in categoriesList" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c) in categorys" :key="c.id">
              <div class="food_container">
                <!--https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg-->
                <img :src="'https://fuss10.elemecdn.com' + c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </section>
</template>

<script>
  // 1.引入swiper
  import Swiper from 'swiper'
  // 2.引入swiper.css
  import 'swiper/dist/css/swiper.min.css'
  import ShopList from '../../components/ShopList/ShopList'

  import {mapState,mapGetters} from 'vuex'
  export default {
    name: 'MSite',
    components: {
      ShopList
    },
    computed: {
      // state是总状态
      // vuex模块化方式获取状态数据
      ...mapState({
        address: state => state.msite.address,
        categories: state => state.msite.categories,
        user: state => state.user.user,
      }),
      ...mapGetters(['categoriesList'])
    },
    mounted() {
      //轮播图代码
      /*new Swiper ('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项 vertical   horizontal：横向切换
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },

        //自动轮播
        autoplay: {
          delay: 4000,//秒切换一次
          disableOnInteraction: false,
        },
      })*/

      /*//发送ajax 请求位置信息
      const result =await reqAddress(40.10038,116.36867)
      console.log(result)*/
      // this.$store.dispatch('getAddress')
      this.$store.dispatch('getCategorys')

    },
    /*
   解决swiper对象创建后轮播有问题?
   原因: 创建swiper太早(应该在列表数据显示之后)
   解决:
       watch: 列表状态数据更新了(有数据)
       $nextTick: 列表界面更新显示了
   */
    watch: {
      // 状态数据变化: 立即同步执行监视的回调, 异步更新界面
      categories(value) { //categories变为有数据的数组

        /*
        将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
        Vue.$nextTick(): 在状态数据更新之后立即执行(界面还没有更新)
        回调函数: 由这次数据更新导致界面更新完成后执行
         */
        this.$nextTick(() => {
          // 创建时机: 在数据页面显示之后创建
          new Swiper('.swiper-container', {
            direction: 'horizontal', // 垂直切换选项 vertical   horizontal：横向切换
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            //自动轮播
            autoplay: {
              delay: 4000,//秒切换一次
              disableOnInteraction: false,
            },
          })
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
