import Vue from 'vue'
import Vuex from 'vuex'

import * as api from './api'

Vue.use(Vuex)

const mutations = {
  SET_GREETING (state, greeting) {
    state.greeting = greeting
  }
}

const actions = {
  fetchGreeting (ctx) {
    const commit = greeting => ctx.commit('SET_GREETING', greeting)

    return api
      .fetchGreeting()
      .then(commit)
  },
  loginUser (ctx, formData) {
    console.log(formData)
  },
  signupUser (ctx, formData) {
    console.log(formData)
  }
}

export default new Vuex.Store({
  state: {
    greeting: void 0
  },
  mutations,
  actions,
  modules: {}
})
