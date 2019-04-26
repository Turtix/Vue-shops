/* ajax 请求函数模块  发送请求 */
import axios from 'axios'

export default function ajax (url, data = {}, method = 'GET') {

  // 请求方式转换成大写
  method = method.toUpperCase()

  // 为了不在外面处理异常  可以包一层promise对象
  // 外面promise  会将里面promise的返回值作为自己的返回值返回
  /*return new Promise((resolve, reject) => {
    // 执行异步ajax请求
    let promise = null
    if (method === 'GET') {
      // params 指定的是get请求的query参数
      promise = axios.get(url, { params: data })
    } else {
      // 第二个参数是: 请求参数对象
      promise = axios.post(url, data)
    }

    // 如果成功 执行resolve
    // 如果失败 不调用reject 提示错误信息
    promise
      .then((res) => {
        // 返回响应数据
        resolve(res.data)
      })
      .catch((err) => {
        console.log('请求失败' + err.message)
      })
  })*/

  // 可以简写如下
  let promise = null
  if (method === 'GET') {
    promise = axios.get(url, { params: data })
  } else {
    promise = axios.post(url, data)
  }
  // console.log(promise)
  return promise
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err.message)
    })
}
