// 引入moment
import moment from 'moment'

import Vue from 'vue'


// 日期格式化  moment
// Vue.filter('dateString', function (value, formatStr) {
//   return moment(value).format(formatStr || 'YYYY-MM-DD HH:mm:ss')
// })


import format from 'date-fns/format'
Vue.filter('date-format', function (value, formatStr) {
  return format(value, formatStr || 'YYYY-MM-DD HH:mm:ss')
})
