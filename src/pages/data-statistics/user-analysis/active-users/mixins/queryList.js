import { echartDisplayTypeOps } from '@/business-components/vipayEcharts/common/index'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      staticTypeList: (state, getter) => getter.enumStateArr('warehouse', 'staticType'),
    }),
    queryList () {
      return [
        {
          label: this.$t('v4_1_1.activeType'),
          key: 'queryType',
          name: 'queryType',
          value: 1,
          options: [
            { code: 1, message: this.$t('v4_1_1.activity') },
            { code: 2, message: this.$t('v4_1_1.viscosityValue'), tips: this.$t('scriptv1.acb483135ed345784930b48af5065a86a', { label: this.$t('v4_1_1.viscosityValue') }) },
          ]
        },
        {
          label: this.$t('v4_1_1.statisticalDimension'),
          key: 'staticType',
          type: 'button-list',
          value: 10,
          options: () => {
            if (this.queryType === 2) {
              return this.staticTypeList.filter(e => e.code === 10)
            }
            return this.staticTypeList
          }
          // options: () => [
          //   { code: 10, message: this.$t('v4_1_1.byDay') },
          //   { code: 11, message: this.$t('scriptv1.by7Days') },
          //   { code: 12, message: this.$t('scriptv1.by30Days') },
          // ]
        },
        {
          label: this.$t('v4_1_1.statisticalTimePeriod'),
          key: 'rangeTime',
          type: 'dateRange',
          startDate: 'startDate',
          endDate: 'endDate',
          format: 'dd/MM/yyyy',
          pickerOptions: {
            disabledFuture: true
          }
        },
        {
          label: this.$t('v4_1_1.displayType'),
          key: 'displayType',
          value: 10,
          type: 'button-list',
          options: () => [...echartDisplayTypeOps]
        }
      ]
    }
  }
}