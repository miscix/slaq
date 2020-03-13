const jwt = require('express-jwt')

const checkAuth = ({ secret }) => {
  const ignore = [
    { url: '/tokens', methods: ['POST'] },
    { url: '/users', methods: ['POST'] }
  ]

  return jwt({ secret }).unless({ path: ignore })
}

module.exports = checkAuth
