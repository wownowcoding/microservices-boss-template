import VInput from './src/input';

/* istanbul ignore next */
VInput.install = function(Vue) {
  Vue.component(VInput.name, VInput);
};

export default VInput;
