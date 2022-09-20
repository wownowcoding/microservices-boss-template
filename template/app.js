const glob = require('glob')
const path = require('path')
const fs = require('fs');

/**
 * 主进程接受事件
 * 分布在 application 文件夹
 * app.messenger.broadcast(action, data)：发送给所有的 agent / app 进程（包括自己）
 * app.messenger.sendToApp(action, data): 发送给所有的 app 进程在 app 上调用该方法会发送给自己和其他的 app 进程在 agent 上调用该方法会发送给所有的 app 进程
 * app.messenger.sendToAgent(action, data): 发送给 agent 进程在 app 上调用该方法会发送给 agent 进程在 agent 上调用该方法会发送给 agent 自己
 * agent.messenger.sendRandom(action, data): app 上没有该方法（现在 Egg 的实现是等同于 sentToAgent）agent 会随机发送消息给一个 app 进程（由 master 来控制发送给谁）
 * app.messenger.sendTo(pid, action, data): 发送给指定进程
 */
module.exports = app => {
  // app && app.logger && typeof app.logger.info === 'function' && app.logger.info('start app!');
  fs.writeFile(path.resolve(__dirname, 'app-start-time.js'), `module.exports = {
    appStartTime: '${`[${((date = new Date()) => new Date(date - date.getTimezoneOffset() * 6e4).toJSON().substr(0, 19).replace('T', ' '))(new Date(new Date().valueOf() + 3600001))}]`}'
  }`, { 'flag': 'w' }, () => {});
  //  初始化前需要做的事，尽量别阻塞
  const beforeAppFiles = glob.sync(path.resolve(__dirname, './application/**-app-before.js'));
  for (const __file of beforeAppFiles) {
    if (fs.existsSync(__file)) {
      require(__file)(app);
    }
  }

  // 注意，只有在 egg-ready 事件拿到之后才能发送消息
  app.messenger.once('egg-ready', params => {
    const appFiles = glob.sync(path.resolve(__dirname, `./application/**-app.js`));
    for (const __file of appFiles) {
      if (fs.existsSync(__file)) {
        require(__file)(app, params);
      }
    }
  });
}