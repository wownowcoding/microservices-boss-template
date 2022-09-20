import "babel-polyfill";
import "style/index.styl";
import "style/vipay-theme.less";
import router from "./router";
import App from "./page/app";
import store from "./store";
import Store from "./utils/store";
import Local from "./utils/local";
import defaultProps from "./utils/default-props";
import Util from "./utils/util";
import moment from "@/plugins/moment";
import NotAuth from "@/page/error/403";
import filters from "@/utils/filters";
import globalMixin from "@/mixin/global-mixins";
import i18n from "@/language/index.js";
import baseDatePicker from "@/components/baseDatePicker/index";
import Statistics from "@/plugins/Statistics";
import globalCompRegister from "@/utils/globalCompRegister";
import mixinStore from "@/mixin/store";
import Viewer from 'v-viewer'
import humps from 'humps';
window.humps = humps;
window.humpsGet = msg => Object.fromEntries(Object.keys(humps).map(e => [e, humps[e](msg)]));

import "@/directives/onlyNumber"
import WSwitch from '@/business-components/wownow/w-switch';
import PermissionControl, { hasPagePermission } from "@/components/permissionControl/index.js";

Vue.component(WSwitch.name, WSwitch);
Vue.component(PermissionControl.name, PermissionControl);
window.defaultProps = defaultProps;
// import BossSocket from './web-socket';

// //   import aaa from '@/language/ExportLangToCSV'

Vue.config.productionTip = false
//开启debug模式
Vue.config.debug = false
Vue.config.devtools = false

Vue.prototype.defaultProps = {
  type: String,
  default: () => ''
};

//引入公用方法库
// 本地存储
Vue.prototype.Store = Store
// 本地业务常量
Vue.prototype.Local = Local
// 常用方法库
Vue.prototype.Util = Util
// 页面功能权限校验工具函数
Vue.prototype.$hasPagePermission = hasPagePermission

//  处理 ssr 数据
try {
  Vue.prototype.ssr = window.ssrConfig && JSON.parse(decodeURIComponent(window.ssrConfig)) || ''
  Vue.prototype.ssr && console.log('【Vue.prototype.ssr】', Vue.prototype.ssr);
} catch (err) {
  Vue.prototype.ssr = {
    env: 'sit',
    hosts: [
      'boss-sit.lifekh.com'
    ],
    preFix: 'boss'
  };
}

// 时间处理
Vue.use(moment)



// 全局组件
// 面包屑（已注销）
// import Bread from '@/components/Bread'
// Vue.use(Bread)
// Vue.component('Bread', Bread)
Vue.use(NotAuth)
Vue.component('NotAuth', NotAuth)

// 全局过滤器
Vue.use(filters)

// 全局mixins
Vue.use(globalMixin)

// 图片预览组件
Vue.use(Viewer)
Vue.use(iview, {
  i18n: function (path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) {
      return value
    }
    return ''
  },
})
// 重写 iView DatePicker 组件
Vue.use(baseDatePicker)

// 注册埋点
if (typeof window.talkingCallbackFunction === 'success') {
  Vue.use(Statistics)
} else {
  window.talkingCallbackFunction = () => Vue.use(Statistics);
}

// 自定义组件全局引入
Vue.use(globalCompRegister)

// 注册Vue全局变量
window.Vue = Vue

window.getProps = (val, type = String) => {
  return {
    type,
    default: () => val
  }
}
// 设置vm为主实例,相当于vue页面中的this
window.vm = new Vue({
  mixins: [mixinStore],
  data () {
    return {
      contentSite: {
        width: 0,
        height: 0
      }
    };
  },
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App),
})
// new BossSocket();
