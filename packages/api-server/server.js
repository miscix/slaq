const createApp = require('.')

const PORT = process.env.NODE_PORT || 3000

const app = createApp()

app.listen(PORT, () => console.log(`App listenting on port ${PORT}`))
