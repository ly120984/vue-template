const build = require('face-code3.0/core/build');
const { name: APP_NAME, devPort } = require('./package.json');
console.log(APP_NAME)
const PROXY = require('./config/proxy.js');
module.exports = {
  publicPath: build.publicPath(APP_NAME),
  css: {
    extract: false
  },
  pages: {
    index: {
      // page 的入口
      entry: './src/main.js'
    }
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    build.buildConfig(config, APP_NAME)
  },
  devServer: {
    port: devPort,
    proxy: PROXY
  },
  configureWebpack: (config) => {
  }
};