/**
 * 定时器删除不必要的日志
 */
 module.exports = app => {
  const schedule = {
    //  1 秒间隔
    // 每三小时准点执行一次
    cron: '0 0 */3 * * *',
    //  随机的子进程 worker 执行
    type: 'worker',
    immediate: true
  };
  return {
    schedule,
    task: async ctx => {
      try {
        app.messenger.sendToAgent('clear-logs')
      } catch(err) {}
    }
  };
};