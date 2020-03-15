import Vue from 'vue'
import Vuex from 'vuex'

import jwt from 'jsonwebtoken'

import * as api from './api'

Vue.use(Vuex)

const getters = {
  hasToken (state) {
    return !!state.token
  },
  tokenPayload (state) {
    return jwt.decode(state.token)
  }
}

const mutations = {
  SET_GREETING (state, greeting) {
    state.greeting = greeting
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_CURRENT_USER (state, user) {
    state.currentUser = user
  }
}

const actions = {
  loginUser ({ commit }, formData) {
    const setToken = cred =>
      commit('SET_TOKEN', cred.token)

    return api
      .acquireToken(formData)
      .then(setToken)
  },
  signupUser (ctx, formData) {
    console.log(formData)
  },
  acquireCurrentUser ({ getters, commit }) {
    const { id } = getters.tokenPayload || {}

    if (!id) {
      const err = new Error('no user')
      return Promise.reject(err)
    }

    const setCurrentUser = data =>
      commit('SET_CURRENT_USER', data)

    return api
      .fetchUserById(id)
      .then(setCurrentUser)
  }
}

export default new Vuex.Store({
  state: {
    token: undefined,
    currentUser: undefined
  },
  getters,
  mutations,
  actions,
  modules: {}
})
