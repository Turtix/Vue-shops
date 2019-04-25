import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from './mutataionsType'

export default {
  [RECEIVE_ADDRESS] (state, newAddress) {
    state.address = newAddress
  },
  [RECEIVE_CATEGORYS] (state, newCategories) {
    state.categories = newCategories
  },
  [RECEIVE_SHOPS] (state, newShopList) {
    state.shopList = newShopList
  }
}
