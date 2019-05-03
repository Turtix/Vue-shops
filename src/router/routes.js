/*import MSite from '../pages/MSite/MSite'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'*/

/*
使用import()加载一个模块: 被加载的模块会被拆分打包(code split: 代码分割)
将配置路由组件时: component配置的不是路由组件, 而是返回一个组件的函数,
              只有当请求对应的path时, 才会执行函数获取组件模块代码
 */
//  目的:提高首屏加载的速度
const MSite = () => import('../pages/MSite/MSite')
const Search = () => import('../pages/Search/Search')
const Order = () => import('../pages/Order/Order')
const Profile = () => import('../pages/Profile/Profile')


import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import Goods from '../pages/Shop/Goods/Goods'
import Ratings from '../pages/Shop/Ratings/Ratings'
import Info from '../pages/Shop/Info/Info'

export default [
  {
    path: '/msite',
    component: MSite,
    // 路由元信息  决定是否显示底部信息
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isShowFooter: false
    }
  },
  {
    path: '/shop',
    component: Shop,
    // 不加meta  等同于上面的false
    children: [
      {
        path: '/shop/goods',
        component: Goods
      },
      {
        path: '/shop/ratings',
        component: Ratings
      },
      {
        // 二级路由可以简写
        path: 'info',
        component: Info
      },
      {
        path: '/',
        redirect: '/shop/goods'
      }
    ]
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
