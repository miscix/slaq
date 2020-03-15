import ky from 'ky'

// helpers

const includeAuth = request => {
  const token = window.localStorage.getItem('token')
  request.headers.set('Authorization', `Bearer ${token}`)
}

// clients

export const api = ky.extend({
  prefixUrl: '/api',
  hooks: {
    beforeRequest: [
      includeAuth
    ]
  }
})

// TODO: CDN client
