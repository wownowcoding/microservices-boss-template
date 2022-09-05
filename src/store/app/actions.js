import consts from './consts'
import { api_func } from '@/api'

export default {
    // 获取角色列表
    async getRolePullDownList({ commit }) {
        let { rspCd, data } = await api_func({}, `getRolePullDownList`)
        if (rspCd === '00000') {
            let role_list_func = {}
            let role_list = data
            data.map(item => {
                role_list_func[item.roleNo] = item.roleName
            })
            commit(consts.GET_ROLE_PULLDOWNLIST, {
                role_list,
                role_list_func,
            })
        }
    },

    // 获取全局枚举
    async getEnumByKeys({ commit }) {
        let rspCd, data;
        const { enums } = Vue.prototype.ssr;
        if (enums) {
            rspCd = enums.rspCd;
            data = enums.data;
        } else {
            let res = await api_func({}, `getEnumByKeysAll`)
            rspCd = res.rspCd;
            data = res.data;
        }
        // data = JSON.parse(JSON.stringify(data).replace(new RegExp('null', 'g'), 'undefined'));
        if (rspCd === '00000') {
            const currentBusinessLine = (window?.vm?.$store?.state?.account?.operatorInfo?.businessLine ?? []).filter(e => e).map(e => e.toString());
            data['basic-common'].businessLineDataSource = JSON.parse(JSON.stringify(data['basic-common'].businessLine));
            data['basic-common'].businessLine = data['basic-common'].businessLine.filter(e => currentBusinessLine.indexOf(e.code.toString()) !== -1);

            commit(consts.GET_ENUMBYKEYS, data)
            // 把全局枚举的值对应放到其他模块下
            // 此处是兼容旧版本的store模块管理枚举架构
            const stateModulesMap = vm.$store.state
            // 因为后台的模块名与前端的模块名不一致,做个中间map用于转换
            const mdNameMap = {
                settle: 'settle',
                order: 'trade',
            }
            Object.keys(data).forEach(mdName => {
                if (stateModulesMap[mdNameMap[mdName] || mdName]) {
                    commit(mdName + '/setEnumStatus', data[mdName], {
                        root: true,
                    })
                }
            })
        }
    },
}
