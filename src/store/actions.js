import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER, RESET_USER } from './mutataionsType'
import { reqAddress, reqShopList, reqCategories, reqUserInfo, reqLogout } from '../api'

export default {
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
  },

  // 发送ajax 请求获取当前用户
  async getUser ({ commit, state }) {
    // 1. 执行异步请求
    const result = await reqUserInfo()
    // 2. 根据结果, 提交mutation
    if (result.code === 0) {
      const user = result.data
      commit(RECEIVE_USER, user)
    }
  },

  // 发送ajax 请求删除当前用户信息
  async logoutUser ({ commit, state }) {
    // 1. 执行异步请求
    const result = await reqLogout()
    // 2. 根据结果, 提交mutation
    if (result.code === 0) {
      commit(RESET_USER)
    }
  }
}
