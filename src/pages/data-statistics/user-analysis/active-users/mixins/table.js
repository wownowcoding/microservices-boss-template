import { getActiveUserReportStaticUrl, getActiveUserReportBySticknessUrl } from '@/api/data-statistics/user-analysis'

export default {
  computed: {
    excelParams() {
      const { startDate, endDate, staticType } = this.params
      return {
        startDate,
        endDate,
        staticType
      }
    },
    execlOptions() {
      return {
        execl: {
          titles: (this.queryType === 1 ? this.queryTypeOneCol : this.queryTypeTwoCol).map(e => {
            const ret = { title: e.title };
            if (e.key) {
              ret.key = e.key;
            }
            if (e.execlRender) {
              ret.render = e.execlRender;
            }
            return ret;
          }),
          url: this.queryType === 1 ? getActiveUserReportStaticUrl : getActiveUserReportBySticknessUrl,
          fileName: this.$t('scriptv1.activeUserReport'),
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
    },
    queryTypeOneCol() {
      return [
        { title: this.$t('v4_1_1.date'), align: 'center', key: 'date' },
        { title: this.$t('scriptv1.c8eededca22c7b3499973354ddc08e668'), align: 'center', key: 'num', execlRender: row => String(row.activeUserNum) }
      ]
    },
    queryTypeTwoCol() {
      return [
        { title: this.$t('v4_1_1.date'), align: 'center', key: 'date' },
        { title: this.$t('v4_1_1.viscosityValue'), align: 'center', key: 'num', 
          render: (h, { row }) => <span>{((row.num) || 0) + '%'}</span>, 
          execlRender: row => (String(row.userStickyRate) || 0) + '%' 
        }
      ]
    }
  },

  data() {
    return {
      table: {
        loading: false,
        cols: this.queryTypeOneCol,
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