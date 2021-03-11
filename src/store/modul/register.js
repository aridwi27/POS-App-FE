import axios from 'axios'

const register = {
  namespaced: true,
  state: () => {
    return {
      webURL: process.env.VUE_APP_URL
    }
  },
  mutations: {

  },
  actions: {
    register (context, dataBaru) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.state.webURL}/register`, dataBaru).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  },
  getters: {
  }
}

export default register
