const { users } = require('..')

const format = data => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    image_url: data.imageUrl
  }
}

module.exports = users.map(format)
