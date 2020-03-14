# Database Settings

### Installation

```sh
npm install @bee/db-settings
```

### Usage

```js
const Knex = require('knex')

const { config } = require('@bee/db')

const env = process.env.NODE_ENV || 'development'
const knex = Knex(config[env])

// ...
```
