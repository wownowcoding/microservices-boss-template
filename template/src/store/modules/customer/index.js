import { getQueryEnum } from '@/api/customerCenter/memberManagement.js'
import getters from './getters'

const customer = {
  state: {
    manageCategoryList: [], // B端类别
    userCategoryList: [] // C端类别
  },
  getters,
  mutations: {
    setCategory(state, payload = {}) {
      const keys = Object.keys(payload)
      keys.forEach(o => {
        state[o] = payload[o]
      })
    }
  },
  actions: {
    // 获取类别
    async getCategory({ state, commit }, payload = {}) {
      const { isAllNeed, type } = payload
      const res = await getQueryEnum({ isAllNeed, type })
      if (res.rspCd === '00000') {
        const { list } = res.data
        if (type === '1') { // B端
          commit('setCategory', { manageCategoryList: list })
        }
        if (type === '2') { // C端
          commit('setCategory', { userCategoryList: list })
        }
      }
    },
  }
}

export default customer
