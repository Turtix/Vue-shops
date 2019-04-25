<template>
  <div id="app">
    <router-view />
    <FooterGuide v-show="$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import Vue from 'vue'
import FooterGuide from './components/FooterGuide/FooterGuide'
import Header from './components/Header/Header'
// 注册全局组件
Vue.component('Header',Header)

export default {
  name: 'App',
  components: {
    FooterGuide
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
