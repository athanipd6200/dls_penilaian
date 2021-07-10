import { createStore } from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'
// axios.defaults.baseURL = process.env.MIX_APP_URL+'/api'

export default new createStore({
  state: {
    user: null,
    url_base: 'http://localhost:8080',
    token: localStorage.getItem('token') || '',
  },

  mutations: {
    setUserData (state, userData) {
      console.log(userData)
      localStorage.setItem('token', userData.token)
      state.token = userData.token
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
    },

    updateToken(state, value) {
      state.token = value
    },

    clearUserData () {
      localStorage.removeItem('token')
      location.reload()
    }
  },

  actions: {
    login ({ commit }, credentials) {
      return axios
        .post('/api/login', credentials)
        .then(({ data }) => {
          console.log("Data dari web login : "+data)
          commit('token', data)
        })
    },

    updateToken(context, value) { context.commit('updateToken', value) },

    // logout ({ commit }, credentials) {
    //   if(localStorage.getItem('token') && localStorage.getItem('token') != ''){
    //     console.log('proses logout');
    //     return axios
    //     .post('/api/logout').then(response => {
    //         commit('clearUserData')
    //     }).catch( errors => {
    //         console.log("Error aplikasi : " + errors.response.data);
    //     })
    //   }else{
    //     console.log("Error logout");
    //   }
    // }
  },

  getters : {
    isLogged: state => state.token,
    url_base: state => state.url_base,
    user_data: state => state.user,
    token : state => state.token,
  }
})