export default {
  data() {
    return {
      data: [],
      page: { pageNum: 1, pageSize: 10, total: 0 },
      loading: false
    }
  },
  computed: {
    table() {
      return {
        cols: [{
          title: this.$t('v1.creationTime'),
          key: 'createTime',
          minWidth: 120,
          align: 'center',
          render: (h, { row }) => h('div', Vue.filter('Date')(row.createTime))
        }, {
          title: `${this.$t('v2_1_1.advertising')}ID`,
          minWidth: 160,
          align: 'center',
          key: 'popNo'
        }, {
          title: this.$t('v2_1_1.adHeadline'),
          minWidth: 220,
          align: 'center',
          key: 'popName'
        }, {
          title: this.$t('v2_1_1.scheduledTime'),
          key: 'beginTime',
          minWidth: 220,
          align: 'center',
          render: (h, { row }) => row.beginTime && row.endTime && h('div', Vue.filter('DateFormat')(row.beginTime, 'DD/MM/YYYY HH:mm') + '-' + Vue.filter('DateFormat')(row.endTime, 'DD/MM/YYYY HH:mm')) ||
            row.beginTime && h('div', Vue.filter('DateFormat')(row.beginTime, 'DD/MM/YYYY HH:mm')) || h('div', '-')
        },
        {
          title: this.$t('v2_1_1.actualDeliveryTime'),
          key: 'realBeginTime',
          minWidth: 220,
          align: 'center',
          render: (h, { row }) => row.realBeginTime && row.realEndTime && h('div', Vue.filter('DateFormat')(row.realBeginTime, 'DD/MM/YYYY HH:mm') + '-' + Vue.filter('DateFormat')(row.realEndTime, 'DD/MM/YYYY HH:mm')) ||
            row.realBeginTime && h('div', Vue.filter('DateFormat')(row.realBeginTime, 'DD/MM/YYYY HH:mm')) || h('div', '-')
        },
          {
            title: this.$t('v2_1_1.deliveryArea'),
            key: 'params.row.areaCodeList',
            minWidth: 140,
            align: 'center',
            render: (h, { row }) => {
              if (row.areaCodeList && row.areaCodeList.length) {
                return h('div', row.areaCodeList.map(e => {
                  if (e == 'all') return this.$t('v4_1_1.all')
                  return this.adsZoneEnum(e)
                }).join('、'))
              }
              return h('div', this.$t('v4_1_1.all'))
            }
        },
        {
          title: this.$t('v2_1_1.showFrequency'),
          minWidth: 80,
          align: 'center',
          render: (h, { row }) => h('div', this.popShowTypeEnum(row.showType))
        },
        {
          title: this.$t('utils.status'),
          key: 'state',
          minWidth: 80,
          align: 'center',
          render: (h, { row }) => h('div', this.activeStateEnum(row.state))
        },
        {
          // 操作
          title: this.$t('utils.operate'),
          key: 'operate',
          fixed: 'right',
          minWidth: 200,
          align: 'center',
          render: (h, { row }) => h('div', [{
            show: true,
            //  查看详情
            dom: h('Button', {
              ...this.Util['tableColBtnCfg'],
              on: {
                click: () => {
                  this.getDetail(row)
                }
              }
            }, this.$t('v1.viewDetails'))
          }, {
            show: row.state == 11,
            //  编辑
            dom: h('Button', {
              ...this.Util['tableColBtnCfg'],
              on: {
                click: () => {
                  this.getEdit(row)
                }
              }
            }, this.$t('v1.edit'))
          }, {
            show: row.state == 11,
            //  删除
            dom: h('Button', {
              ...this.Util['tableColBtnCfg'],
              on: {
                click: () => {
                  this.deleteItem(row)
                }
              }
            }, this.$t('v1.delete'))
          }, {
            show: row.state == 11,
            //  发布
            dom: h('Button', {
              ...this.Util['tableColBtnCfg'],
              on: {
                click: () => {
                  this.releaseItem(row)
                }
              }
            }, this.$t('v2_1_1.release'))
          }, {
            show: row.state == 10,
            //  提前结束
            dom: h('Button', {
              ...this.Util['tableColBtnCfg'],
              on: {
                click: () => {
                  this.endItem(row)
                }
              }
            }, this.$t('v2_1_1.anEarlyClosure'))
          }].filter(e => e.show).map(e => e.dom))
        }],
        page: this.page,
        data: this.data,
        loading: this.loading
      };
    }
  }
}
