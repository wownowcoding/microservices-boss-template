<template>
  <Modal class="notificationDialog" width="1180px" v-model="visible">
    <Notification ref="notification" @saveAction="saveAction"></Notification>
    <div slot="footer" style="text-align: center;">
      <Button @click="hide">{{$t('operation.cancel')}}</Button>
      <Button type="primary" :loading="saveLoading" @click="save">{{$t('btn.submit')}}</Button>
    </div>
  </Modal>
</template>

<script>
import Notification from '@/business-components/notification/notification'

export default {
  data(){
    return {
      visible: false,
      saveLoading: false
    }
  },
  methods: {
    show(params, saveCallback) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.notification.setParamsUrl(params, () => {
          this.hide()
          saveCallback && saveCallback()
        }, () => {
          this.hide()
        })
      })
    },
    hide() {
      this.visible = false
    },
    save() {
      this.$refs.notification.saveAction()
    },
    saveAction(v) {
      this.saveLoading = v
    }
  },
  components: {
    Notification
  }
}
</script>
<style lang="stylus" scoped>
.notificationDialog{
  & >>> .pub_btns{
    display: none;
  }
  & >>> .ivu-modal-body {
    max-height: 540px !important;
  }
}
</style>
