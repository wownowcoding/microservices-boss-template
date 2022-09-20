export default {
  data() {
    return {
      table: {
        page: {
          total: 0,
          pageNum: 1,
          pageSize: 10
        },
        loading: false,
        data: [],
        height: 300,
        cols: [
          {
            title: this.$t('v1_6.operatingTime'),
            minWidth: 220,
            align: 'center',
            render: (h, params) =>{
              return h("div", Vue.filter("Datetime")(new Date(params.row.createTime)))
            } 
          },
          // 操作员
          {
            title: this.$t('v1_6.operator'),
            minWidth: 220,
            align: 'center',
            key: 'operatorName'
          },
          // 操作内容
          {
            title: this.$t('v1_6.operationContent'),
            minWidth: 220,
            align: 'center',
            render: (h, params) => h("div", this.operationFormat(params.row.operation))
          },
          {
            title: this.$t('v1_6.remark'),
            minWidth: 220,
            align: 'center',
            key: 'reason'
          }
        ]
      }
    };
  },
  computed: {
    operationFormat () {
      return this.$store.getters.enumGetter("message", "messageOperateType");
    },
  }
}