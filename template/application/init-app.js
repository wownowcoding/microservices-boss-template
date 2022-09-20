const uuid = require('node-uuid');
module.exports = (app, { port }) => {
  global.app = app;
  /**
   * 捕获应用端口
   */
  process.env.EGG_PORT = port || app && app.config && app.config.cluster && app.config.cluster.listen && app.config.cluster.listen.port || 0;
  app.config.startID = uuid.v1().replace(/-/g, '') + `[${((date = new Date()) => new Date(date - date.getTimezoneOffset() * 6e4).toJSON().substr(0, 23).replace('T', ' '))(new Date())}]`;
}