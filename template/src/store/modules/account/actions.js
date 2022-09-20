import consts from './consts'

export default {
  // 切换语言
  test({ commit }, data) {
    commit(consts.CHANGE_LANG, data);
  }
}
