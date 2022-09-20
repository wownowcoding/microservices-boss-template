<template>
  <Modal v-model="visible" :title="$t('v3_1_1.configureCoupons')" width="88vw" class="coupons-select">
    <VipayTable :labelWidth="88" :queryList="queryList" :table="table" auth @handleSearch="handleSearch" />
    <div slot="footer">
      <Button @click="handleCancel">{{ $t('operation.cancel') }}</Button>
      <Button type="primary" :disabled="disabled" @click="confirm">{{ $t('operation.sure') }}</Button>
    </div>
  </Modal>
</template>
<script>
import VipayTable from '@/components/VipayTable'
import { wownowCouponList } from '@/api/marketingActivities/couponManagement.js'

export default {
  props: {
    value: {
      type: [Boolean, Number, String],
      default: false
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    querys: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: this.value,
      disabled: true,
      queryList: [
        {
          type: 'text',
          label: `${this.$t('v3_1_1.coupon')}ID`,
          key: 'couponNo'
        },
        {
          type: 'text',
          label: `${this.$t('v2_1.couponName')}`,
          key: 'couponName'
        },
        {
          type: 'select',
          label: `${this.$t('v1.couponType')}`,
          key: 'couponType',
          options: () => this.marketingType.filter(e => [15, 34].indexOf(e.code) !== -1)
        },
        {
          type: 'select',
          label: `${this.$t('v2_1.sponsorship')}`,
          key: 'paymentType',
          options: () => this.businessType
        }
      ],
      table: {
        height: 'auto',
        page: {
          total: 0,
          pageNum: 1,
          pageSize: 10
        },
        cols: [
          {
            title: this.$t('utils.selection'),
            minWidth: 80,
            align: 'center',
            fixed: 'left',
            render: (h, params) => {
              let self = this
              return h('div', [
                h(
                  'Checkbox',
                  {
                    props: {
                      value: params.row._checked
                    },
                    on: {
                      'on-change': value => {
                        self.handleSelectOne(value, params.index)
                      }
                    }
                  },
                  ''
                )
              ])
            }
          },
          {
            title: `${this.$t('v2_1.couponID')}`,
            minWidth: 180,
            align: 'center',
            key: 'couponNo'
          },
          {
            title: this.$t('v1.couponName'),
            minWidth: 110,
            align: 'center',
            key: 'couponName'
          },
          {
            title: this.$t('v1.sponsorship'),
            minWidth: 80,
            align: 'center',
            key: 'paymentTypeList',
            render: (h, params) => {
              if (params.row.paymentTypeList) {
                return h(
                  'div',
                  params.row.paymentTypeList.map(item => {
                    return h('div', this.businessTypeEnum(item))
                  })
                )
              }
            }
          },
          {
            title: this.$t('v2_1.couponType'),
            minWidth: 80,
            align: 'center',
            key: 'couponType',
            render: (h, params) => {
              return h('div', this.marketingTypeEnum(params.row.couponType))
            }
          },
          {
            title: this.$t('v1.couponQuota'),
            minWidth: 100,
            align: 'center',
            key: 'reduceAmountUsd',
            render: (h, { row }) => {
              return h('span', row.reduceAmountUsd ? this.Util.money(row.reduceAmountUsd.amount) : '')
            }
          },
          {
            title: this.$t('marketing.storage_amount'),
            minWidth: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.remainNum === null ? 0 : params.row.remainNum)
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.handleSearch()
  },
  computed: {
    ...window.Vuex.mapState({
      couponMarketingType: (state, getter) => getter.enumStateArr('marketing', 'marketingType'),
      businessType: (state, getter) => getter.enumStateArr('marketing', 'paymentType').filter(e => e.code && e.message),
      businessTypeEnum: (state, getter) => getter.enumGetter('marketing', 'paymentType'),
      marketingType: (state, getter) => getter.enumStateArr('marketing', 'marketingType'),
      marketingTypeEnum: (state, getter) => getter.enumGetter('marketing', 'marketingType')
    })
  },
  methods: {
    handleSearch(params = {}) {
      const { form = {}, page = { pageNum: 1, pageSize: 10 } } = params
      this.ajaxQueryList({
        ...form,
        ...page
      })
    },
    // 查询列表
    async ajaxQueryList(params = {}) {
      this.table.loading = true
      params.availableState = 10
      params.auditState = 11
      if (this.querys) {
        Object.keys(this.querys).forEach(key => {
          const val = this.querys[key]
          params[key] = val
        })
      }
      let { rspCd, data } = await wownowCouponList(params)
      this.table.loading = false
      if (rspCd + '' === '00000') {
        this.$set(
          this.table,
          'data',
          data.list.map(item => {
            return { ...item, _checked: false }
          })
        )
        this.$set(this.table.page, 'total', data.total)
      }
    },
    confirm() {
      const selectItem = []
      for (let i = 0; i < this.table.data.length; i++) {
        if (this.table.data[i]._checked) {
          selectItem.push({
            ...this.table.data[i]
          })
        }
      }
      this.$emit('selectItem', selectItem)
      this.handleCancel()
    },
    handleCancel() {
      this.clearAllChecked()
      this.visible = false
    },
    handleSelectOne(value, index) {
      // 单选
      if (this.isRadio) {
        for (let i = 0; i < this.table.data.length; i++) {
          this.table.data[i]._checked = false
        }
        this.table.data[index]._checked = true
        this.disabled = !value
      } else {
        // 多选，只需要选了一个就可以confirm
        this.table.data[index]._checked = value
        let selectCount = this.table.data.filter(e => !!e._checked).length
        this.disabled = selectCount <= 0
      }
    },
    clearAllChecked() {
      if (this.table.data) {
        this.table.data.forEach(item => {
          item._checked = false
        })
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.visible = val
        if (this.value) {
          this.disabled = true
        }
      }
    },
    visible: {
      immediate: true,
      handler(val) {
        this.$emit('input', val)
      }
    }
  },
  components: {
    VipayTable
  }
}
</script>
<style lang="stylus" scoped>
.coupons-select{
  & >>> .ivu-modal-body{
    max-height: 72vh !important;
  }
}
</style>
