import axios from 'axios'

const modulAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      cashier: localStorage.getItem('setCashier') || null
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
    login (form, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/login', data).then((response) => {
          console.log(response)
          // console.log(response.data.msg)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('setCashier', response.data.name)
          form.commit('setToken', response.data.token)
          form.commit('setCashier', response.data.name)
          resolve(response.data)
        }).catch((err) => {
          console.log(err)
          console.log(err.data.code)
        })
      })
    },
    logout (form) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
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
