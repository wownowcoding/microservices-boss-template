/*
 * @Description: 权限相关（菜单、按钮权限）
 * @Author: 管铭钊
 * @Date: 2019/11/11
 */
import actions from './actions'
import mutations from './mutations'

const state = {
    mainMenu: [],
    subMenu: [],
    userAuth: [],
    mainMenuLoading: false,
    subMenuLoading: false,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
