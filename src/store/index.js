import App from './app'

export default {
  modules: {
    App,
    bossTemplate: {
      namespaced: true,
      state: () => ({
        count: 0
      }),
      mutations: {
        increment (state) {
          state.count++
        }
      },
      actions: {
        increment (context) {
          context.commit('increment')
        }
      },
      getters: {
        getCount: state => {
          return state.count
        }
      }
    }
  },
  pages: {}
}