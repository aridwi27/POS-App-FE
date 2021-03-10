import Vue from 'vue'
import Vuex from 'vuex'
import modulAuth from './modul/auth'
import items from './modul/items'
import register from './modul/register'
import history from './modul/history'
Vue.use(Vuex)

const store = new Vuex.Store({
  state () {
    return {
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: modulAuth,
    items: items,
    register: register,
    history: history
  }
})

export default store
