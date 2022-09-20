const __application = {
	...require('./application-extend/index'),
	//	用来绑定集合的对象
	mongodb: {},
	/**
	 * 对 this.app.curl 的业务外层封装，原因
	 * 1. 希望通过业务自己配置 timeout 来设置curl的超时时间，egg本身不支持配置 curl
	 * 2. curl 后的返回值统一返回 data 字段，其它地方使用不用再解一层，之前很容易出错和难理解
	 */
	async fetch(url, options) {
		// 从 config 获取可配置项作为默认options
		const {
			timeout
		} = this.config.fetch;
		const defaultOptions = {
			timeout,
			method: 'GET'
		};
		// 合并默认options和自定义options
		const mergeOptions = Object.assign({}, defaultOptions, options);

		// 直接返回this.curl返回的data字段
		return (await this.curl(url, mergeOptions)).data;
	},
	/**
	 * 路由路径处理
	 * 拼接 nginx 前缀和 api 版本号
	 */
	routeSplicing(url = '') {
		const {
			prefix
		} = this.config.routeConfig;
		return `${ prefix ? `/${prefix}` : ''}${url}`
	},
	routePrefix(url = '') {
		const {
			prefix
		} = this.config.routeConfig;
		return `${ prefix ? `${prefix}` : ''}${url}`
	},
}
module.exports = __application;