const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container;
const exposesConfig = require('./exposes.config.js');
const target = 'https://boss-sit.lifekh.com';

module.exports = defineConfig({
  publicPath: 'http://localhost:8081/',
  configureWebpack: {
    devtool: 'eval-cheap-module-source-map',
    optimization: {
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: require("./package.json").remoteName,
        filename: 'remoteEntry.js',
        exposes: exposesConfig,
      }),
    ],
  },
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target,
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        },
        headers: {
          Referer: target
        }
      },
      '/boss/boss-api': {
        target,
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/boss/boss-api': '/boss/boss-api'
        },
        headers: {
          Referer: target
        }
      }
    }
  },
  lintOnSave: false //关闭eslint检查
})