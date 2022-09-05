import { echartDisplayTypeOps } from '@/business-components/vipayEcharts/common/index'

export default {
  computed: {
    queryList() {
      return [
        {
          label: this.$t('v4_1_1.statisticalDimension'),
          key: 'rangeType',
          type: 'button-list',
          value: 1,
          options: () => [
            { code: 1, message: this.$t('v4_1_1.byDay') },
            { code: 2, message: this.$t('scriptv1.weekly') },
            { code: 3, message: this.$t('scriptv1.monthly') },
          ]
        },
        {
          label: this.$t('v4_1_1.statisticalTimePeriod'),
          key: 'rangeTime',
          type: 'dateRange',
          startDate: 'startDate',
          endDate: 'endDate',
          format: 'dd/MM/yyyy'
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