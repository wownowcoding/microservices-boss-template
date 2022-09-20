import actions from './actions'
import getters from './getters'
import utilsState from '@/store/mixin/state';
import utilsMutations from '@/store/mixin/mutations';
import utilsActions from '@/store/mixin/actions';
import utilsGetters from '@/store/mixin/getters';

Vue.use(Vuex)
const mutations = {}

let state = {
    namespace: 'merchant',
    reviewedStatus: [],
    merchantCategory: [],
    identificationType: [],
    merchantType: [],
    merStatus: [],
    collectionMethod: [],
    deductMethod: [],
    ruleType: [],
    signObject: [],
    serviceType: [],
    settlement: [],
    renewState: [],
    operationStatus: [],
    poundageRule: [],
    merchantBillLanguage: [],
};


export default {
    namespaced: true,
    state: Object.assign(state, utilsState),
    getters: Object.assign(getters, utilsGetters),
    actions: Object.assign(actions, utilsActions),
    mutations: Object.assign(mutations, utilsMutations),
}
