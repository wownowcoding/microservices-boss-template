// 此权限 控制到控件
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    permissionList: [],
    rolePagePermissions: [],
    menuSeqList: [],
    rolePart: {},
    roleName: {},
    // 导航栏菜单
    menuList: [],
    menuList1: [],
    menuOrderList: [],
    // 语言
    lang: {
        active: 'zh',
        list: [
            'zh',
            'en'
        ]
    },
}

const getters = {
    // 获取操作权限，返回boolean
    // 引入：...mapGetters(['hasPermission'])
    // 使用：hasPermission('store_list_query')或者this.hasPermission('store:list:query')
    // 兼容冒号分隔和下划线分隔
    hasPermission: (state, getters) => (codeName) => {
        if (!codeName || typeof codeName !== 'string') {
            console.error(`codeName ${codeName} No Found`)
            return
        }
        codeName = codeName.replace(/:/g, '_')
        return state.rolePart[codeName]
    },

    hasPagePermission: (state, getters) => (pageCode, codeName) => {
        if (!codeName || typeof codeName !== 'string') {
            console.error(`codeName ${codeName} No Found`)
            return
        }
        pageCode = pageCode.replace(/:/g, '_')
        if (!state.rolePagePermissions[pageCode]) return false

        codeName = codeName.replace(/:/g, '_')
        console.debug(state.rolePagePermissions, 'hasPagePermission')
        return state.rolePagePermissions[pageCode][codeName]
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
