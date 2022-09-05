import Vue from 'vue';
import VueRouter from 'vue-router';

import exposesRoute from './exposes';
import Store from '@/utils/store';

Vue.use(VueRouter)

const routes = [
  ...exposesRoute,
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login'),
  }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

router.beforeEach((to, from, next) => {
  const notLogin = ['/login', '/upload-static-resources'];
  if (Store.loadObject('isSessionValid') || notLogin.indexOf(to.path) !== -1) {
    next();
  } else {
    next(`/login?loginCallback=${encodeURIComponent(window.location.href)}`);
  }
});

export default router