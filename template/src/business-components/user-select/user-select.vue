<template>
  <Modal class="send-modal" v-model="visible" :title="title" width="720">
    <div class="manual-coupon-input">
      <Input search v-model="formCustom.loginName" placeholder="输入登录手机号" clearable @on-search="seachUser" style="width: 300px; padding-left: 10px" />
      <Button class="margin-left-gutter" type="warning" @click="seachUser">{{ $t('v2_1.inquire') }}</Button>
    </div>

    <Table :height="320" border ref="selection" :columns="tableCol" :data="table" class="send-table" @on-selection-change="onSelectChange" />
    <Page class="table-page" size="small" @on-change="pageNum => (page.pageNum = pageNum)" @on-page-size-change="pageSize => (page.pageSize = pageSize)" show-sizer show-total :current.sync="page.pageNum || 1" :page-size="page.pageSize || 10" :total="page.total" show-elevator :page-size-opts="[10, 50, 100]"></Page>
    <div slot="footer">
      <Button style="display: none" @click="visible = false">{{ $t('utils.cancel') }}</Button>
      <Button :loading="loading" type="primary" @click="submitSend" :disabled="!(selectData && selectData.length)">{{ $t('utils.confirm') }}</Button>
    </div>
  </Modal>
</template>
<script>
import { couponMessageUserList } from '@/api/marketingActivities/couponManagement.js'

export default {
  props: {
    //  弹框标题
    title: {
      type: [Number, String],
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.value,
      submitPopup: false,
      loading: false,
      groudLoading: false,
      //  传递进来的数据
      params: undefined,
      formCustom: {
        loginName: ''
      },
      //  传进来的回调函数
      callback: undefined,
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        dataSource: []
      },
      tableCol: [
        {
          title: this.$t('v2_1.operating'),
          type: 'selection',
          align: 'center',
          width: 60
        },
        {
          title: this.$t('v1.nickname'),
          align: 'center',
          Width: 220,
          key: 'nickname'
        },
        {
          title: this.$t('v1.opinionPhoneNumber'),
          align: 'center',
          Width: 220,
          key: 'loginName'
        }
      ],
      //  选中的号码
      selectData: []
    }
  },
  computed: {
    table() {
      return this.page.dataSource
    },
    ...window.Vuex.mapState({
      businessLine: (state, getter) => getter.enumStateArr('basic-common', 'businessLine'),
      tagClassifyOps: (state, getter) => getter.enumStateArr('warehouse', 'tagClassify')
    }),
    businessLineList() {
      return [...this.tagClassifyOps.filter(e => e.code === 'public'), ...this.businessLine]
    }
  },
  watch: {
    value(val) {
      this.visible = val
      if (!val) {
        this.$nextTick(() => {
          this.params = undefined
          this.callback = undefined
          this.sendType = '1'
          this.page.pageNum = 1
          this.page.pageSize = 10
          this.page.total = 1
          this.page.dataSource = []
          this.formCustom.loginName = ''
          this.selectData = []
        })
      } else {
        this.getCouponMessageUserList()
      }
    },
    visible(val) {
      this.$emit('input', val)
    },
    ['page.pageNum'](val, oldVal) {
      this.getCouponMessageUserList()
    },
    ['page.pageSize'](val, oldVal) {
      this.getCouponMessageUserList()
    }
  },
  methods: {
    getLabel(val) {
      return `${val}${this.$t('v1.semicolon')}`
    },
    seachUser() {
      if (this.page.pageNum === 1) {
        this.getCouponMessageUserList()
      } else {
        this.page.pageNum = 1
      }
    },
    onSelectChange(selection) {
      this.selectData = selection
    },
    //  查询会员列表
    async getCouponMessageUserList() {
      if (this.visible) {
        try {
          //查询时清空之前已选择列表
          const res = await couponMessageUserList({
            loginName: this.formCustom.loginName,
            pageSize: this.page.pageSize,
            pageNum: this.page.pageNum
          })
          const list = res.data && res.data.list || []
          this.page.total = (res.data && res.data.total) || 0
          this.page.dataSource = list.map(e =>
            Object.assign(e, {
              _checked: !!this.selectData.find(q => q.loginName === e.loginName),
              _disabled: false
            })
          )
        } catch (err) {}
      }
    },
    submitSend() {
      this.$emit('selectItem', this.selectData)
      this.visible = false
    }
  }
}
</script>

<style scoped lang="stylus">
.send-modal >>> .ivu-modal-body {
  max-height: 600px !important;
}

.send-modal-main {
  text-align: center;

  .margin-right-gutter {
    margin: 10px 0;
  }

  .form-site {
    width: 100%;
  }
}

.manual-coupon-input {
  display: flex;
  padding: 10px 0;
}

.userType-model {
  & >>> .ivu-btn {
    position: relative;
    margin: 10px 10px 0 0;

    &:hover .ivu-icon-ios-close {
      background-color: #f39322;
      color: #fff;
    }
  }

  & >>> .ivu-icon-ios-close {
    position: absolute;
    top: -9px;
    right: -9px;
    width: 18px;
    height: 18px;
    background-color: #dcdee2;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.2s linear;
  }
}
</style>
