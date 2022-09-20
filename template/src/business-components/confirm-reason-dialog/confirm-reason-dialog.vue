<template>
  <Modal v-model="visible" :title="title" :loading="loading">
    <div>
      <Form ref="form" :model="form" :rules="ruleValidate">
        <Render v-if="render" :render="render" />
        <FormItem prop="msg">
          <p>{{description}}</p>
          <Input v-model.trim="form.msg" type="textarea" />
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button @click="handleCancel">{{$t('operation.cancel')}}</Button>
      <Button type="primary" @click="handleFinish">{{$t('operation.sure')}}</Button>
    </div>
  </Modal>
</template>
<script>
import Render from './Render';
export default {
  name: 'ConfirmReasonDialog',
  components: { Render },
  data() {
    return {
      title: this.$t('utils.confirm'),
      description: this.$t('marketing.tips_reason'),
      render: null,
      form: {
        msg: '',
      },
      ruleValidate: {
        msg: [{ required: true, message: this.$t('tips.required'), triiger: 'blur' }]
      },
      visible: false,
      loading: false,
      _resolve: null,
      _reject: null,
    }
  },
  methods: {
    reset() {
      this.render = null
      this.$refs['form'].resetFields()
    },
    confirm(params = {}) {
      const { title, description, render } = params
      this.reset()
      if (title) {
        this.title = title
      }
      if (description) {
        this.description = description
      }
      if (render) {
        this.render = render
      }
      this.visible = true

      // 用于处理confirm的promise
      const promise = new Promise((resolve, reject) => {
        this._resolve = resolve
        this._reject = reject
      })
      return promise
    },
    handleCancel() {
      this.visible = false
      //  reset
      this.reset()
      this._reject(this.form)
    },
    handleFinish() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this._resolve(this.form)
          this.visible = false
        }
      })
    },
  }
};
</script>
