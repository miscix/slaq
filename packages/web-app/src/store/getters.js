import { decodeToken } from './helpers'

//

export function hasToken (state) {
  return !!state.token
}

export function tokenPayload (state) {
  return decodeToken(state.token)
}

export function currentUser (state, getters) {
  const { users } = state
  const { id } = getters.tokenPayload

  return users[id]
}
