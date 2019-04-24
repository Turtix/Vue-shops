/* 包含n个接口请求函数的模块 */
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = '/api'

/* 根据经纬度获位置详情   param参数需要自己拼串 */
export const reqAddress = (latitude, longitude) => ajax(BASE + `/position/${latitude},${longitude}`)

/* 获取视频分类列表 */
export const reqCategories = () => ajax(BASE + '/index_category')

/* 根据经纬度获取商铺列表  query参数不需要 直接用对象形式传 */
export const reqShopList = ({ latitude, longitude }) => ajax(BASE + '/shops', { latitude, longitude })
