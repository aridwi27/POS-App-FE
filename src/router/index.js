import Vue from 'vue'
import VueRouter from 'vue-router'
import detail from '../views/detail.vue'
import login from '../views/login.vue'
import items from '../views/items.vue'
import register from '../views/register.vue'
import detailitems from '../views/detailItems.vue'
import history from '../views/history.vue'
import historydetail from '../views/detailHistory.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/detail/:id',
    name: 'Detail',
    component: detail,
    meta: { auth: true }
  },
  {
    path: '/',
    name: 'Login',
    component: login,
    meta: { auth: false }
  },
  {
    path: '/items',
    name: 'Items',
    component: items,
    meta: { auth: true }
  },
  {
    path: '/history',
    name: 'history',
    component: history,
    meta: { auth: true }
  },
  {
    path: '/historydetail/:inv',
    name: 'historydetail',
    component: historydetail,
    meta: { auth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/detailitems/:id',
    name: 'detailitems',
    component: detailitems
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta.auth === true) {
    if (store.getters['auth/getToken']) {
      next()
    } else {
      alert('you dont have access')
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
  // console.log(to.matched[0].meta.auth)
})

export default router
