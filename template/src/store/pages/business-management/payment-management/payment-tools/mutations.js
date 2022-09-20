export default {
  setLoading(state, isLoading) {
    state.tableData.loading = !!isLoading;
  },
  pageList(state, params = {}) {
    const { pageNum = 1, total = 0, list = [] } = params;
    state.tableData.page.total = total - 0 || 0;
    state.tableData.page.pageNum = pageNum - 0 || 0;
    state.tableData.data = list;
  },
  updatePageNum(state, num = 1) {
    state.tableData.page.pageNum = num - 0;
  },
  beforeDestroy(state) {
    state.tableData = JSON.parse(state.tableDataStr);
  },
  //  设置支付交易方法数据
  setTransactionChanne(state, data) {
    state.transactionChanne = data.filter(e => e.payToolNo && e.name).map(e => ({ code: e.payToolNo, message: e.name }));
  }
}