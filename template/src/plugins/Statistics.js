const evtEnumMap = {
	ROUTER: '路由',
	PERFORMANCE: '性能',
}

const Statistics = {
	onEvent(evtEnum = 'DEFAULT', description = '缺省描述', params = {}) {
		let self = window.TDAPP || this

		// 合并并且获取浏览器信息
		params = Object.assign(params, {
			ua: navigator.userAgent,
			timing: performance.timing,
			deploy_env: DEPLOY_ENV || 'dev',
		})

		let fn = () => { }
		if (window.TDAPP) {
			fn = window.TDAPP.onEvent
		} else {
			// 埋点不生效
			// console.warn('bury point failed')
		}
		return fn.apply(self, [
			`${evtEnumMap[evtEnum]}-${description}`,
			description,
			params,
		])
	},
}

export function buryRouter(path) {
	// 首页不记录
	if (path === '/home') {
		return
	}
	const { ROUTER } = evtEnumMap
	Statistics.onEvent(ROUTER, '路由跳转', { path })
	return path
}

export function buryPerformance() {
	let timing = window.performance.timing,
		start = timing.navigationStart
	let timingObj = {
		// dnsTime
		DNS解析时间: timing.domainLookupEnd - timing.domainLookupStart,
		// tcpTime
		TCP建立时间: timing.connectEnd - timing.connectStart,
		// domReadyTime
		解析DOM树耗时: timing.domComplete - timing.domInteractive,
		// firstPaintTime
		首屏时间: timing.responseStart - start,
		// domRenderTime
		dom渲染完成时间: timing.domContentLoadedEventEnd - start,
		// loadTime
		页面onload时间: timing.loadEventEnd - start,
	}

	Object.keys(timingObj).forEach(key => {
		timingObj[key] = timingObj[key] + '毫秒'
	})
	const { PERFORMANCE } = evtEnumMap
	Statistics.onEvent(PERFORMANCE, '页面耗时', timingObj)
	return timingObj
}

export default {
	install(Vue) {
		Vue.prototype.$Statistics = Statistics
	},
}
