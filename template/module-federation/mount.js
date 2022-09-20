import route from '../src/router/exportRouter';
import language from '../src/language/exportLanguage';
// import store from './src/store';
export default {
  mount: (vue) => {
    return { route, lang: language, store: null }
  },
  mountSuccess: () => {
    console.log("mountSuccess")
  }
}