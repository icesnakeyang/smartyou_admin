import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gogo_smartyou_token: '' || localStorage.gogo_smartyou_token,
    gogo_smartyou_username: '' || localStorage.gogo_smartyou_username,
    tourId:'' || localStorage.tourId
  },
  actions: {
    saveToken(ctx, token) {
      ctx.commit('saveToken', token)
    },
    saveUsername(ctx, username) {
      ctx.commit('saveUsername', username)
    },
    signOut(ctx) {
      ctx.commit('signOut')
    },
    saveTourId(ctx, tourId){
      ctx.commit('saveTourId', tourId)
    }
  },
  mutations: {
    saveToken(state, token) {
      state.gogo_smartyou_token = token
      localStorage.gogo_smartyou_token = token
    },
    saveUsername(state, username) {
      state.gogo_smartyou_username = username
      localStorage.gogo_smartyou_username = username
    },
    signOut(state) {
      state.gogo_smartyou_token = ''
      localStorage.gogo_smartyou_token = ''
      state.gogo_smartyou_username = ''
      localStorage.gogo_smartyou_username = ''
    },
    saveTourId(state, tourId){
      state.tourId=tourId
      localStorage.tourId=tourId
    }
  }
})
