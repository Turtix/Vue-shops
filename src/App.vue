<template>
  <div>
    <router-view />
    <FooterGuide />
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

</style>
