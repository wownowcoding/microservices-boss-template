'use strict'
const { merge } = require('webpack-merge')
const isDev = process.env.NODE_ENV === 'development';

const defaultConfig = require('./config/vue.config.default');

let entConfig = require('./config/vue.config.pro');
if (isDev) {
  entConfig = require('./config/vue.config.dev');
}
console.log(typeof entConfig === "function" ? entConfig(defaultConfig) : merge(defaultConfig, entConfig), "merge config")


module.exports = typeof entConfig === "function" ? entConfig(defaultConfig) : merge(defaultConfig, entConfig);
