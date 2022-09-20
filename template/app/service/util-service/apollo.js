//  要过滤的 key 前缀
const prefix = 'mobile-boss-ssr.';
let app;
//  整合数据
const assignmentCallback = (data) => {
	try {
		if (data === 'undefined') {
			return undefined;
		}
		//  字符串转 boolean 值
		if (['true', 'false'].indexOf(data) !== -1) {
			return data === 'true';
		}
		//  是否是整数数字
		if (/^[0-9]+$/.test(data)) {
			return parseInt(data, 10);
		}
		//  是否是浮点数
		if (/^\d+$|^\d+\.\d+$/g.test(data)) {
			return parseFloat(data, 10);
		}
		//  转移后的数组
		const __data = typeof data === 'string' && data.toLocaleLowerCase() || data;
		if (__data.indexOf('%5b') !== -1 && __data.indexOf('%5d') !== -1 || __data.indexOf('%7d') !== -1 && __data.indexOf('%7d') !== -1) {
			return JSON.parse(decodeURIComponent(data));
		}
	} catch (err) {
		app.logger.error('assignmentCallback err: ', err);
	}
	return data;
}
const checkIsUpdate = (obj, strobj) => {
	let ret = false;
	// 数据备份以供联调查验
	obj.apolloData = strobj;
	Object.keys(strobj).forEach(__oldKey => {
		const oldKey = __oldKey.replace(prefix, '');
		//  如果 key 不包含 .,则代表没有下级
		if (oldKey.indexOf('.') === -1) {
			let oldValue, newValue;
			try {
				oldValue = obj[oldKey].toString();
				newValue = assignmentCallback(strobj[`${prefix}${oldKey}`]).toString();
			} catch (error) {
				app.logger.error('checkIsUpdate err: ', error);
				oldValue = obj[oldKey];
				newValue = assignmentCallback(strobj[`${prefix}${oldKey}`]);
			}
			if (oldValue !== newValue) {
				ret = {
					oldValue,
					newValue,
					key: oldKey
				};
				return ret;
			}
		} else {
			//  当前这个 key 最顶部对象
			const strObjKeys = oldKey.split('.');
			let pointerObj;
			if (!obj[strObjKeys[0]]) {
				obj[strObjKeys[0]] = {};
			}
			pointerObj = obj[strObjKeys[0]];
			for (let i = 1, len = strObjKeys.length; i < len; i++) {
				if (i === len - 1) {
					let oldValue, newValue;
					try {
						oldValue = pointerObj[strObjKeys[i]].toString();
						newValue = assignmentCallback(strobj[`${prefix}${oldKey}`]).toString();
					} catch (error) {
						app.logger.error('checkIsUpdate2 err: ', error);
						oldValue = pointerObj[strObjKeys[i]];
						newValue = assignmentCallback(strobj[`${prefix}${oldKey}`]);
					}
					if ( oldValue !== newValue ) {
						ret = {
							oldValue,
							newValue,
							key: oldKey
						};
						return ret;
					}
				} else {
					if (!pointerObj[strObjKeys[i]]) {
						pointerObj[strObjKeys[i]] = {};
					}
					pointerObj = pointerObj[strObjKeys[i]];
				}
			}
		}
	});
	return ret;
};
//  处理 process.env 的数据
const setStringKeysObject = (obj, strobj) => {
	// 数据备份以供联调查验
	obj.apolloData = strobj;
	Object.keys(strobj).forEach(__oldKey => {
		const oldKey = __oldKey.replace(prefix, '');
		//  如果 key 不包含 .,则代表没有下级
		if (oldKey.indexOf('.') === -1) {
			obj[oldKey] = assignmentCallback(strobj[`${prefix}${oldKey}`]);
		} else {
			//  当前这个 key 最顶部对象
			const strObjKeys = oldKey.split('.');
			let pointerObj;
			if (!obj[strObjKeys[0]]) {
				obj[strObjKeys[0]] = {};
			}
			pointerObj = obj[strObjKeys[0]];
			for (let i = 1, len = strObjKeys.length; i < len; i++) {
				if (i === len - 1) {
					pointerObj[strObjKeys[i]] = assignmentCallback(strobj[`${prefix}${oldKey}`]);
				} else {
					if (!pointerObj[strObjKeys[i]]) {
						pointerObj[strObjKeys[i]] = {};
					}
					pointerObj = pointerObj[strObjKeys[i]];
				}
			}
		}
	});
};
const getPublicData = (data, apolloData) => {
	Object.keys(data).forEach(e => {
		if (data[e] && data[e][0] === '$' && data[e][1] === '{' && data[e][data[e].length - 1] === '}') {
			const __key = data[e].replace(/(^\$\{)|(\}$)/g, '');
			data[e] = apolloData[__key];
		}
	});
	return data;
}
//  去除 key 值前缀 filter
const filterKeyPrefix = (data) => {
	const apolloData = {};
	Object.keys(data || {}).filter(e => e.indexOf(prefix) !== -1).forEach(e => {
		apolloData[e] = data[e]
	});
	return getPublicData(apolloData, data);
}

module.exports = (app, isConfig) => {
	if (isConfig === true) {
		return {
			prefix,
			setStringKeysObject,
			filterKeyPrefix,
			checkIsUpdate
		}
	}
	return class ApolloService extends app.Service {
		constructor(...args) {
			super(...args);
			app = this.app;
		}
		get prefix() {
			return prefix;
		}
		setStringKeysObject(obj, strobj) {
			setStringKeysObject(obj, strobj);
		}
		filterKeyPrefix(data) {
			return filterKeyPrefix(data);
		}
		checkIsUpdate(...args) {
			return checkIsUpdate(...args);
		}
	}
}