const tableDataStr = JSON.stringify({
  data: [],
  page: { pageNum: 1, pageSize: 10, total: 0 },
  loading: false
});
export default { tableDataStr, tableData: JSON.parse(tableDataStr) };