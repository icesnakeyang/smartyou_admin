import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gogo_smartyou_token: '' || localStorage.gogo_smartyou_token
  },
  actions: {
    saveToken(ctx, token) {
      ctx.commit('saveToken', token)
    }
  },
  mutations: {
    saveToken(state, token) {
      state.gogo_smartyou_token = token
      localStorage.gogo_smartyou_token = token
    }
  }
})
