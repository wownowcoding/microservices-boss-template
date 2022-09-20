const { resolve } = require('path')
// 配置需要到导出的东西

// 导出必须要以 ./ 开始
module.exports = {
  "./mount": "./module-federation/mount.js"
}