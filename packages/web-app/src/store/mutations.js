import * as R from 'ramda'

//

export function SET_TOKEN (state, token) {
  state.token = token
}

export function PUT_USER (state, user) {
  state.users = R.assoc(user.id, user, state.users)
}
