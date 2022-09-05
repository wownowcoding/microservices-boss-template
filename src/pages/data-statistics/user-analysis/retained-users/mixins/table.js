import { getRetainedUserUrl } from '@/api/data-statistics/user-analysis'

export default {
  computed: {
    excelParams() {
      const { startDate, endDate } = this.params
      return {
        startDate,
        endDate
      }
    },
    execlOptions() {
      return {
        execl: {
          titles: this.table.cols.map(e => {
            const ret = { title: e.title };
            if (e.key) {
              ret.key = e.key;
            }
            if (e.execlRender) {
              ret.render = e.execlRender;
            }
            return ret;
          }),
          url: getRetainedUserUrl,
          fileName: this.$t('scriptv1.retainedUserReport'),
          pageSize: 1000,
          getDataFromResponse: (data) => {
            return {
              list: data,
              pages: 0,
              total: data.length
            }
          },
        },
        params: this.excelParams
      }
    }
  },

  data() {
    return {
      table: {
        loading: false,
        cols: [
          {
            title: this.$t('v4_1_1.date'),
            align: 'center',
            key: 'date',
            // render: (h, { row }) => (this._toDDMMYYYY(row.date)),
            render: (h, { row }) => {
              let date = this._toDDMMYYYY(row.date).join('/')
              return <span>{date}</span>
            },
            execlRender: row => this._toDDMMYYYY(row.date).join('/')
          },
          {
            title: this.$t('scriptv1.afa50f7fcdcd32d1bf01a89a21adfaaa8'),
            align: 'center',
            key: 'newUserNum',
            render: (h, { row }) => {
              return <span>{row.newUserNum || 0}</span>
            },
            execlRender: row => String(row.newUserNum) || 0
          },
          {
            title: this.$t('v4_1_1.nextDay'),
            align: 'center',
            key: 'oneDayRemainNum',
            render: (h, { row }) => this.numAndRateRender(row.oneDayRemainNum, row.oneDayRemainRate),
            execlRender: (row) => this.numAndRateExcelRender(row.oneDayRemainNum, row.oneDayRemainRate)
          },
          {
            title: this.$t('scriptv1.day2'),
            align: 'center',
            key: 'twoDayRemainNum',
            render: (h, { row }) => this.numAndRateRender(row.twoDayRemainNum, row.twoDayRemainRate),
            execlRender: (row) => this.numAndRateExcelRender(row.twoDayRemainNum, row.twoDayRemainRate)
          },
          {
            title: this.$t('scriptv1.day3'),
            align: 'center',
            key: 'threeDayRemainNum',
            render: (h, { row }) => this.numAndRateRender(row.threeDayRemainNum, row.threeDayRemainRate),
            execlRender: (row) => this.numAndRateExcelRender(row.threeDayRemainNum, row.threeDayRemainRate)
          },
          {
            title: this.$t('scriptv1.day4'),
            align: 'center',
            key: 'fourDayRemainNum',
            render: (h, { row }) => this.numAndRateRender(row.fourDayRemainNum, row.fourDayRemainRate),
            execlRender: (row) => this.numAndRateExcelRender(row.fourDayRemainNum, row.fourDayRemainRate)
          },
          {
            title: this.$t('scriptv1.day5'),
            align: 'center',
            key: 'fiveDayRemainNum',
            render: (h, { row }) => this.numAndRateRender(row.fiveDayRemainNum, row.fiveDayRemainRate),
            execlRender: (row) => this.numAndRateExcelRender(row.fiveDayRemainNum, row.fiveDayRemainRate)
          },
          {
            title: this.$t('scriptv1.day6'),
            align: 'center',
            key: 'sixDayRemainNum',
            render: (h, { row }) => this.numAndRateRender(row.sixDayRemainNum, row.sixDayRemainRate),
            execlRender: (row) => this.numAndRateExcelRender(row.sixDayRemainNum, row.sixDayRemainRate)
          },
          {
            title: this.$t('scriptv1.day7'),
            align: 'center',
            key: 'sevenDayRemainNum',
            render: (h, { row }) => this.numAndRateRender(row.sevenDayRemainNum, row.sevenDayRemainRate),
            execlRender: (row) => this.numAndRateExcelRender(row.sevenDayRemainNum, row.sevenDayRemainRate)
          },
          {
            title: this.$t('scriptv1.15thDay'),
            align: 'center',
            key: 'fifteenDayRemainNum',
            render: (h, { row }) => this.numAndRateRender(row.fifteenDayRemainNum, row.fifteenDayRemainRate),
            execlRender: (row) => this.numAndRateExcelRender(row.fifteenDayRemainNum, row.fifteenDayRemainRate)
          },
          {
            title: this.$t('第30日'),
            align: 'center',
            key: 'thirtyDayRemainNum',
            render: (h, { row }) => this.numAndRateRender(row.thirtyDayRemainNum, row.thirtyDayRemainRate),
            execlRender: (row) => this.numAndRateExcelRender(row.thirtyDayRemainNum, row.thirtyDayRemainRate)
          },
        ],
        page: {
          pageNum: 1,
          pageSize: 10,
          total: 100
        },
        data: []
      },
    }
  },

  methods: {
    numAndRateRender(num, rate) {
      return <div>
        <p>{num || 0}</p>
        <p>{rate || 0}%</p>
      </div>
    },
    numAndRateExcelRender(num, rate) {
      return `${num || 0}  ${rate || 0}%`
    }
  }
}