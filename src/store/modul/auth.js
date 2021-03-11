import axios from 'axios'

const modulAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      cashier: localStorage.getItem('setCashier') || null,
      webURL: process.env.VUE_APP_URL
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setCashier (state, payload) {
      state.cashier = payload
    }
  },
  actions: {
    login (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.state.webURL}/login`, data).then((response) => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('setCashier', response.data.name)
          context.commit('setToken', response.data.token)
          context.commit('setCashier', response.data.name)
          resolve(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    logout (form) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        localStorage.removeItem('setCashier')
        form.commit('setToken', null)
        resolve(true)
      })
    }
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getCashier (state) {
      return state.cashier
    }
  }
}

export default modulAuth
