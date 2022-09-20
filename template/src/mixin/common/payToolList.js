import {
  payToolList
} from '@/api/business-components/payment-management';

let payChannel = []
let time = 0

export default {
  data() {
    return {
      payChannel: payChannel
    }
  },
  created() {
    if (new Date().getTime() - time > 180000) {
      time = new Date().getTime()
      payToolList({
        pageNum: 1,
        pageSize: 1000
      }).then(res => {
        payChannel = res.data.list.map(item => {
          return {
            code: item.vipayCode,
            message: item.name,
            payToolNo: item.payToolNo,
          }
        })
        console.log('payChannel!!!')
        console.log(JSON.stringify(payChannel))
        this.payChannel = payChannel
      })
    }
  },
  methods: {
    payChannelEnum(code) {
      const item = this.payChannel.find(e => e.code == code)
      if (item) return item.message
      return code
    }
  }
}
