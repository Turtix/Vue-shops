import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER, RESET_USER } from './mutataionsType'

export default {
  [RECEIVE_ADDRESS] (state, newAddress) {
    state.address = newAddress
  },
  [RECEIVE_CATEGORYS] (state, newCategories) {
    state.categories = newCategories
  },
  [RECEIVE_SHOPS] (state, newShopList) {
    state.shopList = newShopList
  },
  [RECEIVE_USER] (state, user) {
    state.user = user
  },
  [RESET_USER] (state) {
    state.user = {}
  }

}
