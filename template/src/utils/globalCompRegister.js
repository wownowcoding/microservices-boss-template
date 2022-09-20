// 全局注册element-ui的el-image,loading
import { Image ,Loading} from "element-ui";
Vue.use(Image);
Vue.use(Loading);

const globalCompMap = {
  // 数字输入框
  VInputNumber: require("@/components/InputNumber").default,
  // 统计
  QuerySum: require("@/components/QuerySum").default,

  // =================== iview 组件包装
  // 带收缩开关的Card组件
  VCard: require("@/components/VCard/index.vue").default,
  // 带loading限制防重复提交的Button组件
  VButton: require("@/components/VButton/index.vue").default,
  // Money组件
  VMoney: require("@/components/VMoney/index.vue").default,
};

export default {
  install(Vue) {
    // 以键为组件名注册
    Object.keys(globalCompMap).forEach(compName => {
      Vue.component(compName, globalCompMap[compName]);
    });
  }
};
