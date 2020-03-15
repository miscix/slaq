import ky from 'ky'

const { localStorage } = window

const client = ky.extend({
  prefixUrl: '/api',
  hooks: {
    beforeRequest: [
      request => {
        const token = localStorage.getItem('token')
        request.headers.set('Authorization', `Bearer ${token}`)
      }
    ]
  }
})

export async function createUser (signupFormData) {
  return client
    .post('users', { json: signupFormData })
    .then(() => Promise.resolve())
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
