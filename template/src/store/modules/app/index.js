import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
    winWidth: 0,
    winHeight: 0,
    pageTagsList: [],
    dontCache: [], // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js),
    cachePage: [],
    openedSubmenuArr: [],
    role_list_func: {},
    role_list: [],
    // 全局枚举
    enumByKeys: {},
    imVisible: false
};

export default {
    state,
    actions,
    getters,
    mutations
}


