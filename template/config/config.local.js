const path = require('path');
const rootJoin = path.join.bind(process.cwd());
const ipAddress = require('ip').address();
const preFix = require('../prefix');
const paths = {
	runDir: rootJoin('private', 'run'),
	logDir: rootJoin('private', 'log')
};
module.exports = app => {
	require('../scripts/build/init')();
  return {
		//  [日志打印时间] [日志级别] [线程ID}] [链路ID] [日志打印代码位置] [uri或接口#方法] LINECONTENT:原始交易报文, [用户信息] [应用名称] [服务器IP] 异常堆栈信息
		logger: {
			dir: paths.logDir, // 日志存储目录
			rotateLogDirs: [paths.logDir], // 自动按日切割目录
			formatter(meta) {
				const __port = process && process.env && process.env.EGG_PORT && `:${process.env.EGG_PORT}` || '';
				const message = meta && meta.message || '';
				return `[${meta.date}][${meta.level}][${meta.pid}][][${paths.logDir}][][] LINECONTENT: ${message}[][mobile-boss-ssr][${ipAddress}${__port}]
				${meta.level === 'ERROR' && message || ''}`;
			},
			// ctx logger
			contextFormatter(meta) {
				const __port = process && process.env && process.env.EGG_PORT && `:${process.env.EGG_PORT}` || '';
				const message = meta && meta.message || '';
				return `[${meta.date}][${meta.level}][${meta.pid}][${meta.ctx.request.header.msgid || ''}][${paths.logDir}][${meta.ctx.url}#${meta.ctx.method}] LINECONTENT:${message}[][mobile-boss-ssr][${ipAddress}${__port}]
        ${meta.level === 'ERROR' && message || ''}`;
			}
		},
    compositionApi: 'http://127.0.0.1:8880',
    static: {
      prefix: `/${preFix.prefix}/public/`,
      dynamic: true,
      maxAge: 31536000,
      buffer: false
    }
  };
}