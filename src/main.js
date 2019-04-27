import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import Header from './components/Header/Header'
import Star from './components/Star/Star'
import { Button } from 'mint-ui'
import './mock/mockServer'

// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
// mt-button
Vue.component(Button.name, Button)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
