import { getNewUserReportStatic } from '@/api/data-statistics/user-analysis'
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
        rangeType: 1,
        displayType: 10,
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
      const { startDate, endDate, displayType, rangeType } = form
      const result = this.timeHandle([startDate, endDate])
      if (!startDate || !endDate) {
        return this.$Message.error(this.$t('v4_1_1.theStatisticalTimePeriodCannotBeEmpty'))
      }
      if (!displayType) {
        return this.$Message.error(this.$t('v4_1_1.impressionTypeCannotBeEmpty'))
      }
      if (!rangeType) {
        return this.$Message.error(this.$t('v4_1_1.statisticalDimensionCannotBeEmpty'))
      }
      console.log('startDate: ', new Date(result[0]))
      console.log('endDate: ', new Date(result[1]))

      form.startDate = result[0]
      form.endDate = result[1]
      this.params = form
      this.displayType = displayType

      this.getStatistcData(form)
    },
    getStatistcData(params) {
      const { startDate, endDate, displayType } = params
      this.loading = true
      getNewUserReportStatic({
        startDate,
        endDate
      })
        .then(res => {
          if (res.rspCd !== '00000') return
          const { data } = res
          const { xAxisData, seriesVal } = this.getxAxisAndSeriesData(data)
          // 图表
          if (displayType === 10) {
            this.setEcharts(xAxisData, seriesVal)
          } else if (displayType === 11) {
            console.log('设置表格属性')
            const list = xAxisData.map((e, i) => {
              return {
                date: e,
                num: seriesVal[i]
              }
            })
            this.setTableData(list)
            // this.setTableData(data.map(e => {
            //   return {
            //     date: this._handleDateFormat(e.date),
            //     num: e.num
            //   }
            // }))
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    getxAxisAndSeriesData(data) {
      const params = this.getParams()
      const { form } = params
      const { rangeType, startDate, endDate } = form
      const [s, e] = this.timeHandle([startDate, endDate], 'DD/MM/YYYY')
      console.log('startDate: ' + s)
      console.log('endDate: ' + e)
      switch (rangeType) {
        // 按天
        case 1:
          return this.getDayEchartsOps(data)
        // 按7天
        case 2:
          return this.getSevenDayEchartsOps(data)
        // 按30天
        case 3:
          return this.getThirtyDayEchartsOps(data)
      }
    },
    getDayEchartsOps(data) {
      const xAxisData = data.map(e => this._handleDateFormat(e.date))
      const seriesVal = data.map(e => e.num)
      return { xAxisData, seriesVal }
    },
    getSevenDayEchartsOps(data) {
      return this._reduceNumByDistance(data, 7)
    },
    getThirtyDayEchartsOps(data) {
      return this._reduceNumByDistance(data, 30)
    },
    _reduceNumByDistance(data, distance) {
      let len = data.length
      let count = 0
      let val = 0
      let range = []
      let s = null
      let e = null
      while(len > 0) {
        let item = data[len - 1]
        val += item.num

        if (count === 0) {
          e = item.date
        }

        count++

        if (count === distance || len - 1 === 0) {
          s = item.date
          range.push({ date: `${s}:${e}`, num: val })
          count = 0
          val = 0
          s= null
          e = null
        }
        len--
      }
      const xAxisData = range.map(e => this._handleDateFormat(e.date, true)).reverse()
      const seriesVal = range.map(e => e.num).reverse()
      return { xAxisData, seriesVal }
    },
    _handleDateFormat(date, hasStart = false) {
      if (hasStart) {
        const [start, end] = date.split(':')
        return this._toDDMMYYYY(start).join('/') + '-' + this._toDDMMYYYY(end).join('/')
      }
      return this._toDDMMYYYY(date).join('/')
    },
    _toDDMM(date) {
      // eslint-disable-next-line no-unused-vars
      const [year, mm, dd] = date.split('-')
      return [dd, mm]
    },
    _toDDMMYYYY(date) {
      const [year, mm, dd] = date.split('-')
      return [dd, mm, year]
    },
    setEcharts(xAxisData, seriesData) {
      this.$nextTick(() => {
        setTimeout(() => {
          const ops = this.echartsOps
          ops.xAxis.data = xAxisData
          ops.series[0].data = seriesData
          let yMax = Math.max(...seriesData, 5)
          // console.log('yMax', yMax)
          // if (yMax !== 5) {
          //   // 75 / 10 = 7.5 
          //   // 取整得7 + 1 = 8
          //   // 于是得到80
          //   yMax = (parseInt(yMax / 10) + 2) * 10
          // }
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