import Store from '@/utils/store';
import commonRouter from '@/router/common';
import { buryRouter } from '@/plugins/Statistics';
const devFilterRouters = [];
let routes = [...devFilterRouters];

const isDev = process.env.NODE_ENV === 'development';
// 非Dev环境不展示开发路由
const isProd = process.env.NODE_ENV === 'production';

routes = routes.length && routes || [];

if (!routes.length) {
	const pagesContexts = require.context('./', true, /index*\.js$/);
	try {
		pagesContexts.keys().forEach(key => {
			console.log(key)
			// 上面已经手动加载了common路由了
			if (['./common/index.js'].includes(key)) {
				return
			}
			try {
				const page = pagesContexts(key).default;
				if (page) {
					page.forEach(e => routes.push(e));
				}
			} catch (e) {
				console.log(e)
			}
		});
	} catch (e) {
		console.log(e)
	}
}

console.log("routes: ", routes)
Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: `/${Vue?.prototype?.ssr?.preFix ?? 'boss'}`,
	routes: [...routes, ...commonRouter],
	scrollBehavior: (to, from, savedPosition) => ({ x: 0, y: 0 })
});

router.beforeEach((to, from, next) => {
	if (window?.vm?.$root?.mixinStore?.router) {
		const toMenus = from.name.split(':');
		const menuName1 = toMenus[0];
		const menuName2 = toMenus[1];
		Object.keys(window?.vm?.$root?.mixinStore?.router).forEach(e => {
			const [routerMenu1, routerMenu2] = e.split(':');
			if (routerMenu1 !== menuName1 || routerMenu2 !== menuName2) {
				if (window.vm.$root.mixinStore.router[e]) {
					window.vm.$root.mixinStore.router = {}
				}
			}
		});
	}

	const notLogin = ['/login', '/upload-static-resources'];
	if (Store.loadObject('isSessionValid') || notLogin.indexOf(to.path) !== -1) {
		next();
  } else {
		next(`/login?loginCallback=${encodeURIComponent(window.location.href)}`);
	}
});

router.afterEach(to => {
	// 路由跳转埋点
	if (isProd) {
		buryRouter(to.path);
	}
	isDev || window.scrollTo(0, 0);
});

router.onError((error) => {
  const isChunkLoadFailed = error.message.indexOf('Loading chunk') > -1 && error.message.indexOf('failed') > -1
  if (isChunkLoadFailed) {
    window.routerErrorCallBack && window.routerErrorCallBack()
    setTimeout(() => {
      let routeUrl = router.resolve({
        path: router.history.pending.fullPath,
        query: { ...router.history.pending.query }
      })
      location.replace(routeUrl.href)
    }, 3000)
  }
})

export default router;
