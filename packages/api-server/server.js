const app = require('.')

const { NODE_PORT } = require('./src/config')

// settings

app.listen(NODE_PORT, () => console.log(`App listenting on port ${NODE_PORT}`))
