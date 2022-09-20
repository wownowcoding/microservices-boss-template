const path = require('path');
const apolloCfg = require('./config.apollo');
const rootJoin = path.join.bind(process.cwd());
const ipAddress = require('ip').address();
const preFix = require('../prefix');
const execSyncBase = require('child_process').execSync;
const os = require('os');
const v8 = require('v8');
const heapStatisticsEnum = {
  total_heap_size: '总堆大小',
  total_heap_size_executable: '总堆大小可执行文件',
  total_physical_size: '总物理大小',
  total_available_size: '总可用大小',
  used_heap_size: '使用的堆大小',
  heap_size_limit: '堆大小限制',
  malloced_memory: '已分配的内存',
  peak_malloced_memory: '分配的内存峰值',
  does_zap_garbage: '覆盖堆垃圾',
  number_of_native_contexts: '本机上下文数量',
  number_of_detached_contexts: '分离上下文数',
  code_and_metadata_size: '代码和元数据的大小',
  bytecode_and_metadata_size: '字节码和元数据大小',
  external_script_source_size: '外部脚本源大小',
  space_size: '空间大小',
  space_used_size: '空间使用大小',
  space_available_size: '可用空间大小',
  physical_space_size: '物理空间大小'
};

//  换算数据大小
const getRamSize = (data) => {
  if (data > 1073741824) {
    return `${(((((data / 1024).toFixed(3) - 0) / 1024).toFixed(3) - 0) / 1024).toFixed(3) - 0}GB`;
  }
  if (data > 1048576) {
    return `${(((data / 1024).toFixed(3) - 0) / 1024).toFixed(3) - 0}MB`;
  }
  if (data > 1024) {
    return `${(data / 1024).toFixed(3) - 0}KB`;
  }
  return `${data}`;
}

const getHeapStatistics = () => {
  const heapStatistics = Object.assign({}, {
    ...v8.getHeapStatistics(),
    ...v8.getHeapCodeStatistics()
  });
  const heapSpaceStatistics = v8.getHeapSpaceStatistics();
  const __strList = Object.keys(heapStatistics).map(e => `[${e}-${heapStatisticsEnum[e]}]: ${getRamSize(heapStatistics[e] - 0)}`).concat(heapSpaceStatistics.map(e => {
    let __str = `空间名[${e.space_name}]: `;
    __str += Object.keys(e).filter(q => q !== 'space_name').map(q => `(${q}-${heapStatisticsEnum[q]}[${getRamSize(e[q] - 0)}])`);
    return __str;
  }));
  return __strList;
}

//  初始化 apollo 配置
require('egg-apollos').apollo.setEnv()

const paths = {
	runDir: rootJoin('private', 'run'),
	logDir: rootJoin('private', 'log')
};
/* eslint valid-jsdoc: "off" */
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	const mongoStr = process.env['common.lifekh.nodejs.mongodb'] || '%7B%22url%22%3A%22mongodb%3A%2F%2Fcomposition_service%3Acomposition_service_2020%40172.16.27.10%3A27017%2Fcomposition_service%3FuseUnifiedTopology%3Dtrue%22%2C%22options%22%3A%7B%22useNewUrlParser%22%3Atrue%7D%2C%22dbNameEnum%22%3A%7B%22appDB%22%3A%22composition_service%22%7D%2C%22dbNames%22%3A%5B%22composition_service%22%5D%7D';
	const mongoConfig = JSON.parse(decodeURIComponent(mongoStr));
	mongoConfig.dbNameEnum = mongoConfig.dbNameEnum.appDB || dbNameEnum.dbNameEnum;
	//  初始化获取 apollo 方法
	const apolloService = require('../app/service/util-service/apollo')(appInfo, true)
	let logPath =
		process &&
		process.env &&
		process.env.__argv && JSON.parse(process.env.__argv) || paths.logDir;
	logPath = typeof logPath === 'object' && logPath.stdout.replace('/master-stdout.log', '') || logPath;
	const cors = {};
	//	common.lifekh.boss.domain
	//	boss-sit.lifekh.com
	if (process && process.env && process && process.env['common.lifekh.boss.domain'] && process.env['common.lifekh.boss.domain'].indexOf('-sit') !== -1) {
		cors.origin = '*';
		cors.allowMethods = 'GET,HEAD,PUT,POST,DELETE,PATCH';
	}
	//  从启动命令上获取 dubbo 的配置
	const appConfig = {
		appInfo,
		cpus: os.cpus(),
		nodeVersions: execSyncBase('node -v'),
		getHeapStatistics: getHeapStatistics,
		apolloCfg,
		cors,
		notfound: {
			pageUrl: '/boss/login'
		},
		keys: `${appInfo.name}_1586331786725_7164`,
    view: {
      root: path.join(appInfo.baseDir, 'app/view'),
      defaultViewEngine: 'nunjucks',
      cache: true,
      mapping: {
        '.tpl': 'nunjucks'
      }
		},
		mongoConfig,
		//	给个数组用来记录当前请求，防止重启
		currentMiddleware: {
			restartStatus: false,
			list: {}
		},
    static: {
      prefix: `/${preFix.prefix}/public/`,
      dynamic: true,
      maxAge: 31536000,
      buffer: true
    },
		security: {
			// 关闭 csrf 防范，** NOTICE ** 有一定安全风险
			csrf: {
				queryName: 'csrf_token',
				enable: false
			}
		},
		//  [日志打印时间] [日志级别] [线程ID}] [链路ID] [日志打印代码位置] [uri或接口#方法] LINECONTENT:原始交易报文, [用户信息] [应用名称] [服务器IP] 异常堆栈信息
		logger: {
			dir: logPath, // 日志存储目录
			rotateLogDirs: [logPath], // 自动按日切割目录
			//  不打印线程及应用的日志，因为不符合运维的要求
			disableConsoleAfterReady: true,
			formatter(meta) {
				const date = `${((date = new Date()) => new Date(date - date.getTimezoneOffset() * 6e4).toJSON().substr(0, 23).replace('T', ' ').replace(/\./g, ','))(new Date())}`;
				const __port = process && process.env && process.env.EGG_PORT && `:${process.env.EGG_PORT}` || '';
				const message = meta && meta.message || '';
				if (message.indexOf('nodejs.EPIPEError: write EPIPE') !== -1) {
					return false;
				}
				return `[${date}][${meta.level}][${meta.pid}][][${appConfig.logger.dir}][][] LINECONTENT: ${message}[][mobile-boss-ssr][${ipAddress}${__port}]
				${meta.level === 'ERROR' && message || ''}`;
			},
			// ctx logger
			contextFormatter(meta) {
				const date = `${((date = new Date()) => new Date(date - date.getTimezoneOffset() * 6e4).toJSON().substr(0, 23).replace('T', ' ').replace(/\./g, ','))(new Date())}`;
				const __port = process && process.env && process.env.EGG_PORT && `:${process.env.EGG_PORT}` || '';
				const message = meta && meta.message || '';
				if (message.indexOf('nodejs.EPIPEError: write EPIPE') !== -1) {
					return false;
				}
				return `[${date}][${meta.level}][${meta.pid}][${meta.ctx.request.header.msgid || ''}][${appConfig.logger.dir}][${meta.ctx.url}#${meta.ctx.method}] LINECONTENT:${message}[][mobile-boss-ssr][${ipAddress}${__port}]
        ${meta.level === 'ERROR' && message || ''}`;
			}
		},
		//  取消自动清空日志
		logrotator: {
			maxDays: 7,
			//  单个日志文件最大限制到 2G
			maxFileSize: 2097152
		},
		apolloConfig: {
			schedule: {
				interval: 60000
			}
		},
		multipart: {
			whitelist: () => true,
			fileSize: '1000mb',
			fieldNameSize: 10000,
			fieldSize: '10mb'
		},
		compositionApi: 'http://svc-lifekh-mp-nodejs-mobile-app-composition-sit:8080',
		// 业务封装的 fetch 方法配置
		fetch: {
			// 请求超时时间，默认 10s
			timeout: 10000
		},
		bodyParser: {
			// 设置 post 时 formData 大小限制，egg 默认只有 100kb
			formLimit: '10mb'
		},
		//  30 分钟
		session: {
			maxAge: 1800000
		},
		routeConfig: {
			prefix: preFix.prefix,
			version: 'v1'
		},
		compress: {
			threshold: 800,
			br: false
		},
		middleware: ['haveMsgid', 'csrf', 'logger'],
		io: {
			init: {
				pingInterval: 5000,
				pingTimeout: 10000,
				path: `${preFix.prefix && '/' + preFix.prefix || ''}/socket.io`,
			},
			namespace: {
				[`/${preFix.prefix}/`]: {
					connectionMiddleware: ['auth'],
					packetMiddleware: []
				},
				[`/${preFix.prefix}/send`]: {
					connectionMiddleware: ['auth'],
					packetMiddleware: []
				}
			}
		}
	};
	try {
		//  apollo 配置覆盖
		apolloService.setStringKeysObject(appConfig, apolloService.filterKeyPrefix(process && process.env || {}));
	} catch (err) { }
	return Object.assign({}, appConfig);
}