/*
  商家模块
*/
import Vue from 'vue'
import {
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from '../mutataionsType'

const state = {
  // 商品列表
  goods: [],
  // 商家评价列表
  ratings: [],
  // 商家信息
  info: {},
  // 商品food的count数量
  shopCart: [], //购物车
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
  },
  /* 添加food的count数量 */
  [INCREMENT_FOOD_COUNT] (state, food) {
    if(!food.count) {
      // 第一次添加到购物车
      // food.count = 1
      // 问题: 新添加的属性没有数据劫持==>数据绑定==>更新了数据但界面不变
      Vue.set(food, 'count', 1) // 给有数据绑定的对象添加指定属性名和值的属性(有绑定)
      state.shopCart.push(food)
    }else {
      // 第n次添加到购物车
      // 为什么可以直接用food.count  而不是state.state.shopCart.count???????
      food.count++
    }
  },
  /* 减少food的count数量 */
  [DECREMENT_FOOD_COUNT] (state, food) {
    console.log(food.count)
    if(food.count) {

      // food 有值才能减
      food.count--
      if(food.count === 0) {
        state.shopCart.splice(state.shopCart.indexOf(food),1)
      }
    }
  },
}
const actions = {
  // 更新购物车中的food的count
  updateFoodCount({commit},{food,isAdd}){
    if(isAdd) {
      commit(INCREMENT_FOOD_COUNT,food)
    }else {
      commit(DECREMENT_FOOD_COUNT,food)
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
