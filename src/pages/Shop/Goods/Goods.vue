<template>
  <div>
    <div class="goods" v-if="goods">
      <!-- 分类菜单 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul ref="leftUL">
          <li class="menu-item " :class="{current: currentIndex===index}"
              v-for="(good,index) in goods" :key="index" @click="goCurrent(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-show="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <!-- 食物列表 -->
      <div class="foods-wrapper" >
        <ul ref="rightUL">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index" >
            <h1 class="title">{{good.name}}</h1>
            <ul >
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" >
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="now" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../../../components/CartControl/CartControl'
  export default {
    name: 'Goods',
    components: {
      CartControl
    },
    data() {
      return {
        scrollY: 0, //右侧Y轴滑动的坐标
        tops: [], // 包含右侧所有分类小列表的top值
      }
    },
    mounted() {
      // 现在版本可以直接在mounted写new BScroll('.menu-wrapper'),
      // 不会出现类似new Swiper在界面尚未更新时创建,无法实现轮播和滑屏的效果.
      // new BScroll('.menu-wrapper')

      // 防止切换到其他页面后,再回来页面重新渲染,没有滑动效果
      if(this.goods.length > 0) {
        this.initScroll ()
        this.initTops()
      }
    },
    computed: {
      ...mapState({
        goods: (state) => {return state.shop.goods}
      }),

      // 当前分类的下标
      currentIndex(val){
        const {scrollY,tops} = this
        // findIndex查找第一个满足条件的下标
        const index = tops.findIndex((top,index) => scrollY >= top && scrollY < tops[index+1])
        /*
          确保每次currentIndex发生改变的时候,就立马显示对应的菜单项
          1. 需要将每次显示的当前菜单项保存起来this.index
          2. 一旦下标发生改变,就立马更新它this.index = index(index为新的值)
          3. 初次显示,没有滑动,界面没有被更新,leftScroll还没有被创建,此时不需要更新index
        */

        if(this.index !== index && this.leftScroll){
          this.index = index
          // 一旦currentIndex发生改变, 将左侧列表滑动到对应的分类项(有可能达不到这个目标, 但至少是在可见范围内的)
          // scrollToElement(el, time, offsetX, offsetY, easing)滚动到指定的目标元素。
          const li = this.$refs.leftUL.children[index]
          this.leftScroll.scrollToElement(li, 300)
        }
        return this.index
      }
    },
    methods: {
      initTops() {
        // 统计所有li的top
        const tops = []
        let top = 0
        tops.push(top)
        const lis = this.$refs.rightUL.children
        // 伪数组转换成真数组
        Array.from(lis).forEach((item)=>{
          top += item.clientHeight
          tops.push(top)
        })

        this.tops = tops
        // console.log("tops",tops)
      },
      initScroll () {
        // 左侧分类列表的BScroll对象
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true //响应点击
        })

        // 右侧食品列表的BScroll对象
        this.rightScroll = new BScroll('.foods-wrapper',{
          probeType: 1, // 非实时  触摸
          // probeType: 2, // 实时 触摸
          // probeType: 3, // 实时 触摸 / 惯性 / 编码
          click: true //响应点击
        })

        // 监视rightScroll右侧滑动
        this.rightScroll.on('scroll',(event)=>{
          const {x,y} = event
          console.log(x,y)
          this.scrollY = Math.abs(y)
        })

      },

      // 点击左侧食品菜单,右侧跳转到指定位置
      goCurrent(index){
        const top = this.tops[index]
        // 左侧点亮选中点击的菜单
        this.scrollY = top
        if(this.leftScroll){
          // 右侧滚动到指定的位置 scrollTo(x, y, time, easing)
          this.rightScroll.scrollTo(0, -top,300)
        }

      }

      //

    },
    // 利用watch + nextTick 解决better-scroll不能滑动问题
    watch: {
      // 解决之前版本 数据没更新和界面没有更新 无法显示滑屏的效果的BUG
      goods(){  //goods有数据了

        // 左侧分类列表的BScroll
        this.$nextTick(()=>{ // 界面更新了
          // 初始化滑屏
          this.initScroll()

          // 初始化的时候给tops赋值
          this.initTops()

        })

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      /*overflow auto*/
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      /*overflow auto*/
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
