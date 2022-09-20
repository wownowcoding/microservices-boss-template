<!--
 * @Description:
 * @Author: 黄博方
 * @Date: 2018-11-20 11:12:35
 * @LastEditors: 黄博方
 * @LastEditTime: 2019-02-22 18:26:31
 -->
<template>
  <div v-loading="loading" class="DownloadLink-wrapper" @click="handleDownload">
    <slot />
  </div>
</template>
<script>
import postDownloadFn from './postDownload.js'

export default {
  name: 'DownloadLink',
  props: {
    validator: {
      type: Function,
      default: () => true
    },
    url: {
      type: String
    },
    params: {
      default: () => {
        return {}
      }
    },
    methods: {
      type: String,
      default: 'post'
    },
    fileName: {
      type: String
    },
    isLoading: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      loading: false,
      iframeId: 'download_Iframe'
    }
  },
  computed: {
    isPostReq() {
      return this.methods == 'post'
    }
  },
  methods: {
    _getParams() {
      return this.params instanceof Function ? this.params() : this.params
    },
    handleDownload() {
      if (this.validator && this.validator(this._getParams())) {
        try {
          this.loading = true
          this.$emit('is-loading', true)
          this.isPostReq ? this.postDownload() : this.getDownload()
        } catch (e) {
          this.$Message.error(`${this.$t('utils.download')}${this.$t('utils.exception')}`)
        }
        this.loading = false
        setTimeout(() => {
          this.$emit('is-loading', false)
        }, 500)
      }
    },
    postDownload() {
      try {
        postDownloadFn(this.url, this._getParams(), this.fileName)
      } catch (e) {
        this.$Message.error(`${this.$t('utils.download')}${this.$t('utils.exception')}`)
      }
    },
    getDownload() {
      let iframe = document.querySelector(`#${this.iframeId}`)
      if (!!!iframe) {
        iframe = document.createElement('iframe')
        iframe.id = this.iframeId
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
      }
      iframe.src = `${this.url}${this.url.indexOf('?') > -1 ? '&' : '?'}${this.getParamsStr()}`
    },
    getParamsStr() {
      let obj = this._getParams()
      const params = []
      Object.keys(obj).forEach(key => {
        let value = obj[key]
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
          value = ''
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='))
      })
      return params.join('&')
    }
  }
}
</script>
<style lang="stylus" scoped>
.DownloadLink-wrapper
    display inline-block
</style>
