export default {
  setLoading(state, isLoading) {
    state.tableData.loading = !!isLoading;
  },
  updatePageNum(state, num = 1) {
    state.tableData.page.pageNum = num - 0;
  },
  addDepartmentSubmit(state, row) {
    state.tableData.data.unshift(Object.assign({}, row, {
      createTime: new Date().valueOf()
    }));
    if (state.tableData.data.length > state.tableData.page.pageSize) {
      state.tableData.data.splice(state.tableData.data.length - 1, 1);
    }
    state.tableData.page.total++;
    this.commit(`department/getDepartmentTreeList`);
  },
  deleteDepartmentSubmit(state, departmentNo) {
    state.tableData.data = state.tableData.data.filter(e => e.departmentNo !== departmentNo);
    state.tableData.page.total--;
    this.commit(`department/getDepartmentTreeList`);
  },
  editDepartmentSubmit(state, formData) {
    for (let i = 0, len = state.tableData.data.length; i < len; i++) {
      if (state.tableData.data[i].departmentNo === formData.departmentNo) {
        Object.keys(formData).forEach(e => {
          state.tableData.data[i][e] = formData[e];
        });
        break;
      }
    }
    this.commit(`department/getDepartmentTreeList`);
  },
  pageList(state, params = {}) {
    const { pageNum = 1, total = 0, list = [] } = params;
    state.tableData.page.total = total - 0 || 0;
    state.tableData.page.pageNum = pageNum - 0 || 0;
    state.tableData.data = list;
  },
  beforeDestroy(state) {
    state.tableData = JSON.parse(state.tableDataStr);
  }
}