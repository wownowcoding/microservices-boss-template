const path = require('path');
const apollo = require('egg-apollos/lib/apollo');
/**
 * 定时器获取 apollo 数据
 */
module.exports = app => {
  const schedule = {
    //  1 秒间隔
    interval: app.config.apolloConfig.schedule.interval,
    //  随机的子进程 worker 执行
    type: 'worker',
    //  开发环境不启用这个定时器
    disable: app.env === 'local'
  };
  return {
    schedule,
    async task(ctx) {
      try {
        //  获取 apollo 数据
        const result = await new Promise((resolve, reject) => {
          const apolloConfig = require(path.join(__dirname, '../../config/config.apollo.js'));
          // 读取携程 apollo 配置中心，并创建 default.env 文件
          apollo.remoteConfigServiceFromCache(apolloConfig).then(bundle => {
            try {
              Object.assign(bundle, apolloConfig);
              apollo.createEnvFile(bundle);
              apollo.setEnv();
              const apolloData = ctx.service.utilService.apollo.filterKeyPrefix(process.env);
              resolve(apolloData || undefined)
            } catch (apolloError) {
              reject(apolloError);
              return;
            }
          }).catch(err => {
            reject(err)
          }).done;
        });
        if (result) {
          ctx.app.messenger.sendToApp(
            'apollo-schedule',
            result
          );
        }
      } catch (err) {
        ctx.logger.info('apollo schedule error: ', err);
      }
    }
  };
};