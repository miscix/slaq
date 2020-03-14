const NODE_PORT = process.env.NODE_PORT || 3000

const JWT_SECRET = process.env.JWT_SECRET || 'no-secret'

module.exports = {
  NODE_PORT,
  JWT_SECRET
}
