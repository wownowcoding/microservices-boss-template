/*
 * @Description: 处理node无法解析import语法
 * @Author: 管铭钊
 * @Date: 2019/11/2
 */
require('babel-register')({
    presets: ['env']
})
module.exports = require('./node-export')
