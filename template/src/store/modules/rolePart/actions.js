import consts from './consts'
import { api_func } from '@/api'

export default {
    // 获取全局权限
    async get_role_part({ commit, state }) {
        const { permissionList } = Vue.prototype.ssr;
        const res = permissionList || await api_func({}, 'permission_list');
        if (res.rspCd === '00000') {
            commit(consts.GET_ROLE_PART, res.data)
        }
    }
}
