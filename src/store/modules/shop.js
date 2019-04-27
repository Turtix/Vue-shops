/*
  商家模块
*/

import { RECEIVE_GOODS, RECEIVE_INFO, RECEIVE_RATINGS } from '../mutataionsType'

const state = {
  // 商品列表
  goods: [],
  // 商家评价列表
  ratings: [],
  // 商家信息
  info: {}
}
const mutations = {
  /* 获取商品列表 */
  [RECEIVE_GOODS] (state, goods) {
    state.goods = goods
  },
  /* 获取评价列表 */
  [RECEIVE_RATINGS] (state, ratings) {
    state.ratings = ratings
  },
  /* 获取商家信息 */
  [RECEIVE_INFO] (state, info) {
    state.info = info
  }
}
const actions = {

}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}
