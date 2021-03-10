import axios from 'axios'

const history = {
  namespaced: true,
  state: () => {
    return {
      dataHistory: '',
      page: '',
      detailHistory: '',
      webURL: process.env.VUE_APP_URL
    }
  },
  mutations: {
    setHistory (state, payload) {
      state.dataHistory = payload
    },
    setPage (state, payload) {
      state.page = payload
    },
    setDetail (state, payload) {
      state.detailHistory = payload
    }
  },
  actions: {
    input (context, data) {
    // const getData = ''
      axios.post(`${context.state.webURL}/history`, data, { headers: { token: context.rootState.auth.token } }).then((response) => {
      }).catch((err) => {
        console.log(err)
      })
    },
    getHistory (context, data) {
      axios.get(`${context.state.webURL}/history?page=${data}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        console.log(response.data)
        context.commit('setHistory', response.data.data)
        context.commit('setPage', response.data.pagination)
      })
    },
    getDetailHistory (context, inv) {
      console.log(inv)
      axios.get(`${context.state.webURL}/history/${inv}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('setDetail', response.data.data)
      })
    }

  },
  getters: {
    getHistory (state) {
      return state.dataHistory
    },
    getPage (state) {
      return state.page
    },
    getDetail (state) {
      return state.detailHistory
    }
  }
}

export default history
