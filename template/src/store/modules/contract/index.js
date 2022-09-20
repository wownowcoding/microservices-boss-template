import actions from './actions'
const mutations = {}
Vue.use(Vuex)


const state = {
    signObjectList: [
        { label: "个人", value: '01', disabled: false }, // 个人
        { label: "个体工商户", value: '02', disabled: false }, // 个体工商户
        { label: "企业", value: '03', disabled: true } // 企业
    ],
    serviceTypeList: [
        { label: "收款码", value: '01', disabled: false },
        { label: "充值", value: '02', disabled: false },
        { label: "转账", value: '03', disabled: false }
    ],
    deductFeeList: [
        { label: "收款码", value: '01', disabled: false },
        { label: "充值", value: '02', disabled: false },
        { label: "转账", value: '03', disabled: false }
    ],
    settlementTypeList: [
        { label: "收款码", value: '01', disabled: false },
        { label: "充值", value: '02', disabled: false },
        { label: "转账", value: '03', disabled: false }
    ],
};


export default {
    state,
    actions,
    mutations
}
