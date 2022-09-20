
import router from '@/router'
import Store from '@/utils/store'


const state = {
    stationId: '',
    stationDetail: {}
}

const mutations = {
    STATIONID: (state, id) => {
        state['stationId'] = id
    },
    UPDATE_DETAIL: (state, obj) => {
        state['stationDetail'] = obj
    }
}

const actions = {
    updateStationId({ commit }, data) {
        commit('STATIONID', data)
    },
    updateDetail({ commit }, obj) {
        commit('UPDATE_DETAIL', obj)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
