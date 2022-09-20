<template>
  <div id="app"><router-view /></div>
</template>

<script>
import { Notification } from 'element-ui'

export default {
  mounted() {
    if (!window.routerErrorCallBack) {
      const that = this
      window.routerErrorCallBack = function() {
        if (that.isTip) return false
        that.isTip = true
        Notification({
          title: '版本已更新，请稍后再试...',
          duration: 3000,
          type: 'warning'
        })
        setTimeout(() => {
          that.isTip = false
        }, 3000)
      }
    }
  }
}
</script>
