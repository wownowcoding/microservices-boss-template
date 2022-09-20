const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const __content = {
	/**
	 * 将 query、post body 参数合并成一个对象
	 */
	getQueryAndBodyParams() {
		return this.service.utilService
			.requestParams.getQueryAndBodyParams(this.request);
	},
	/**
	 * 获取所有 cookie 整合成 object 对象
	 * @return {[type]} [description]
	 */
	getAllCookies() {
		return this.service.utilService
			.requestParams.getAllCookies(this.request.header.cookie);
	},
	/**
	 *  获取 Post、Get、xml 参数
	 **/
	async getAllRequestParamsNotCookie() {
		return await this.service.utilService
			.requestParams.getAllRequestParamsNotCookie(this.request, this.req);
	},
	/**
	 * 获取所有参数
	 */
	async getAllParams() {
		return await this.service.utilService
			.requestParams.getAllRequestParams(this.request, this.req);
	},
	setBody(data) {
		if (this.request.header.msgid) {
			this.response.set('msgid', this.request.header.msgid);
		}
		this.body = data;
	},
	errorWrap(data) {
    data && this.logger.error('errorWrap:', data);
    // const err = data.error && data.error.chaos || data.error || this.errorMsg();
    this.setBody(this.errorMsg(data))
	},
	errorGlobalization: {
		'km-kh': 'ប្រព័ន្ធមានបញ្ហា!',
		'zh-cn': '哎呀！服务器开小差了~',
		'en-us': 'Oops! server did not respond.'
	},
	/**
	 * 通用异常信息
	 * @param {*} data
	 */
	errorMsg(msg) {
		let __msg = msg;
		if (!msg) {
			const language = (this.request.header['accept-language'] || this.request.header['language'] || 'en').split(',')[0].toLocaleLowerCase();
			const languageKey = language.indexOf('km') !== -1 && 'km-kh' || language.indexOf('zh') !== -1 && 'zh-cn' || 'en-us'
			try {
				__msg = this.errorGlobalization[languageKey];
			} catch(err) {
				__msg = this.errorGlobalization['en-us'];
			}
			__msg = __msg || this.errorGlobalization[languageKey];
		}
		
		return {
			rspCd: '99999',
			rspInf: __msg,
			data: null,
			rspType: '0',
			v: '1',
			responseTm: new Date().valueOf()
		}
	},
	bossListWrap(__resList = []) {
		const resList = __resList.map(__res => {
			if (this.request.header.responsetype) {
				this.logger.info('bossListWrap get res data!');
				return __res.data;
			}
			let res = {};
			if (__res.data) {
				if (typeof __res.data === 'object') {
					Object.keys(__res.data).forEach(e => {
						if (e !== 'responseTm') {
							res[e] = __res.data[e];
						}
					})
				}
			} else {
				res = __res.data;
			}
			return res;
		});
		this.status = 200;
		if (this.request.header.msgid) {
			this.response.set('msgid', this.request.header.msgid);
		}
		const resListStr = !this.request.header.responsetype && encodeURIComponent(JSON.stringify(resList)) || '';
		if (
			!this.request.header.responsetype &&
			this.request.method.toLocaleLowerCase() === 'get' &&
			!(this.app.config.web && this.app.config.web.cache304 && this.app.config.web.cache304.disable)) {
			try {
				const md5 = crypto.createHash('md5');
				md5.update(resListStr + this.service.utilService.jsCrypto.CryptoJSKeys);
				const md5Key = md5.digest('hex');
				this.response.set('ETag', md5Key);
				// 缓存是好的
				if (this.fresh) {
					this.status = 304;
					return;
				}
			} catch (err) {
				this.logger.error('successWrap: ', err);
			}
		}
		for (const res of __resList) {
			if (this.request.header.responsetype && this.request.header.sessionid) {
				/**
				 * access-control-allow-credentials: true
						access-control-allow-origin: http://localhost:8000
						connection: close
						content-disposition: attachment;filename=%E8%AE%A2%E5%8D%95%E6%8A%A5%E8%A1%A8+2021-01-12%7E2021-01-2120210120004803.xls
						content-type: application/vnd.ms-excel;charset=utf-8
						date: Tue, 19 Jan 2021 17:48:03 GMT
						server: nginx
						transfer-encoding: chunked
						vary: Origin
						x-application-context: takeaway-order-web:sit
						X-Powered-By: Express
				 */
				Object.keys(res.headers).forEach(e => {
					if (!([
						'x-application-context',
						'transfer-encoding',
						'connection',
						'access-control-allow-origin',
						'vary',
						'access-control-allow-credentials',
						'date'].filter(q => q.indexOf(e) !== -1).length)) {
						this.response.set(e, res.headers[e]);
					}
				});
				this.request.header.responseData = `file is ${res.headers['content-type']}`;
				this.body = res.data;
				return;
			}
		}
		this.request.header.responseData = resList;
		if (this.app.config.env !== 'sit') {
			this.body = this.service.utilService.jsCrypto.encrypt(resListStr)
			return;
		}
		this.body = resList;
	},
	bossWrap(__res = {}) {
		this.status = 200;
		let res = {};
		if (this.request.header.msgid) {
			this.response.set('msgid', this.request.header.msgid);
		}
		this.request.header.responseData = !this.request.header.responsetype && res || `file is ${__res.headers['content-type']}`;
		if (!this.request.header.responsetype) {
			Object.keys(__res.data).forEach(e => {
				if (e !== 'responseTm') {
					res[e] = __res.data[e];
				}
			})
			if (!(this.app.config.web && this.app.config.web.cache304 && this.app.config.web.cache304.disable)) {
				const resStr = encodeURIComponent(JSON.stringify(res));
				try {
					const md5 = crypto.createHash('md5');
					md5.update(resStr + this.service.utilService.jsCrypto.CryptoJSKeys);
					const md5Key = md5.digest('hex');
					this.response.set('ETag', md5Key);
	
					// 缓存是好的
					if (this.fresh) {
						this.status = 304;
						return;
					}
				} catch (err) {
					this.logger.error('successWrap: ', err);
				}
				if (this.app.config.env !== 'sit') {
					res = this.service.utilService.jsCrypto.encrypt(resStr)
				}
			}
		} else {
			res = __res.data;
			Object.keys(__res.headers).forEach(e => {
				if (!([
					'x-application-context',
					'transfer-encoding',
					'connection',
					'access-control-allow-origin',
					'vary',
					'access-control-allow-credentials',
					'date'].filter(q => q.indexOf(e) !== -1).length)) {
					this.response.set(e, __res.headers[e]);
				}
			});
		}
		this.body = res;
	},
	/**
	 * API 正确返回统一方法
	 * @params
	 * data: 返回数据
	 * metaData: 附加信息
	 */
	successRes(data = {}) {
		this.setBody(this.successWrap(data));
	},
	successWrap(data) {
		this.status = 200;
		try {
			const md5 = crypto.createHash('md5');
			md5.update(encodeURIComponent(JSON.stringify(data)));
			const md5Key = md5.digest('hex');
			this.response.set('ETag', md5Key);

			// 缓存是好的
			if (this.fresh) {
				this.status = 304;
				return;
			}
		} catch (err) {
			this.logger.error('successWrap: ', err);
		}
		this.body = {
			data: Array.isArray(data) && !data.length ? '' : data,
			rspCd: '00000',
			rspInf: 'success',
			rspType: '0',
			v: '1',
			responseTm: new Date().getTime()
		};
	},
  /**
   * 后端渲染  page entry tpl  方法
   * @param group   对应 app/components/{website,dashboard,activity} 等大的模块分组名
   * @param page    对应 app/components/{website,dashboard,activity}/page/{page}  下的页面入口名
   * @param locals  其它需要通过后端渲染注入到页面的变量
   *   例如 title: 影响浏览器的  title  展示
   */
  async renderPage(group = 'website', page, locals = {}) {
    const mergeLocals = Object.assign({}, {
      config: encodeURI(JSON.stringify(locals))
    }, {});
    // dist/${group}/entry.${page}.tpl  是在webpack构建时使用 html-webpack-plugin 按照 page entry自动生成的
    await this.commonRender(`/${group}/${page}.tpl`, mergeLocals);
  },
	async commonRender(pathName, params) {
		this.status = 200;
		if (this.request.header.msgid) {
			this.response.set('msgid', this.request.header.msgid);
		}
		try {
			const md5 = crypto.createHash('md5');
			md5.update(encodeURIComponent(JSON.stringify(Object.assign({}, params, {
				__responseFiles: fs.statSync(path.join(path.join(__dirname, '../view'), pathName))
			}))));
			const md5Key = md5.digest('hex');
			this.response.set('ETag', md5Key);

			// 缓存是好的
			if (this.fresh) {
				this.status = 304;
				return;
			}
		} catch (err) {
			this.logger.error('commonRender: ', err);
		}
		await this.render(pathName, params);
	}
}
module.exports = __content;
