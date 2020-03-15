import ky from 'ky'

const client = ky.extend({
  prefixUrl: '/api',
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set('X-Requested-With', 'ky')
      }
    ]
  }
})

export async function createUser (signupFormData) {
  return client
    .post('users', { json: signupFormData })
    .json()
}

export async function acquireToken (loginFormData) {
  return client
    .post('tokens', { json: loginFormData })
    .json()
}

export async function fetchUserById (id) {
  return client
    .get(`users/${id}`)
    .json()
}
