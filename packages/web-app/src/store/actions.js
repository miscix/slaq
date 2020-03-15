import { api } from './clients'

import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

import {
  saveLocalToken,
  dropLocalToken,
  reloadPage
} from './helpers'

//

export async function signup (ctx, signupForm) {
  return api
    .post('users', { json: signupForm })
}

export async function login (ctx, loginForm) {
  const setToken = token =>
    ctx.commit('SET_TOKEN', token)

  const handleToken = R.compose(
    R.tap(saveLocalToken),
    R.tap(setToken),
    R.prop('token')
  )

  return api
    .post('tokens', { json: loginForm })
    .json()
    .then(handleToken)
}

export async function logout (ctx) {
  dropLocalToken()
  reloadPage()
}

export async function fetchUserById (ctx, id) {
  const storeUser = user =>
    ctx.commit('PUT_USER', user)

  return api
    .get(`users/${id}`)
    .json()
    .then(R.tap(storeUser))
}
