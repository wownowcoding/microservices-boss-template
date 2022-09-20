<template>
  <Modal v-model="visible" :title="$t('scriptv1.businessAccount')" width="800">
    <div>
      <VipayTable class="account-list-table" :table="table" auth @handleSearch="handleSearch">
        <span slot="customTitle">{{ $t('v4_1_1.businessType') }} ：{{ businessLineLabel }}</span>
        <div slot="tableButton">
          <Button type="primary" icon="md-add" class="margin-right-gutter" @click="addFormVisible = true">{{ $t('scriptv1.addAccount') }}</Button>
        </div>
      </VipayTable>
      <Modal v-model="addFormVisible" :title="$t('scriptv1.businessAccount')" width="400">
        <Form ref="formRef" :label-width="80" :model="model" :rules="rules" label-position="right">
          <FormItem :label="$t('v4_1_1.businessType')" prop="businessLine">{{ businessLineLabel }}</FormItem>
          <FormItem :label="$t('part_second.channel')" prop="paymentChannel">
            <Select class="form-input-width" v-model="model.paymentChannel">
              <Option v-for="item in channelList" :key="item.code" :label="item.code" :value="item.code"></Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('system.account')" prop="payAccount">
            <Input v-model="model.payAccount" />
          </FormItem>
          <FormItem :label="$t('utils.name')" prop="payAccountName">
            <Input v-model="model.payAccountName" />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button @click="cancelAddAccount">{{ $t('operation.cancel') }}</Button>
          <Button type="primary" @click="handleOnAddAccount" :loading="loading">{{ $t('operation.sure') }}</Button>
        </div>
      </Modal>
    </div>
    <div slot="footer">
    </div>
  </Modal>
</template>


<script>
import VipayTable from '@/components/VipayTable'
import { getAccountList, addAccount, removeAccount } from '@/api/orderManagement/refundManagement.js'
import { getTransactionChannel } from '@/api/orderManagement/refundManagement.js'

export default {
  
  components: {
    VipayTable
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    businessLine: {
      type: [String, Number],
      default: ''
    }
  },

  computed: {
    businessLineLabel() {
      if (this.businessLine) {
        return this.businessLineEnum(this.businessLine)
      }
      return ''
    },
    ...window.Vuex.mapState({
      businessLineEnum: (state, getter) => getter.enumGetter('basic-common', 'businessLine')
    })
  },

  watch: {
    value(val) {
      this.visible = val
    },
    visible(val) {
      this.$emit('input', val)
    },
    businessLine: {
      immediate: true,
      handler(val) {
        this.model.businessLine = val
      }
    }
  },

  data() {
    return {
      visible: this.value,
      addFormVisible: false,
      model: {},
      loading: false,
      channelList: [],
      rules: {
        businessLine: [{ required: true, message: this.$t('tips.required') }],
        paymentChannel: [{ required: true, message: this.$t('tips.required') }],
        payAccount: [{ required: true, message: this.$t('tips.required') }],
        payAccountName: [{ required: true, message: this.$t('tips.required') }]
      },
      table: {
        page: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          loading: false
        },
        data: [],
        cols: [
          { title: this.$t('part_second.channel'), align: 'center', key: 'paymentChannel' },
          { title: this.$t('system.account'), align: 'center', key: 'payAccount' },
          { title: this.$t('utils.name'), align: 'center', key: 'payAccountName' },
          {
            title: this.$t('utils.operate'),
            align: 'center',
            render: (h, params) => {
              const { paymentAccountNo } = params.row
              const onClickSelect = () => {
                this.$emit('on-select', { ...params.row })
                this.visible = false
              }
              const onClickRemove = () => {
                removeAccount({ paymentAccountNo }).then(res => {
                  if (res.rspCd === '00000') {
                    this.$Message.success(this.$t('tips.successful_operation'))
                    this.getList()
                  }
                })
              }
              return (
                <div>
                  <Button style="color: #f39322;" type="text" onClick={onClickSelect}>
                    {this.$t('v4_1_1.choose')}
                  </Button>
                  <Button type="text" onClick={onClickRemove}>
                    {this.$t('operation.delete')}
                  </Button>
                </div>
              )
            }
          }
        ]
      }
    }
  },

  created() {
    this.getList()
    this.getChannel()
  },

  methods: {
     getChannel() {
      getTransactionChannel()
        .then(res => {
          if(res.rspCd === '00000') {
            this.channelList = res.data.map(e => {
              return {
                code: e,
                message: e
              }
            })
          }
        })
    },
    getList() {
      this.table.page.loading = true
      getAccountList()
        .then(res => {
          this.table.data = res.data.list
          this.table.page.total = res.data.total
        })
        .finally(() => {
          this.table.page.loading = false
        })
    },
    handleOnAddAccount() {
      this.$refs.formRef.validate().then(flag => {
        if (!flag) {
          return
        }
        this.loading = true
        const body = { ...this.model, businessLine: this.businessLine }
        addAccount(body)
          .then(res => {
            console.log(res)
            this.$Message.success(this.$t('tips.successful_operation'))
            this.addFormVisible = false
            this.model = {
              businessLine: this.businessLine
            }
            this.getList()
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    cancelAddAccount() {
      this.addFormVisible = false
      this.model = {
        businessLine: this.businessLine
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.account-list-table {
  height: auto;

  >>> .ivu-table-wrapper {
    height: auto !important;
  }

  >>> .ivu-table-body {
    height: auto !important;
  }

  >>> .ivu-table-tip {
    height: auto !important;
  }

  >>> .ivu-table-tip td {
    height: auto !important;
  }
}
</style>