/* 包含n个接口请求函数的模块 */
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = '/api'

/* 根据经纬度获位置详情   param参数需要自己拼串 */
export const reqAddress = (latitude, longitude) => ajax(BASE + `/position/${latitude},${longitude}`)

/* 获取视频分类列表 */
export const reqCategories = () => ajax(BASE + '/index_category')

/* 根据经纬度获取商铺列表  query参数不需要 直接用对象形式传 */
export const reqShopList = ({latitude, longitude}) => ajax(BASE + '/shops', {latitude, longitude})

/* 根据手机号发送短信验证码 */
export const reqSendCode = (phone) => ajax(BASE + '/sendcode', {phone})

/* 根据手机号验证码 验证登录 */
export const reqLoginSms = (phone, code) => ajax(BASE + '/login_sms', {phone, code}, 'POST')

/* 根据用户名密码 验证登录 */
export const reqLoginPwd = (name, pwd, captcha) => ajax(BASE + '/login_pwd', {name, pwd, captcha}, 'POST')

/* 根据会话获取用户信息 */
export const reqUserInfo = () => ajax(BASE + '/userinfo')

/* 退出登录 */
export const reqLogout = () => ajax(BASE + '/logout')

/* mock模拟获取goods,ratings,info数据 发送的ajax请求会被mock拦截 ,并返回模拟数据 */
/* 获取商品列表  */
export const reqGoods = () => ajax('/goods')

/* 获取评价列表 */
export const reqRatings = () => ajax('/ratings')

/* 获取商家信息 */
export const reqInfo = () => ajax('/info')
