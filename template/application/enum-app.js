module.exports = app => {
  //  app 主线程接受到某个子线程消息
  //  随机某个子线程定时器获取到 apollo 的数据，同步给所有线程 all agent
  app.messenger.on('set-marketzone-enum', data => {
    try {
      if (!app.config.marketzone) {
        app.config.marketzone = {};
      }
      const { language, enum: marketzoneEnum } = data;
      app.config.marketzone[language] = marketzoneEnum;
    } catch(error) {
      app.logger.error('app.messenger.on marketzone-enum error: ', error);
    }
  })
}