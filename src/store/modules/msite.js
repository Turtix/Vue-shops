/*
  外卖首页模块
*/

import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from '../mutataionsType'
import { reqAddress, reqShopList, reqCategories } from '../../api'

const state = {
  // 纬度
  latitude: 40.10038,
  // 经度
  longitude: 116.36867,
  // 获取的地理位置信息
  address: {},
  // 分类列表
  categories: [],
  // 商铺列表信息
  shopList: []
}
const mutations = {
  /* 获取用户地理位置信息 */
  [RECEIVE_ADDRESS] (state, newAddress) {
    state.address = newAddress
  },
  /* 获取分类列表 */
  [RECEIVE_CATEGORYS] (state, newCategories) {
    state.categories = newCategories
  },
  /* 获取商铺列表 */
  [RECEIVE_SHOPS] (state, newShopList) {
    state.shopList = newShopList
  }
}
const actions = {
  // 发送ajax 请求位置信息
  async getAddress ({ commit, state }) {
    const { latitude, longitude } = state
    // 1. 执行异步请求
    const result = await reqAddress(latitude, longitude)
    // 2. 根据结果, 提交mutation
    if (result.code === 0) {
      const newAddress = result.data
      commit(RECEIVE_ADDRESS, newAddress)
    }
  },
  // 获取分类列表的异步action
  async getCategorys ({ commit }) {
    // 1. 执行异步请求
    const result = await reqCategories()
    // 2. 根据结果, 提交mutation
    if (result.code === 0) {
      const newCategories = result.data
      commit(RECEIVE_CATEGORYS, newCategories)
    }
  },

  // 发送ajax 请求商家列表 reqShopList
  async getShopList ({ commit, state }) {
    const { latitude, longitude } = state
    // 1. 执行异步请求
    const result = await reqShopList({ latitude, longitude })
    // 2. 根据结果, 提交mutation
    if (result.code === 0) {
      const newShopList = result.data
      // console.log(newShopList)
      commit(RECEIVE_SHOPS, newShopList)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
