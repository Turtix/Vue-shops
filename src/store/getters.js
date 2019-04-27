export default {
  /*
  根据categories生成二维数组
  小数组最大长度是8
  计算属性  监听categories的变化,并改变categoriesList
   */
  categoriesList (state) {
    let categories = state.msite.categories
    const categoriesList = []
    const length = categories.length
    for (let i = length; i > 0; i = i - 8) {
      if (categories.length > 8) {
        categoriesList.push(categories.splice(0, 8))
      } else {
        categoriesList.push(categories)
      }
    }
    return categoriesList
  }
}
