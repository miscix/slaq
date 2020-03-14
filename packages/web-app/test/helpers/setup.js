require('browser-env')()
const webpackConfig = require.resolve('@vue/cli-service/webpack.config.js')
const hooks = require('require-extension-hooks')
const Vue = require('vue')

// Fix TypeError from prettier
window.Date = Date

// Setup Vue.js to remove production tip
Vue.config.productionTip = false

// Setup vue files to be processed by `require-extension-hooks-vue`
hooks('vue').plugin('vue').push()

// Setup vue and js files to be processed by `require-extension-hooks-babel`
hooks(['vue', 'js']).exclude(({ filename }) => {
  return filename.match(/\/node_modules\//) ||
    filename.includes(webpackConfig) ||
    filename.includes('vue.config.js') ||
    filename.match(/helpers\/setup\.js/)
}).plugin('babel').push()

// Setup mocking of static assets
hooks([
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.woff',
  '.ico',
  '.ico',
  '.svg'
]).push(() => '')
