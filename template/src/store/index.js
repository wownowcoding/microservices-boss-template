import humps from 'humps';
Vue.use(Vuex)

const moduleContexts = require.context('./modules', true, /index\.js$/);
const modules = {}

const pagesContexts = require.context('./pages', true, /index*\.js$/);
const pages = {}

pagesContexts.keys().forEach(key => {
	pages[getPagesNameByPath(key)] = pagesContexts(key).default
});

moduleContexts.keys().forEach(key => {
	const moduleName = getModuleNameByPath(key)
	modules[moduleName] = moduleContexts(key).default
})

function getPagesNameByPath(path) {
	return path.split('/').filter(e => e !== 'index.js' && e !== '.').map(e => humps.camelize(e)).join('/');
}
function getModuleNameByPath(path, lastIndex = 2) {
	const pathSplit = path.split('/')
	return pathSplit[pathSplit.length - lastIndex]
}
const store = new Vuex.Store({
	modules: {
		...modules,
		pages: {
			namespaced: true,
			modules: {
				...pages
			}
		}
	},
})

export default store
