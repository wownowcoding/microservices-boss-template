import Store from '@/utils/store';
export default {
  initOperatorInfo(state) {
    if (!(state?.operatorInfo)) {
      const operatorInfo = Store.loadObject('operatorInfo');
      if (operatorInfo) {
        try {
          state.operatorInfo = Object.fromEntries(Object.entries(JSON.parse(decodeURIComponent(operatorInfo))).filter(e => !!e[1]));
        } catch(error) {}
      }
    }
  },
  beforeDestroy(state) {
    state.operatorInfo = undefined;
  }
}