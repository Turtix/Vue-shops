import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import Header from './components/Header/Header'
import Star from './components/Star/Star'
import CartControl from './components/CartControl/CartControl'
import Split from './components/Split/Split'
import { Button } from 'mint-ui'
import './mock/mockServer'
import './validate'

// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component('Split', Split)
// mt-button
Vue.component(Button.name, Button)

// 绑定时间总线$eventBus到Vue的原型上
Vue.prototype.$eventBus = new Vue

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
