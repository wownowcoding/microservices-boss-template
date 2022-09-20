const { mapState } = Vuex;
export default {
  data() {
    return {
      formCustom: {
        recipientType: [],
      },
      ruleCustom: {
      },
      titleLen: 500,
      contentLen: 5000,
    };
  },
  created () {
  },
  methods: {
    // 详情
    // async getDetail (messageNo) {
    //   let { rspCd, data } = await api({messageNo}, stationLetterDetail);
    //   if (rspCd + '' === '00000') {
    //     // this.formCustom = this.handleDetail(data)
    //   }
    // },
    // 保存
    saveAction () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
        }
      })
    },
    getLabel(val) {
      return `${val}：`
    }
  },
  computed: {
    ...mapState({
      messageType: state => state.app.enumByKeys.message.messageType,
      recipientType: state => state.app.enumByKeys.message.recipientType
    }),
  }
}