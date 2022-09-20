import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import utilsState from '@/store/mixin/state'
import utilsMutations from '@/store/mixin/mutations'
import utilsActions from '@/store/mixin/actions'
import utilsGetters from '@/store/mixin/getters'

Vue.use(Vuex)

let state = {
    namespace: 'cash-branch',
    operatorCounterInfo: {}, // 操作员的柜员信息
    branchStatus: [],
    counterStatus: [],
    counterRole: [],
    signType: [],
    branchOperate: [],
    counterOperate: [],
    schedulingStatus: [],
}

export default {
    namespaced: true,
    state: Object.assign(state, utilsState),
    getters: Object.assign(getters, utilsGetters),
    actions: Object.assign(actions, utilsActions),
    mutations: Object.assign(mutations, utilsMutations),
}
