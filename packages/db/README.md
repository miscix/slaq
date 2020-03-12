# Database

### Installation

```sh
npm install @bee/db
```

### Usage

```js
const Knex = require('knex')

const { config, methods } = require('@bee/db')

const env = process.env.NODE_ENV || 'development'
const knex = Knex(config[env])

const createUser = methods.createUser(knex)

const userData = {
  name: 'Exo',
  email: 'exo@gmail.com',
  password: 'xxx'
}

createUser(userData)
  .then(console.log) // { ...userData }
```

### API

Check [docs/methods.md](docs/methods.md).

### License

MIT
