module.exports = app => {
  //  app 主线程接受到某个子线程消息
  //  随机某个子线程定时器获取到 apollo 的数据，同步给所有线程 all agent
  app.messenger.on('apollo-schedule', data => {
    const ctx = app.createAnonymousContext();
    try {
      ctx.service.utilService.apollo.setStringKeysObject(ctx.app.config, data);
    } catch (err) {
      ctx.logger.error('app err: ', err)
    }
  })
}