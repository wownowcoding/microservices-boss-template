<template>
  <Modal v-model="visible"  width="88vw" class="coupons-select">
    <VipayTable :labelWidth="88" :queryList="queryList" :table="table" auth @handleSearch="handleSearch" />
    <div slot="footer">
      <Button @click="handleCancel">{{ $t('operation.cancel') }}</Button>
      <Button type="primary" :disabled="disabled" @click="confirm">{{ $t('operation.sure') }}</Button>
    </div>
  </Modal>
</template>
<script>
import VipayTable from '@/components/VipayTable'
import { queryAssociationTaskList} from '@/api/customerCenter/taskCenter.js'

export default {
  props: {
    value: {
      type: [Boolean, Number, String],
      default: false
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    querys: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: this.value,
      disabled: true,
      queryList: [
        {
          type: 'text',
          label: this.$t('v9_2_1.nameOfActivity'),
          key: 'activityName'
        },
        {
          type: 'text',
          label: this.$t('v9_2_1.taskName'),
          key: 'taskNameZh'
        },
        {
          type: 'text',
          label: this.$t('v9_2_1.idOfActivity'),
          key: 'activityNo'
        },
        {
          type: 'text',
          label: this.$t('v9_2_1.idOfTask'),
          key: 'taskNo'
        },

      ],
      table: {
        height: 'auto',
        page: {
          total: 0,
          pageNum: 1,
          pageSize: 10
        },
        cols: [
          {
            title: this.$t('utils.selection'),
            minWidth: 80,
            align: 'center',
            fixed: 'left',
            render: (h, params) => {
              let self = this
              return h('div', [
                h(
                  'Checkbox',
                  {
                    props: {
                      value: params.row._checked
                    },
                    on: {
                      'on-change': value => {
                        self.handleSelectOne(value, params.index)
                      }
                    }
                  },
                  ''
                )
              ])
            }
          },
          {
            title: this.$t('v9_2_1.idOfActivity'),
            minWidth: 180,
            align: 'center',
            key: 'activityNo'
          },
          {
            title: this.$t('v9_2_1.nameOfActivity'),
            minWidth: 110,
            align: 'center',
            key: 'activityName',
            render: (h, { row }) => {
            return (
              <div>
                <p>{row['activityName'+this.locationLanguage]}</p>
              </div>
            )
            }
          },
           {
            title: this.$t('v9_2_1.activityTime'),
            minWidth: 150,
            align: 'center',
            key: 'activityStartTime',
            render: (h, { row }) => {
              return h('span', this.moment(row.activityStartTime).format('YYYY-MM-DD')+'~'+this.moment(row.activityEndTime).format('YYYY-MM-DD'))
            }
          },
           {
            title: this.$t('v9_2_1.businessLine'),
            minWidth: 110,
            align: 'center',
            key: 'organizer',
            execlRender: row => this.taskOrganizerEnum(row.organizer),
            render: (h, params) => h('div', this.taskOrganizerEnum(params.row.organizer))
          
          },
          
           {
            title: this.$t('v9_2_1.idOfTask'),
            minWidth: 110,
            align: 'center',
            key: 'taskNo'
          },
           {
            title: this.$t('v9_2_1.taskName'),
            minWidth: 110,
            align: 'center',
            key: 'taskName',
            render: (h, { row }) => {
              return (
                <div>
                  <p>{row['taskName'+this.locationLanguage]}</p>
                </div>
            )
            }
          },
            {
            title: this.$t('v9_2_1.targetOfTask'),
            minWidth: 130,
            align: 'center',
            key: 'baseRuleNameList',
            render: (h, { row }) => h('div', row.baseRuleNameList.map((e, index) => {
              return h('p', `${index+1}.${e}`)
            }))
          },
   
        ]
      }
    }
  },
  mounted() {
    this.handleSearch()
  },
  computed: {
     businessLineDataSource() {
      return this.$store.getters.enumGetter('basic-common', 'businessLineDataSource')
    },
    ...window.Vuex.mapState({
       taskOrganizerEnum: (state, getter) => getter.enumGetter('marketing', 'taskOrganizer'),
      couponMarketingType: (state, getter) => getter.enumStateArr('marketing', 'marketingType'),
      businessType: (state, getter) => getter.enumStateArr('marketing', 'paymentType').filter(e => e.code && e.message),
      businessTypeEnum: (state, getter) => getter.enumGetter('marketing', 'paymentType'),
      marketingType: (state, getter) => getter.enumStateArr('marketing', 'marketingType'),
      marketingTypeEnum: (state, getter) => getter.enumGetter('marketing', 'marketingType')
    }),
     locationLanguage() {
      return {
        'zh': 'Zh',
        'en': 'En',
        'km': 'Kh'
      }[this.$i18n.locale]
    },
  },
  methods: {
    handleSearch(params = {}) {
      const { form = {}, page = { pageNum: 1, pageSize: 10 } } = params
      this.ajaxQueryList({
        ...form,
        ...page
      })
    },
    // 查询列表
    async ajaxQueryList(params = {}) {
      this.table.loading = true
      let { rspCd, data } = await queryAssociationTaskList({ ...params })
      this.table.loading = false
      if (rspCd + '' === '00000') {
        this.$set(
          this.table,
          'data',
          data.list.map(item => {
            return { ...item, _checked: false }
          })
        )
        this.$set(this.table.page, 'total', data.total)
      }
    },
    confirm() {
      const selectItem = []
      for (let i = 0; i < this.table.data.length; i++) {
        if (this.table.data[i]._checked) {
          selectItem.push({
            ...this.table.data[i]
          })
        }
      }
      this.$emit('selectItem', selectItem)
      this.handleCancel()
    },
    handleCancel() {
      this.clearAllChecked()
      this.visible = false
    },
    handleSelectOne(value, index) {
      // 单选
      if (this.isRadio) {
        for (let i = 0; i < this.table.data.length; i++) {
          this.table.data[i]._checked = false
        }
        this.table.data[index]._checked = true
        this.disabled = !value
      } else {
        // 多选，只需要选了一个就可以confirm
        this.table.data[index]._checked = value
        let selectCount = this.table.data.filter(e => !!e._checked).length
        this.disabled = selectCount <= 0
      }
    },
    clearAllChecked() {
      if (this.table.data) {
        this.table.data.forEach(item => {
          item._checked = false
        })
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.visible = val
        if (this.value) {
          this.disabled = true
        }
      }
    },
    visible: {
      immediate: true,
      handler(val) {
        this.$emit('input', val)
      }
    }
  },
  components: {
    VipayTable
  }
}
</script>
<style lang="stylus" scoped>
.coupons-select{
  & >>> .ivu-modal-body{
    max-height: 72vh !important;
  }
}
</style>
