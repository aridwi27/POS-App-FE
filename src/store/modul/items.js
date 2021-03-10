import axios from 'axios'

const items = {
  namespaced: true,
  state: () => {
    return {
      items: [],
      detailItems: {},
      page: {},
      isLoading: false,
      isError: false,
      errMessage: '',
      webURL: process.env.VUE_APP_URL
    }
  },
  mutations: {
    setItems (state, payload) {
      state.items = payload
    },
    setDetailItems (state, payload) {
      state.detailItems = payload
    },
    setPage (state, payload) {
      state.page = payload
    },
    setIsLoading (state, payload) {
      state.isLoading = payload
    },
    setIsError (state, payload) {
      state.isError = payload
    },
    setErrorMsg (state, payload) {
      state.errMessage = payload
    }
  },
  actions: {
    getItems (context, filter) {
      axios.get(`${context.state.webURL}/items?name=${filter.search}&page=${filter.setPage}&sort=${filter.sort}&order=${filter.order}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        if (response.data.data <= 0) {
          context.commit('setIsError', true)
          context.commit('setErrorMsg', 'Data Not Found')
        } else {
          context.commit('setIsError', false)
          context.commit('setItems', response.data.data)
          context.commit('setPage', response.data.pagination)
        }
      })
    },
    actionGetDetail (context, id) {
      console.log(context.state.webURL)
      axios.get(`${context.state.webURL}/items/${id}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        console.log(response)
        context.commit('setDetailItems', response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    addItems (context, dataBaru) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.state.webURL}/items`, dataBaru, { headers: { token: context.rootState.auth.token } }).then((response) => {
          console.log(response.data)
          resolve(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    deleteItems (context, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`${context.state.webURL}/items/${id}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    updateItems (context, data) {
      console.log(data.id)
      return new Promise((resolve, reject) => {
        axios.put(`${context.state.webURL}/items/${data.id}`, data.fileUpdate, { headers: { token: context.rootState.auth.token } }).then((response) => {
          console.log(response.data)
          resolve(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  },
  getters: {
    getAllItems (state) {
      return state.items
    },
    getDetailItems (state) {
      return state.detailItems
    },
    getPage (state) {
      return state.page
    },
    isError (state) {
      return state.isError
    },
    errorMsg (state) {
      return state.errMessage
    }
  }
}

export default items
