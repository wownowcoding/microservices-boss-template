<template>
  <Modal v-model="visible" :title="title" :loading="loading" :mask-closable="false">
    <Form ref="form" :model="model" :rules="rules">
      <FormItem prop="emailList" :label="$t('v3_1_1.receivingMailbox')">
        <Input style="margin-bottom: 6px;" v-for="(item, index) in model.emailList" :key="index" v-model.trim="model.emailList[index]" />
      </FormItem>
      <Button type="primary" @click="handleAddEmail">{{$t('v3_1_1.addTo')}}</Button>
    </Form>
    <div slot="footer">
      <Button @click="handleCancel">{{$t('operation.cancel')}}</Button>
      <Button type="primary" :loading="loading" @click="handleFinish">{{$t('operation.sure')}}</Button>
    </div>
  </Modal>
</template>
<script>
import Store from '@/utils/store'

const storeKey = 'email-history'

export default {
  name: 'ReceiveEmailDialog',
  props: {
    title: {
      type: String,
      default: '导出'
    },
    value: {
      type: [Boolean, Number, String],
      default: false
    },
    resetForm: {
      type: Boolean,
      default: true
    },
    autoRevoke: {
      type: Boolean,
      default: true,
    },
    // 是否记住上次填写的邮箱（本地缓存）
    remember: {
      type: Boolean,
      default: true
    },
    apiFun: {
      type: Function
    },
    paramsFun: {
      type: Function
    },
    successCb: {
      type: Function
    },
    failCb: {
      type: Function
    },
    checkEmailList: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.visible = val
      }
    },
    visible: {
      immediate: true,
      handler(val) {
        this.$emit('input', val)
      }
    },
  },
  created() {
    if (this.remember) {
      this.getRememberList()
    }
  },
  data() {
    return {
      model: {
        emailList: [''],
      },
      rules: {
        emailList: [
          { 
            validator: (rules, value, cb) => {
              if (!value || value.length === 0) {
                return cb(new Error(this.$t('v3_1_1.e-mailCanNotBeEmpty')))
              }
              const testReg = /^[.a-zA-Z0-9_-]+@[.a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
              if (value.some(str => str && testReg.test(str) === false)) {
                return cb(new Error(this.$t('v3_1_1.pleaseFillInTheCorrectEmailAddress')))
              }
              cb()
            }
          }
        ]
      },
      visible: this.value,
      loading: false,
    }
  },
  methods: {
    getRememberList() {
      const { name } = this.$route
      if (!name) return
      let cache = Store.loadObject(storeKey) || {}
      if (cache[name] && cache[name].length) {
        this.model.emailList = cache[name]
      }
    },
    reset() {
      this.$refs['form'].resetFields()
    },
    handleCancel() {
      this.visible = false
      this.reset()
    },
    handleFinish() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let emailList = this.model.emailList.filter(i => !!i)
          if (this.checkEmailList && !emailList.length) {
            this.$Message.warning(this.$t('v2_1_1.pleaseInputAEmail'))
            return 
          }
          if (this.$route.name) {
            let history = Store.loadObject(storeKey) || {}
            history[this.$route.name] = emailList
            Store.saveObject(storeKey, history)
          }
          this.$emit('on-change', emailList)
          if (this.autoRevoke) {
            this.goRevoke()
          } else {
            this.visible = false
          }
        }
      })
    },
    goRevoke() {
      if (!this.apiFun) {
        return console.error('[API Fun 为空]')
      }
      if (!this.paramsFun) {
        return console.error('[Params Fun 为空]')
      }
      const data = this.paramsFun()
      this.loading = true
      this.apiFun(data)
        .then(res => {
          if (this.successCb) {
            this.successCb(res)
          }
          const { rspCd } = res
          this.visible = false
          if (rspCd === '00000') {
            if (this.resetForm) {
              this.model.emailList = ['']
            }
          }
        })
        .catch(e => {
          if (this.failCb) {
            this.failCb(e)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleAddEmail() {
      this.model.emailList.push('')
    }
  }
};
</script>
