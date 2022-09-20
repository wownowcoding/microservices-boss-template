const glob = require('glob')
const path = require('path')
const fs = require('fs');

/**
 * 子进程接受事件
 * 分布在 application 文件夹
 * app.messenger.broadcast(action, data)：发送给所有的 agent / app 进程（包括自己）
 * app.messenger.sendToApp(action, data): 发送给所有的 app 进程在 app 上调用该方法会发送给自己和其他的 app 进程在 agent 上调用该方法会发送给所有的 app 进程
 * app.messenger.sendToAgent(action, data): 发送给 agent 进程在 app 上调用该方法会发送给 agent 进程在 agent 上调用该方法会发送给 agent 自己
 * agent.messenger.sendRandom(action, data): app 上没有该方法（现在 Egg 的实现是等同于 sentToAgent）agent 会随机发送消息给一个 app 进程（由 master 来控制发送给谁）
 * app.messenger.sendTo(pid, action, data): 发送给指定进程
 */
module.exports = agent => {
  // 在这里写你的初始化逻辑

  // 也可以通过 messenger 对象发送消息给 App Worker
  // 但需要等待 App Worker 启动成功后才能发送，不然很可能丢失
  agent.messenger.on('egg-ready', () => {
    const agentFiles = glob.sync(path.resolve(__dirname, `./application/**-agent.js`));
    for (const __file of agentFiles) {
      if (fs.existsSync(__file)) {
        require(__file)(agent);
      }
    }
  });
}