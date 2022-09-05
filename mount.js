import routes from './src/router/exposes';
import language from './src/language';
import store from './src/store';

export default {
  mount: (vue) => {
    console.clear()
    console.log(vue, 'vue')
    console.log(store, 'store')
    return { routes, language, store }
  },
  mountSuccess: () => {
    console.log("mountSuccess")
  }
}