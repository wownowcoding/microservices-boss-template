import axios from 'axios'
import Store from '@/utils/store'
import Qs from 'qs'
import { Message } from "iview";
import config from '@/config'
import JsCrypto from '@/utils/js-crypto';
import Cookies from 'js-cookie';
import md5 from 'md5';
import Vue from 'vue';
const jsCrypto = JsCrypto(1, true);
//	全局幂等性 post 访问接口防重复控制
if (!window.postMQ) {
	window.postMQ = {};
}
if (!window.getCrypto) {
	window.getCrypto = (key, value) => {
		if (key === window.halwefh) {
			let ret = jsCrypto.decrypt(value);
			window.halwefh = new Date().valueOf().toString() + parseInt(Math.random() * 100000000, 10).toString();
			try {
				console.log('crypto value: \n', JSON.stringify(JSON.parse(decodeURIComponent(ret)), null, 2));
			} catch (err) {
				console.log('crypto value: \n', decodeURIComponent(ret));
			}
		}
	}
}

let { baseURL } = config
// 创建axios实例
let basicApi = axios.create();
const getEggQuery = query => {
	const apiUrl = query.url.replace(/\/api\//, '/');
	const apiQuery = encodeURIComponent(JSON.stringify({
		apiUrl,
		apiData: JSON.parse(JSON.stringify(query.data))
	}));
	const httpQuery = Object.assign({}, {
		apiQuery
	});
	return httpQuery;
}
const getResult = res => {
	let isShowResult = false;
	if (localStorage.getItem('show-get-result')) {
		isShowResult = true;
	}
	if (window.location.href.indexOf('show-get-result') !== -1) {
		isShowResult = true;
		localStorage.setItem('show-get-result', isShowResult);
	}
	if (window.location.href.indexOf('show-get-result=0') !== -1) {
		isShowResult = false;
		localStorage.removeItem('show-get-result');
	}
	if (isShowResult) {
		console.log('\n\n===================== Response Start =====================');
		console.log(res);
		console.log('===================== Response End =====================');
	}
	return res;
}
let currentApiAxios = {};
let isOpenProxyApi = false
const base_api = function (...args) {
	const params = args[0];
	params.data = Object.fromEntries(Object.entries(params.data).filter(e => e[0] && e[1] !== undefined && e[1] !== null));
	let isGet = false;
	// let lastPath = params.url.split('/');
	// lastPath = lastPath[lastPath.length - 1];
	if ((`${encodeURIComponent(JSON.stringify(params.data))}${params.url}`).length < 500) {
		isGet = true;
	}
	let operatorInfoDef = { "operatorNo": "O1534786114338308096", "loginName": "ljb", "staffNo": "1234", "realName": "李家宝", "country": "01", "mobileNo": "8618934086807", "oprState": { "code": 11, "message": "可用" }, "roleNo": "R0000000000000000001", "roleName": "超级管理员", "lastLoginTime": 1662011883637, "loginCount": 89, "allBusinessLine": "true", "businessLine": ["BillPayment", "EXTERNAL_COOPERATION", "ExternalCooperation", "GameChannel", "GroupBuy", "HotelChannel", "Lotto", "OTA", "PhoneTopUp", "TinhNow", "YumNow", "wowgame"] };
	if (window?.vm) {
		const operatorInfo = window.vm.$store.state?.account?.operatorInfo || operatorInfoDef;
		if (!operatorInfo) {
			window?.vm?.$store.commit(`account/initOperatorInfo`);
		}
	} else {
		const __operatorInfo = Store.loadObject('operatorInfo');
		if (__operatorInfo) {
			try {
				let operatorInfo = Object.fromEntries(Object.entries(JSON.parse(decodeURIComponent(operatorInfo))).filter(e => !!e[1]));
			} catch (error) {
				console.debug(error)
			}
		}
	}
	Cookies.set('interview-time', new Date().toString());
	const headers = {
		'dark-flower': md5(Cookies.get('scenes') + jsCrypto.CryptoJSKeys),
		businessLine: (window?.vm?.$store?.state?.account?.operatorInfo?.businessLine ?? []).join(','),
		departmentNo: window?.vm?.$store?.state?.account?.operatorInfo?.departmentNo ?? '',
		allBusinessLine: window?.vm?.$store?.state?.account?.operatorInfo?.allBusinessLine ?? true,
		loginName: window?.vm?.$store?.state?.account?.operatorInfo?.loginName ?? undefined,
		mobileNo: window?.vm?.$store?.state?.account?.operatorInfo?.mobileNo ?? undefined,
		operatorNo: window?.vm?.$store?.state?.account?.operatorInfo?.operatorNo ?? undefined,
		roleNo: window?.vm?.$store?.state?.account?.operatorInfo?.roleNo ?? undefined,
		'Accept-Language': getLang()
	};
	// console.log('operatorInfo: ', window.vm.$store.state.account.operatorInfo)
	if (params.responseType) {
		headers.responseType = params.responseType;
		Object.keys(params.headers).forEach(e => {
			headers[e] = params.headers[e]
		});
	}
	if (isGet) {
		return new Promise((resolve, reject) => {
			let apiUrl = params.url.replace(/\/api\//, '/')
			currentApiAxios[apiUrl] = {
				query: {
					apiUrl,
					apiData: JSON.parse(JSON.stringify(params.data))
				},
				reject,
				resolve
			};
			const __currentApiAxios = currentApiAxios;
			currentApiAxios = {};
			axios.get(`${process.env.NODE_ENV === 'development' && '/api' || ''}/boss/boss-api/batch`, {
				params: {
					apiQueryList: encodeURIComponent(JSON.stringify(Object.keys(__currentApiAxios).map(e => __currentApiAxios[e].query)))
				}, headers, responseType: params.responseType || ''
			}).then(resList => {
				if (!isOpenProxyApi) {
					isOpenProxyApi = localStorage.getItem('jcTest') == 1
				}
				try {
					// 如果返回的是 exec 流，则直接返回
					resList.data = JSON.parse(decodeURIComponent(jsCrypto.decrypt(resList.data)));
				} catch (err) {
					if (!Array.isArray(resList.data)) {
						resolve(resList);
						return;
					}
				}
				if (resList.data.length === 1 && !!(resList.data[0].rspCd !== '00000' || resList.data[0].rspInf !== 'success')) {
					const ret = getResult(Object.assign({}, resList, {
						data: resList.data[0]
					}));
					Object.keys(__currentApiAxios).forEach(__key => __currentApiAxios[__key].resolve(ret));
				} else {
					for (let i = 0, len = resList.data.length; i < len; i++) {
						const _data = getResult(Object.assign({}, resList, {
							data: resList.data[i]
						}))
						if (isOpenProxyApi) {
							try {
								localStorage.setItem('jcTestData', JSON.stringify({
									api: resList.data[i].api,
									data: {
										query: JSON.parse(decodeURIComponent(_data.config.params.apiQueryList)),
										data: _data.data,
										time: Date.now()
									}
								}))
							} catch (error) {
								console.debug(error)
							}
						}
						__currentApiAxios[resList.data[i].api].resolve(_data);
					}
				}
			}).catch(resList => {
				try {
					resList.data = JSON.parse(decodeURIComponent(jsCrypto.decrypt(resList.data)))
				} catch (err) {
					if (!Array.isArray(resList.data)) {
						resolve(resList);
						return;
					}
				}
				Object.keys(__currentApiAxios).forEach(e => __currentApiAxios[e].reject(resList));
			});
		})
	} else {
		return new Promise((resolve, reject) => {
			const paramsStr = encodeURIComponent(JSON.stringify(params));
			if (!window.postMQ[paramsStr]) {
				window.postMQ[paramsStr] = {
					callback: [],
					status: 'pending'
				};
			}
			window.postMQ[paramsStr].callback.push({
				resolve, reject
			});
			if (window?.postMQ?.[paramsStr]?.status === 'pending') {
				const __timeout = setTimeout(() => {
					clearTimeout(__timeout);
					if (window?.postMQ?.[paramsStr]?.status === 'pending') {
						window.postMQ[paramsStr].status = 'start';
						axios.post(`${process.env.NODE_ENV === 'development' && '/api' || ''}/boss/boss-api`, getEggQuery(params), {
							headers,
							responseType: params.responseType || ''
						}).then(res => {
							if (!isOpenProxyApi) {
								isOpenProxyApi = localStorage.getItem('jcTest') == 1
							}
							try {
								res.data = JSON.parse(decodeURIComponent(jsCrypto.decrypt(res.data)))
							} catch (error) {
								console.debug(error)
							}
							const result = getResult(res);
							if (isOpenProxyApi) {
								try {
									localStorage.setItem('jcTestData', JSON.stringify({
										api: res.data.api,
										data: {
											query: params.data,
											data: res.data,
											time: Date.now()
										}
									}))
								} catch (error) {
									console.debug(error)
								}
							}
							window.postMQ[paramsStr].callback.forEach(e => {
								e.resolve(result);
							});
							window.postMQ[paramsStr].callback.length = 0;
							window.postMQ[paramsStr].callback = [];
							window.postMQ[paramsStr] = undefined;
						}).catch(res => {
							window.postMQ[paramsStr].callback.forEach(e => {
								e.reject(res);
							});
							window.postMQ[paramsStr].callback.length = 0;
							window.postMQ[paramsStr].callback = [];
							window.postMQ[paramsStr] = undefined;
						});
					}
				}, 500);
			}
		});
	}
}

// 获取语言
const getLang = () => {
	let lang = Store.loadObject('lang') || 'zh';
	let langMap = { //服务端header中需要转换后的标识
		'zh': 'zh-CN',
		'en': 'en-US',
		'cb': 'cb'
	}
	return langMap[lang];
}

// 网络异常处理
const errorManage = (error) => {
	// TODO 网络异常追加国际化处理,以及更详细的异常处理提示
	Message.error(window.vm.$t("tips.network_error"))
	return {
		rspCd: "30000", //与后端约定好的占位码,标识前端网络异常
		rspInf: window.vm.$t("tips.network_error"),
		data: {
			...error
		},
		rspType: ""
	}
}

// 设置缺省头部字段
basicApi.defaults = Object.assign(basicApi.defaults, {
	headers: {
		'Content-Type': 'application/json',
		'TermTyp': 'WEB',// go 3.0要求字段,用于描述客户端类型
		'appVersion': '1.0'
	},
	withCredentials: true,
	crossDomain: true,
	timeout: 10e4 //10秒超时
})
// 请求拦截器
basicApi.interceptors.request.use(
	config => {
		const operatorInfo = window?.vm?.$store?.state?.account?.operatorInfo ?? undefined;
		if (!operatorInfo) {
			window?.vm?.$store.commit(`account/initOperatorInfo`);
		}
		config.headers['departmentNo'] = window?.vm?.$store?.state?.account?.operatorInfo?.departmentNo ?? '';
		config.headers['businessLine'] = (window?.vm?.$store?.state?.account?.operatorInfo?.businessLine ?? []).join(',')
		config.headers['Accept-Language'] = getLang() //设置头字段
		return config;
	}, error => { //TODO 请求错误处理
		return Promise.reject(error)
	});
// 响应拦截器
basicApi.interceptors.response.use(res => res, error => Promise.reject(errorManage(error)));


/**
 * @description 处理后端响应的异常信息
 * @param {Object} resData 后端约定的响应对象
 */
const rspInfManage = (resData, msgid) => {
	const {
		rspCd,
		rspInf,
		data,
		rspType,
		config
	} = resData
	// session异常码
	const sessionInValidCodes = ['B0001', 'B1009']
	if (config) {
		if (Vue?.prototype?.ssr?.env === 'pro') {
			window.vm.$Modal.info({
				width: 400,
				title: window.vm.$i18n.locale === 'zh' && `服务繁忙，请稍后重试!` || 'The service is busy, please try again later!',
				render: (_h) => _h('div', [
					msgid && _h('a', {
						on: {
							click: () => import('@/utils/clipboard').then(({ copyString }) => copyString(msgid))
						}
					}, msgid)
				])
			});
			return;
		}
		const title = window.vm.$i18n.locale === 'zh' && `接口 “404” 无法访问` || 'Api "404" is not accessible.';
		const content = window.vm.$i18n.locale === 'zh' && `请检查 “nginx”、后端应用是否启动、路径是否正确、后端代码是否发布。` || 'Please check "nginx", whether the back-end application is started, whether the path is correct, and whether the back-end code is released.';
		window.vm.$Modal.error({
			width: 800,
			title,
			content: window.vm.$t(`<p style="font-size: 12px;color: #fff;padding: 10px;background-color: #999;border-radius: 4px;">${config.url}</p><br/> ${content}`)
		});
	} else if (`${rspType}` === '1') { // 占位符rspType == 1处理
		try {
			//先去rspInf中获取占位标识key,再到data中获取值,最后替换回rspInf中
			let key = rspInf.replace(/^[^{]*{([^}]+)}[^}]+$/, '$1')
			let infoLabel = data[key]
			let msg = rspInf.replace(/{[^}]+}/i, infoLabel)
			Message.error(msg);
		} catch (error) {
			if (rspInf) {
				Message.error(rspInf);
			}
		}
	} else if (`${rspCd}` === '10000') { // 状态码10000标识多个异常处理
		data.forEach(item => Message.error(item.rspInf))
	} else if (/^[A-Za-z]\d{4}$/.test(`${rspCd}`)) { // 业务自定义异常码处理 /^[A-Za-z]\d{4}$/i 例:T1000,B1000
		Message.error(rspInf)
		// session 异常场景下,自动控制缓存标识并让路由刷新,路由会根据缓存标识isSessionValid判断是否跳回登录页
		// 因为boss后端是通过login.do的请求来写入sessionId服务端缓存的,所以必须回到登录页走正常的登录流程
		if (sessionInValidCodes.indexOf(rspCd) > -1) {
			// TODO 处理多个未登录响应并发逻辑
			// 目前暂时解决方案是session后刷新,路由在监听到session标识失效会自动跳回登录页
			Store.saveObject('isSessionValid', false);
			// window.history.go(0)
			window.location.href = `${window.location.origin}/boss/login?loginCallback=${encodeURIComponent(window.location.href)}`;
			// router.replace('/login')
		}
	} else if (`${rspCd}` !== '00000' && `${rspCd}` !== 'success') { // 响应逻辑异常
		Message.error(rspInf)
	}
}
const post_funcCallback = (res, isBlockException) => {
	// 处理错误信息
	// 状态码200下,存在rspCd的响应才去处理异常信息
	// TODO 前后端约定可枚举的content-type来分情况处理
	if (!isBlockException && res.data) {
		rspInfManage(res.data, res?.headers?.msgid);
	}
}
/**
 * @description 调用后端api的主入口
 * @param {Object} params 请求的参数
 * @param {String} url 请求的url
 * @param {Object} config 对于请求器的配置<br/>
 *  isBlockException false 是否拦截后端异常
 */
const post_func = (params = {}, url, config = {
	isBlockException: false
}) => {
	const { NODE_ENV } = process.env
	let {
		isBlockException,
		headers
	} = config
	const __url = NODE_ENV === 'development' ? '/api/' + url : /http(s)?:\/\/.+/.test(url) ? url : baseURL + url;
	// const __url = baseURL + url;
	return base_api({
		method: 'post',
		// 如果自带协议头,就无需拼接域名
		// url: /http(s)?:\/\/.+/.test(url) ? url : baseURL + url,
		// 配合proxyTable的api配置
		url: __url,
		// url: /http(s)?:\/\/.+/.test(url) ? url : baseURL + url,
		data: params,
		headers
	}).then(res => {
		post_funcCallback(res, isBlockException);
		return res.data || res;
	})
}

// mock
const mock_func = (params = {}, url) => {
	console.debug(params)
	return axios.post(url)
		.then(function (res) {
			return res.data
		});
}
// mock
const mock_func_hbf = (params = {}, url) => {
	return axios.post(url, params, {
		headers: {
			'Content-Type': 'application/json',
		},
		transformRequest: [function (data) {
			return Qs.stringify(data);
		}]
	}).then((res) => {
		return res.data;
	}).catch(e => {
		console.log(e)
	})
}

const get_upload_url = apiUrl => `${process.env.NODE_ENV === 'development' && '/api' || ''}/boss/boss-api/upload?api=${encodeURIComponent(apiUrl)}`

export {
	base_api,
	post_func,
	mock_func,
	mock_func_hbf,
	errorManage,
	rspInfManage,
	post_funcCallback,
	get_upload_url,
	jsCrypto
};
