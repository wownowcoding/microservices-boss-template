import consts from './consts'
import Store from '@/utils/store'
import Util from '@/utils/util'

export default {
    windowResize(state) {
        try {
            state.winWidth = window.document.body.clientWidth
            state.winHeight = window.document.body.clientHeight
        } catch (e) {
            console.log(e)
        }
    },
    [consts.GET_ROLE_PULLDOWNLIST](state, payload) {
        let { role_list_func, role_list } = payload
        state.role_list_func = role_list_func
        state.role_list = role_list
    },
    [consts.GET_MENU_ORDER](state, payload) {
        state.menuOrderList = payload
    },
    [consts.GET_ENUMBYKEYS](state, payload) {
            console.log('enumByKeys', payload)
          state.enumByKeys = payload
    },
  setImVisible(state, payload) {
      state.imVisible = payload
    },
}
