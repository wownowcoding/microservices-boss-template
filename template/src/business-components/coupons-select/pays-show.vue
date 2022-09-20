<template>
  <Modal v-model="visible" width="64vw">
    <div style="width:100%;min-height:300px;">
      <InfoItem :config="infoArr" :data="data" />
    </div>
    <div slot="footer">
      <Button @click="handleCancel">{{ this.$t('operation.cancel') }}</Button>
      <Button type="primary" :disabled="disabled" @click="detail">{{ this.$t('v2_1_1.details') }}</Button>
    </div>
  </Modal>
</template>

<script>
import { api, wownowCouponDetail } from '@/api/marketingActivities/couponManagement.js';
import InfoItem from '@/components/common/InfoItem/index';

export default {
  props: {
    value: {
      type: [Boolean, Number, String],
      default: false
    },
    couponId: {
      type: String
    }
  },
  data() {
    return {
      visible: this.value,
      data: {
        paymentItem: []
      },
      infoArr: [
        { name: this.$t('v4_1_1.PaymentVoucher') + 'ID', key: 'couponNo' },
        { name: this.$t('v4_1_1.PaymentVoucherName'), key: 'couponName' },
        { name: this.$t('v4_1_1.PaymentVoucherType'), key: 'couponType', render: (h, params) => h('div', this.couponMarketingTypeEnum(params.couponType)) },
        { name: this.$t('v1.PaymentVoucherQuota'), key: 'reduceAmountUsd', render: (h, params) => h('div', params.reduceAmountUsd ? this.Util.money(params.reduceAmountUsd) : '') },
        { name: this.$t('v8_1_1.paymentVoucherValidityPeriod'),render: (h, params) => h('div', this.effectiveInfo(params)) },
        {
          name: this.$t('v2_1.sponsorship'), key: 'couponName', render: (h, params) => {
            return h('div', params.paymentItem.map(item => {
              return h('div', this.businessTypeEnum(item))
            }))
          }
        },
        { name: this.$t('v2_1.couponInstructionZh'), key: 'descriptionZh' },
        { name: this.$t('v2_1.couponInstructionEn'), key: 'descriptionEn' },
        { name: this.$t('v2_1.couponInstructionKh'), key: 'descriptionCb' },
      ]
    }
  },
  computed: {
    ...Vuex.mapState({
      couponMarketingTypeEnum: (state, getter) => getter.enumGetter('marketing', 'couponMarketingType'),
      couponMarketingType: (state, getter) => getter.enumStateArr('marketing', 'couponMarketingType'),
      businessType: (state, getter) => getter.enumStateArr('marketing', 'paymentType'),
      businessTypeEnum: (state, getter) => getter.enumGetter('marketing', 'paymentType'),
      marketingType: (state, getter) => getter.enumStateArr('marketing', 'marketingType'),
      marketingTypeEnum: (state, getter) => getter.enumGetter('marketing', 'marketingType'),
    })
  },
  methods: {
    // 有效期类型
    effectiveInfo(data) {
      let {
        beginDate, effectiveType, endDate, fixedBeginTerm, fixedTerm
      } = data
      return effectiveType === 11 ? `${this.$t('v2_1.afterReceiving')}${fixedTerm}${this.$t('v2_1.days')}${this.$t('v2_1.effective')}` : `${beginDate} - ${endDate} ${this.$t('v2_1.effective')}`
    },
    handleCancel() {
      this.visible = false
    },
    detail() {
      this.$router.push({
        path: '/payment-voucher/payment-voucher-manage/detail',
        query: {
          couponNo: this.couponId
        }
      })
    },
    async ajaxQueryDetail() {
      let { rspCd, data } = await api({
        couponNo: this.couponId
      }, wownowCouponDetail)
      if (rspCd + '' === '00000') {
        this.data = data
      }
    },
    getLabel(val) {
      return `${val}${this.$t('v1.semicolon')}`;
    }
  },
  watch: {
    couponId() {
      if (this.couponId) {
        this.ajaxQueryDetail()
      }
    },
    value: {
      immediate: true,
      handler(val) {
        this.visible = val
      }
    },
    visible: {
      immediate: true,
      handler(val) {
        this.$emit('input', val)
      }
    },
  },
  components: { InfoItem }
}
</script>
