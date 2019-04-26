<template>
  <div id="app">
    <router-view />
    <FooterGuide v-show="$route.meta.isShowFooter"/>
  </div>
</template>

<script>

import FooterGuide from './components/FooterGuide/FooterGuide'

export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted () {
    // 保证每次刷新页面时,都会得到保存的用户数据
    this.$store.dispatch('getUser')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
