<template>
  <footer class="footer_guide border-1px">
    <!-- class属性用对象的形式写(属性名确定,不确定有没有)  -->
    <span  class="guide_item " :class="{on: $route.path=='/msite' }" @click="goTo('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </span>
    <span  class="guide_item" :class="{on: $route.path=='/search' }" @click="goTo('/search')">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </span>
    <span  class="guide_item" :class="{on: $route.path=='/order' }" @click="goTo('/order')">
      <span class="item_icon">
      </span>
        <i class="iconfont icon-dingdan"></i>
      <span>订单</span>
    </span>
    <!-- $route当前路由对象,一些当前路由信息数据的容器,path/meta/query/params -->
    <span  class="guide_item" :class="{on: $route.path=='/profile' }" @click="goTo('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </span>
  </footer>
</template>

<script>
  export default {
    name: 'FooterGuide',
    data () {
      return {}
    },
    methods: {
      //通过绑定事件的形式  编程式路由跳转
      goTo(path){
        //$router 路由器对象,包含一些路由跳转函数,用来实现编程式路由导航
        this.$router.replace(path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.footer_guide //footer
  top-border-1px(#e4e4e4)
  position fixed
  z-index 100
  left 0
  right 0
  bottom 0
  background-color #fff
  width 100%
  height 50px
  display flex
  .guide_item
    display flex
    flex 1
    text-align center
    flex-direction column
    align-items center
    margin 5px
    color #999999
    &.on
      color #02a774
    span
      font-size 12px
      margin-top 2px
      margin-bottom 2px
      .iconfont
        font-size 22px
</style>
