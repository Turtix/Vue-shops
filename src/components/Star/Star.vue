<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(sc,index) in scs" :key="index" :class="sc"></span>
    <!--<span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item half"></span>
    <span class="star-item off"></span>-->
  </div>
</template>

<script>
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'
  export default {
    name: 'Star',
    props: {
      starCount: Number,
      size: Number
    },
    computed:{
      scs() {
        //小星星代码
        //计算小星星的数量
        const starNum = +this.starCount //+强制类型转换  也可以不加+ 后面会做隐式类型转换
        const arr = []
        const on_star = Math.floor(starNum)  //会做隐式类型转换
        const half_star = Math.round(starNum) - on_star
        // 添加 小星星on类名
        for(let i = 0 ;i < on_star;i ++){
          arr.push(CLASS_ON)
        }
        // 添加 小星星half类名
        if (half_star > 0) {
          arr.push(CLASS_HALF)
        }
        // 添加 小星星off类名
        while (arr.length < 5) {
          arr.push(CLASS_OFF)
        }
        return arr
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0

    .star-item
      display inline-block
      background-repeat no-repeat

    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px

        &:last-child
          margin-right: 0

        &.on
          bg-image('./images/stars/star48_on')

        &.half
          bg-image('./images/stars/star48_half')

        &.off
          bg-image('./images/stars/star48_off')

    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px

        &:last-child
          margin-right 0

        &.on
          bg-image('./images/stars/star36_on')

        &.half
          bg-image('./images/stars/star36_half')

        &.off
          bg-image('./images/stars/star36_off')

    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px

        &:last-child
          margin-right 0

        &.on
          bg-image('./images/stars/star24_on')

        &.half
          bg-image('./images/stars/star24_half')

        &.off
          bg-image('./images/stars/star24_off')
</style>
