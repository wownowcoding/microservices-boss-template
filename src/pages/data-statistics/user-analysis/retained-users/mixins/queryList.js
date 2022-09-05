import { echartDisplayTypeOps } from '@/business-components/vipayEcharts/common/index'

export default {
  computed: {
    queryList() {
      return [
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
          value: 11,
          type: 'button-list',
          options: () => [...echartDisplayTypeOps].filter(e => e.code === 11)
        }
      ]
    }
  }
}