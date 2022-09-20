import utilsState from '@/store/mixin/state';
import getters from './getters'
import mutations from './mutations'
import utilsMutations from '@/store/mixin/mutations';
import utilsActions from '@/store/mixin/actions';
import utilsGetters from '@/store/mixin/getters';

Vue.use(Vuex)


const state = {
    // whiteListStatus: []
    whiteList: [],
    activeState: [],
    adBanner: [],
    advertisementLocation: []
};

// 合并通用

export default {
    namespaced: true,
    state: Object.assign(state, utilsState),
    getters: Object.assign(getters, utilsGetters),
    actions: Object.assign({}, utilsActions),
    mutations: Object.assign(mutations, utilsMutations),
}

