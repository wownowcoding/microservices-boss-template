const glob = require('glob')
const path = require('path')

/**
 * @param {Egg.Application} app - egg application
 * 将路由的控制分布下每个组
 */
module.exports = app => {
  //  web socket 路由
  glob.sync(path.resolve(__dirname, `io/router/**/*.js`)).forEach(__file => {
    const job = require(__file);
    job && typeof job === 'function' && job(app.io, app);
  });
  //  http 路由
  glob.sync(path.resolve(__dirname, `router/**/*.js`)).forEach(__file => {
    const job = require(__file);
    job && typeof job === 'function' && job(app);
  });
};
