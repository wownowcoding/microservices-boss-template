/*
 * @Description: 配置变量
 * @Author: 管铭钊
 * @Date: 2019/6/17
 */
import router from '@/router'
import Store from '@/utils/store'
import i18n from '@/language'



const state = {
    activeMenu: '',
    lang: Store.loadObject('lang') || 'zh',
    langList: ['zh', 'en']
}

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    },
    UPDATE_LANGUAGE: (state, lang) => {
        const targetLang = lang || Store.loadObject('lang') || state.lang
        // 缓存
        Store.saveObject('lang', targetLang)
        state.lang = targetLang
        i18n.locale = targetLang
    }
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    },
    goToPreviousActiveMenu({ commit, state }, data) {
        const lastIndex = Math.max(1, state.activeMenu.length - 2)
        const lastActiveMenu = state.activeMenu[lastIndex]
        router.push({name: lastActiveMenu.menuCode})
    },
    updateLanguage({ commit }, lang) {
        commit('UPDATE_LANGUAGE', lang)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
