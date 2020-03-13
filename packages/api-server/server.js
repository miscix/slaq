const app = require('.')

const PORT = process.env.NODE_PORT || 3000

app.listen(PORT, () => console.log(`App listenting on port ${PORT}`))
