<template>
  <div>
    <VipayEcharts
      ref="vipayEcharts"
      style="width: 100%"
      :queryList="queryList"
      :table="table"
      :displayType="displayType"
      :echartsOps="echartsOps"
      :labelWidth="100"
      :loading="loading"
      :resetProps="resetProps"
      :statisticsTitle="statisticsTitle"
      :statisticsDesc="statisticsDesc"
      @handleSearch="handleSearch"
      :execlOptions="execlOptions"
      @resetForm="handleResetForm"
    >
      <div slot="queryType" slot-scope="scope">
        <div>
          <span v-for="bt in scope.row.options" :key="bt.code">
            <Button
              style="margin-right: 10px;"
              :type="queryType === bt.code ? 'primary' : ''"
              @click="handleActiveClick(bt.code)"
            >{{bt.message}}</Button>
            <Tooltip placement="top" max-width="700" v-if="bt.tips" :content="bt.tips">
              <Icon type="md-help-circle" />
            </Tooltip>
          </span>
        </div>
      </div>
    </VipayEcharts>
  </div>
</template>

<script>
import queryListMixin from './mixins/queryList'
import tableMixin from './mixins/table'
import indexMixin from './mixins/index'
import VipayEcharts from '@/business-components/vipayEcharts'
import { unit } from '@/utils/echarts-help'
import Vue from 'vue'

export default {
  mixins: [indexMixin, queryListMixin, tableMixin],

  components: {
    VipayEcharts
  },

  computed: {
    statisticsTitle () {
      const { startDate, endDate } = this.params
      if (startDate && endDate) {
        const [s, e] = this.timeHandle([startDate, endDate])
        const totalDay = Math.ceil((e - s) / unit)
        return this.$t('v4_1_1.activeUser') + ' | ' + totalDay + this.$t('v4_1_1.sky')
      }
      return this.$t('v4_1_1.activeUser')
    },
    statisticsDesc () {
      const { startDate, endDate } = this.params
      if (startDate && endDate) {
        const style = 'DD/MM/YYYY'
        const [s, e] = this.timeHandle([startDate, endDate])
        const totalDay = Math.ceil((e - s) / unit)
        const start = Vue.filter('DateFormat')(s, style)
        const end = Vue.filter('DateFormat')(e, style)
        return `${start} - ${end} | ${this.$t('v4_1_1.past')}${totalDay}${this.$t('v4_1_1.sky')}`
      }
      return this.$t('-')
    }
  },

  data () {
    return {
      model: {},
      myChart: null,
      showEcharts: true,
      showTable: false,
      queryType: 1,
      displayType: 10,
      params: {},
      echartsOps: {
        legend: {
          show: true
        },
        dataZoom: [
          {
            show: true,
            type: 'inside',
            start: 0,
            end: 100,
            height: 24,
            bottom: 0,
            contactLabel: false,
          }
        ],
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {},
          formatter: (params) => {
            const item = params[0]
            const { axisValueLabel, data } = item
            return `
              <h3>${axisValueLabel}</h3>
              <div>${this.$t('平台活跃用户数（人）')}: ${data}${this.$t('v4_1_1.people')}</div>
            `
          }
        },
        grid: {
          bottom: 110,
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: 45,
          },
          data: []
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 10,
          minInterval: 1
        },
        series: [
          {
            name: this.$t('scriptv1.addd2d2844ff579ce2ce1711a355f2aae'),
            data: [],
            type: 'line'
          }
        ]
      }
    }
  },

  watch: {
    queryType (val) {
      if (val && val === 2) {
        setTimeout(() => {
          this.$refs.vipayEcharts.outSetFormItem('staticType', 10)
        }, 60)
      }
    }
  },


  methods: {
    handleActiveClick (val) {
      this.queryType = this.queryType === val ? '' : val
    },
    handleResetForm () {
      this.queryType = 1
    }
  }
}
</script>

<style>
</style>