import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import IView from 'iview';
import('iview/dist/styles/iview.css')
import App from './App.vue';
import router from './router';
import language from './language';
import store from './store';
import filters from "@/utils/filters";

Vue.use(VueI18n)
Vue.use(Vuex)
Vue.use(IView)
// 全局过滤器
Vue.use(filters)


const i18n = new VueI18n({
  //定义默认语言
  locale: 'zh',
  messages: language,
  silentTranslationWarn: true //禁止没匹配警告
})

Vue.config.productionTip = false;


window.vm = new Vue({
  i18n,
  store: new Vuex.Store({
    modules: {
      ...store.modules,
      pages: {
        namespaced: true,
        modules: {
          ...store.pages
        }
      }
    }
  }),
  router,
  render: h => h(App),
}).$mount('#app');