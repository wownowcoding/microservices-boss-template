<template>
  <div class="DownloadLink-wrapper" @click="handleDownload">
    <slot />
  </div>
</template>
<script>
import postDownload from '@/components/DownloadLink/postDownload';
import Store from '@/utils/store'
import { api, download } from '@/api/file'
import config from '@/config'
export default {
  data() {
    const sessionId = Store.loadObject('sessionId')
    return {
      downloadUrl: config.fileUrl + download,
      downloadFileName: '',
      downloadParams: { sessionId }
    }
  },
  props: {
    // 接口地址
    url: {
      type: String
    },
    // 参数
    params: {
      default: () => { return {} },
    },
    // 缺省文件名
    fileName: {
      type: String
    },
  },
  methods: {
    _getParams() {
      return this.params instanceof Function ? this.params() : this.params
    },
    async handleDownload() {
      // 先获取文件名和文件的下载地址
      let res = await api(this._getParams(), this.url);
      if (res.rspCd === "00000") {
        let { url, groupId, fileName } = res.data
        this.downloadFileName = fileName || this.fileName
        this.downloadParams = {
          fileName,
          url: `${config.fileDisplayURL}/${groupId}/${url}`
        }
        // 去文件服务器下载文件
        postDownload(this.downloadUrl, this.downloadParams, this.downloadFileName)
      }
    },
  }
};
</script>
<style lang="stylus" scoped>
.DownloadLink-wrapper
  display inline-block
</style>
