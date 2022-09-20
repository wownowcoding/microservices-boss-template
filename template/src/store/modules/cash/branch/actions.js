import { api, operator_counter_info_api } from '@/api/cash/counter_list';
import Store from '@/utils/store'
export default {
    async getOperatorCounterInfo(context) {
        const { commit, rootState } = context
        const { operatorCounterInfo } = rootState.branch
        const operatorCode = Store.loadObject('operatorNo')
        if (!!operatorCode && operatorCounterInfo.operatorCode != operatorCode) {
            const res = await api({ operatorCode }, operator_counter_info_api)
            const counter = res.data
            commit('branch/setOperatorCounterInfo', { ...counter, operatorCode }, { root: true }) }
    }
}
