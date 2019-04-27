/*
  用户模块
*/

import { RECEIVE_USER, RESET_USER } from '../mutataionsType'
import { reqUserInfo, reqLogout } from '../../api'

const state = {
  // 用户信息
  user: {}
}
const mutations = {
  /* 获取用户信息 */
  [RECEIVE_USER] (state, user) {
    state.user = user
  },
  /* 重置用户信息 */
  [RESET_USER] (state) {
    state.user = {}
  },
}
const actions = {
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
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}
