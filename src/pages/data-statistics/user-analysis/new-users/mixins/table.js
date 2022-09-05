import { getNewUserReportStaticUrl } from '@/api/data-statistics/user-analysis'

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
          url: getNewUserReportStaticUrl,
          fileName: this.$t('v4_1_1.newUserReport'),
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
            key: 'date'
          },
          {
            title: this.$t('scriptv1.a3f19bcb3dfbbff1b6b2c8235f10014b4'),
            align: 'center',
            key: 'num',
            execlRender: row => String(row.num)
          }
        ],
        page: {
          pageNum: 1,
          pageSize: 10,
          total: 100
        },
        data: []
      },
    }
  }
}