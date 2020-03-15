import { decodeToken } from './helpers'

//

export function hasToken (state) {
  return !!state.token
}

export function tokenPayload (state) {
  return decodeToken(state.token)
}

export function currentUserId (state, getters) {
  const { id } = getters.tokenPayload || {}
  return id
}

export function userById (state) {
  return id => state.users[id]
}
