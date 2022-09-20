/*
 * @Description:
 * @Author: 管铭钊
 * @Date: 2019/11/11
 */
import apiUrl from '@/api/permission'
import api from '@/api/apiUtil'
import Store from '@/utils/store'

export default {
    async getMainMenu({ commit, state }) {
        try {
            const { systemMenuFirstList } = Vue.prototype.ssr;
            if (systemMenuFirstList) {
                commit('SET_MAIN_MENU', systemMenuFirstList.data)
            } else {
                state.mainMenuLoading = true
                const roleNo = Store.loadObject('roleNo')
                const { data } = await api({ roleNo }, apiUrl.getMainMenu)
                commit('SET_MAIN_MENU', data)
            }
        } catch (e) {
            console.log(e, "e")
        } finally {
            state.mainMenuLoading = false
        }
    },

    async getSubMenu({ commit, state }, params) {
        try {
            const roleNo = Store.loadObject('roleNo')
            const currentMenuParent = Store.loadObject('currentMenuParent')
            // 菜单无数据、请求参数变更或强制刷新时请求
            // if (!state.subMenu.length || currentMenuParent !== params.parent || params.refresh) {
                state.subMenuLoading = true
                const { data } = await api({ parent: currentMenuParent, ...params, roleNo }, apiUrl.getSubMenu)
                Store.saveObject('currentMenuParent', params.parent || currentMenuParent)
                commit('SET_SUB_MENU', data)
            // }
        } catch (e) {
            console.log(e, "e")
        } finally {
            state.subMenuLoading = false
        }
    },


}
