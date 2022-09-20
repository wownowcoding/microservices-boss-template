// 国际化语言配置
import Store from '@/utils/store';
import { bossLanguageBulkInsert, bossLanguageAllList } from '@/api/boss-language';
import { deepObjectAssign } from '@/utils/deep-copy';
import localeFileZh from '@/language/zh/'
import localeFileEn from '@/language/en/'
import localeFileKm from '@/language/km/'

const localeZh = deepObjectAssign(localeFileZh, iview.langs['zh-CN']);
const localeEn = deepObjectAssign(localeFileEn, iview.langs['en-US']);
const localeKm = deepObjectAssign(localeFileKm, iview.langs['en-US']);

// 优先级：用户缓存 > 浏览器 > 缺省
let lang = Store.loadObject('lang') || navigator.language.split('-')[0] || 'en'
// const lang = 'en'
// 缓存当前语言
Store.saveObject('lang', lang);
let currentStoreLanguage = Store.loadObject('current-language-list');
if (!(currentStoreLanguage && !!(currentStoreLanguage.zh || currentStoreLanguage.km || currentStoreLanguage.en))) {
	currentStoreLanguage = {};
}
// const currentStoreLanguage = {};
const localeZhCache = deepObjectAssign(localeZh, currentStoreLanguage?.zh ?? {});
const localeEnCache = deepObjectAssign(localeEn, currentStoreLanguage?.en ?? {});
const localeKmCache = deepObjectAssign(localeKm, currentStoreLanguage?.km ?? {});

//	将国际化 key:value 转换成 key.key.key: value 数组模式
const conversionLanguageToList = (language, obj, list = [], currentKey = '') => {
	if (typeof obj === 'object') {
		Object.keys(obj).forEach(e => {
			conversionLanguageToList(language, obj[e], list, `${currentKey && currentKey + '.' || ''}${e}`);
		});
		return;
	}
	if (currentKey !== 'i.locale') {
		list.push({ languageKey: currentKey, [language]: obj });
	}
};
//	将数据库的 key.key.key: value 转换成 key:value 的 json 格式
const conversionLanguageToObject = (language, list) => {
	const languageMap = {};
	for (const item of list) {
		const { languageKey } = item;
		const keys = languageKey.split('.');
		let currentMap = undefined;
		keys.forEach((e, i) => {
			if (i !== keys.length - 1) {
				if (!currentMap && languageMap[e]) {
					currentMap = languageMap[e];
				} else if (!currentMap && !languageMap[e]) {
					currentMap = {};
					languageMap[e] = currentMap;
				} else {
					currentMap[e] = currentMap[e] || {};
					currentMap = currentMap[e];
				}
			} else {
				currentMap[e] = item[language];
			}
		});
	}
	return languageMap;
};
Vue.use(VueI18n)
const i18n = new VueI18n({
	//定义默认语言
	locale: lang,
	// formatter: new Formatter(),
	messages: {
		zh: localeZhCache,
    en: localeEnCache,
		km: localeKmCache,
	},
	silentTranslationWarn: true //禁止没匹配警告
});

//	获取所有线上国际化
const getbossLanguageList = async (params = {}) => {
	let list = [];
	let resLanguageSwitch = 'close';
	await bossLanguageAllList({
		language: lang
	}, {
		success: ({ languageSwitch, list: dataSource }) => {
			resLanguageSwitch = languageSwitch;
			list = dataSource;
		},
		isBlockException: true
	});
	return {
		list,
		languageSwitch: resLanguageSwitch
	};
};
//	将国际化文案加上唯一键key
const setLanguageKeys = (languageObj) => {
	const list = [];
	conversionLanguageToList(lang, languageObj, list);
	list.forEach((e, i) => {
		list[i][lang] = `(${e.languageKey})${e[lang]}`;
	});
	return conversionLanguageToObject(lang, list);
}
//	动态懒加载国际化
const loadLanguageAsync = () => {
	getbossLanguageList().then(res => {
		const { list: apiResult, languageSwitch } = res;
		let localFile = lang === 'km' && localeKm || lang === 'zh' && localeZh || localeEn;
		if (languageSwitch !== 'open') {
			i18n.setLocaleMessage(lang, localFile);
			Store.saveObject('current-language-list', localFile);
			return;
		}
		const isShowLanguage = Store.loadObject('isShowLanguage') || false;
		localFile = lang === 'km' && localeKmCache || lang === 'zh' && localeZhCache || localeEnCache;
		let languageObj;
		if (apiResult.length) {
			languageObj = deepObjectAssign(localFile, conversionLanguageToObject(lang, apiResult));
			currentStoreLanguage[lang] = languageObj;
			Store.saveObject('current-language-list', currentStoreLanguage);
		}
		if (window.vm.$store.state.rolePart.rolePart.system_bossLanguage && isShowLanguage) {
			languageObj = setLanguageKeys(languageObj ||  localFile);
		}
		if (languageObj) {
			i18n.setLocaleMessage(lang, languageObj);
		}
		window.vm.Util.timeout(() => {
			//	将所有国际化整理成数组
			const languageList = [];
			conversionLanguageToList(lang, i18n.messages, languageList);
			//	接口获取的映射
			const bossLanguageMap = new Map();
			apiResult.forEach(e => !bossLanguageMap.get(e.languageKey) && bossLanguageMap.set(e.languageKey, e));

			//	得将三语的国际化文件获取出来
			window.vm.Util.timeout(() => {
				const localeLenguage = {};
				//	文件获取的
				const kmList = [];
				conversionLanguageToList('km', localeKm, kmList);
				kmList.forEach(e => {
					if (!localeLenguage[e.languageKey]) {
						localeLenguage[e.languageKey] = {}
					}
					localeLenguage[e.languageKey].km = e.km;
					localeLenguage[e.languageKey].zh = localeLenguage[e.languageKey].zh || e.km
					localeLenguage[e.languageKey].en = localeLenguage[e.languageKey].en || e.km;
				});
				const enList = [];
				conversionLanguageToList('en', localeEn, enList);
				enList.forEach(e => {
					if (!localeLenguage[e.languageKey]) {
						localeLenguage[e.languageKey] = {}
					}
					localeLenguage[e.languageKey].en = e.en;
					localeLenguage[e.languageKey].zh = localeLenguage[e.languageKey].zh || e.en
					localeLenguage[e.languageKey].km = localeLenguage[e.languageKey].km || e.en;
				});
				const zhList = [];
				conversionLanguageToList('zh', localeZh, zhList);
				zhList.forEach(e => {
					if (!localeLenguage[e.languageKey]) {
						localeLenguage[e.languageKey] = {}
					}
					localeLenguage[e.languageKey].zh = e.zh;
					localeLenguage[e.languageKey].en = localeLenguage[e.languageKey].en || e.zh
					localeLenguage[e.languageKey].km = localeLenguage[e.languageKey].km || e.zh;
				});
				const localeObjectList = Object.entries(localeLenguage);
				const installList = [];
				localeObjectList.forEach(e => !bossLanguageMap.get(e[0]) && installList.push({ languageKey: e[0], ...e[1] }));
				if (installList && installList.length) {
					console.log('installList: ', installList);
					const pageSize = 1000;
					const pageCount = Math.ceil(installList.length / pageSize);
					for (let i = 1; i <= pageCount; i++) {
						bossLanguageBulkInsert({
							documentList: installList.slice((i - 1) * pageSize, pageSize * i)
						}, {
							success: res => {
								console.log('install success: ', res?.result ?? res);
							},
							isBlockException: true
						});
					}
				}
			}, 500);
		}, 500);
	}).catch(resError => {
		console.log('resError: ', resError);
	});
};
window.loadLanguageAsync = loadLanguageAsync;
loadLanguageAsync();

export default i18n
