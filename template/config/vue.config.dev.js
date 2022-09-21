const path = require('path');
const utils = require('../src/utils/build');

require('../scripts/build/init')();



module.exports = {
  publicPath: `http://localhost:8001/`,
  lintOnSave: false,
  configureWebpack: {
    devtool: 'eval-cheap-module-source-map'
  },
  chainWebpack: config => {
    //  干掉 prefetch 预防懒加载文件重复加载两次
    config.plugins.delete("prefetch")
    config.plugins.delete("preload")
  },
  pages: {
    index: {
      template: 'local-index.ejs',
      filename: 'index.html',
    }
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    port: 8000,
    open: true,
  },
}