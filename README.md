# vue-cli module federation 模版项目

exposes.config.js 用于配置需要导出的文件，修改后需要重启项目

mount.js 为挂载钩子，当你的项目要作为一个单独的模块提供别的模块进行挂载的时候这里是入口

挂载需要动态的设置国际化，路由 vue 等等