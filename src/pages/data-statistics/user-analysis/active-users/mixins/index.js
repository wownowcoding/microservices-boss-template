import { getActiveUserReportStatic, getActiveUserReportByStickness } from '@/api/data-statistics/user-analysis'
import { getDayxAxisWithX, getDayxAxis } from '@/utils/echarts-help'
import Util from '@/utils/util.js'

export default {
  created() {
    
  },

  computed: {
    resetProps() {
      const date = Util.getDateStartEnd(7, false)
      date[0] = date[0].valueOf() + 60 * 60 * 1000
      date[1] = date[1].valueOf() + 60 * 60 * 1000
      return {
        displayType: 10,
        queryType: 1,
        staticType: 10,
        rangeTime: date,
        startDate: date[0],
        endDate: date[1]
      }
    }
  },

  data() {
    return {
      loading: false,
    }
  },

  mounted() {
    this.initDate()
  },
  
  methods: {
    initDate() {
      this.$nextTick(() => {
        const date = Util.getDateStartEnd(7, false)
        if (Util.getTimezone() === 8) {
          date[0] = date[0].valueOf() + 60 * 60 * 1000
          date[1] = date[1].valueOf() + 60 * 60 * 1000
        }
        console.log(date)
        // const result = this.timeHandle(date)
    
        setTimeout(() => {
          this.$refs.vipayEcharts.outSetForm({
            rangeTime: date,
            startDate: date[0],
            endDate: date[1]
          })
          this.$refs.vipayEcharts.handleSearch()
        })
      })
    },
    timeHandle(arr, format = 'DD/MM/YYYY') {
      return Util.timeRangeHandle(arr, format)
    },
    getParams() {
      const e = this.$refs.vipayEcharts
      return e.getParams()
    },
    handleSearch(params) {
      const { form } = params
      const { startDate, endDate, displayType, staticType, queryType } = form
      const result = this.timeHandle([startDate, endDate])
      if (!startDate || !endDate) {
        return this.$Message.error(this.$t('v4_1_1.theStatisticalTimePeriodCannotBeEmpty'))
      }
      if (!queryType) {
        return this.$Message.error(this.$t('scriptv1.c47a555fb47d7ba5aa6fbe5441c1da35e'))
      }
      if (!displayType) {
        return this.$Message.error(this.$t('v4_1_1.impressionTypeCannotBeEmpty'))
      }
      if (!staticType) {
        return this.$Message.error(this.$t('v4_1_1.statisticalDimensionCannotBeEmpty'))
      }
      console.log('startDate: ', new Date(result[0]))
      console.log('endDate: ', new Date(result[1]))

      form.startDate = result[0]
      form.endDate = result[1]
      form.staticType = staticType
      this.params = form
      this.displayType = displayType

      this.getStatistcData(form)
    },
    getStatistcData(params) {
      const { startDate, endDate, displayType, staticType } = params
      const queryType = this.queryType
      const action = queryType === 1 ? getActiveUserReportStatic : getActiveUserReportByStickness
      // getActiveUserReportByStickness
      console.log("queryType", queryType)
      console.log("displayType", displayType)
      this.loading = true
      action({
        startDate,
        endDate,
        staticType
      })
        .then(res => {
          if (res.rspCd !== '00000') return
          let { data } = res
          data = data.map(e => {
            return {
              ...e,
              date: this._handleDateFormat(e.date),
              num: e.activeUserNum || e.userStickyRate || 0
            }
          })
          console.log(data)
          if (displayType === 10) {
            const xAxisData = data.map(e => e.date)
            const seriesData = data.map(e => e.num)
            const tooltip = this.getToolTip(queryType)
            const series = this.getSeries(queryType)
            const formatter = this.queryType === 1 ? '{value}' : '{value}%'
            const yAxis = { type: 'value', min: 0, max: 10, minInterval: 1, axisLabel: { formatter } }
            this.setEcharts(xAxisData, seriesData, tooltip, series, yAxis)
          } else if (displayType === 11) {
            const list = data.map(e => {
              return {
                ...e,
                date: e.date
              }
            })
            this.table.cols = this.queryType === 1 ? this.queryTypeOneCol : this.queryTypeTwoCol
            this.setTableData(list)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    _handleDateFormat(date) {
      const dateList = date.split('/').map(e => {
        return this._toDDMMYYYY(e).join('/')
      })
      return dateList.join('-')
    },
    _toDDMMYYYY(date) {
      // eslint-disable-next-line no-unused-vars
      const [year, mm, dd] = date.split('-')
      return [dd, mm, year]
    },
    getSeries(queryType) {
      if (queryType === 2) {
        return [
          {
            name: this.$t('scriptv1.userStickinessValue'),
            data: [],
            type: 'line'
          }
        ]
      }
      return [
        {
          name: this.$t('平台活跃用户数（人）'),
          data: [],
          type: 'line'
        }
      ]
    },
    getToolTip(queryType) {
      const toolTipObj = {
        show: true,
        trigger: 'axis',
        axisPointer: {},
      }
      // 黏性值
      if (queryType === 2) {
        toolTipObj.formatter = (params) => {
          const item = params[0]
          const { axisValueLabel, data } = item
          return `
            <h3>${axisValueLabel}</h3>
            <div>${this.$t('v4_1_1.viscosityValue')}: ${data}%</div>
          `
        }
      } else {
        toolTipObj.formatter = (params) => {
          const item = params[0]
          const { axisValueLabel, data } = item
          return `
            <h3>${axisValueLabel}</h3>
            <div>${this.$t('平台活跃用户数（人）')}: ${data}${this.$t('v4_1_1.people')}</div>
          `
        }
      }
      console.log(toolTipObj)
      return toolTipObj
    },
    setEcharts(xAxisData, seriesData, tooltip, series, yAxis) {
      this.$nextTick(() => {
        setTimeout(() => {
          const ops = this.echartsOps
          ops.xAxis.data = xAxisData
          ops.tooltip = tooltip
          ops.series = series
          ops.series[0].data = seriesData
          ops.yAxis = yAxis
          let yMax = Math.ceil(Math.max(...seriesData, 5))
          ops.yAxis.max = yMax
          this.$refs.vipayEcharts.setEchartsOptions(ops)
        })
      })
    },
    setTableData(data) {
      this.$set(this.table, 'data', data)
    },
  }
}