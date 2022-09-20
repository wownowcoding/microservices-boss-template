
<style lang="stylus" scoped>
.edition-file {
  width: 100%;
}
</style>
<template>
  <div class="edition-file">
    <Upload ref="upload" name="file" :headers="headers" :on-remove="handleRemove" :with-credentials="true" :default-file-list="defaultList" :on-success="handleSuccess" :format="['apk']" :on-format-error="handleFormatError" :on-error="error" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :action="fileUrl + '?group=app'">
      <Button :disabled="btndisabled" type="success" icon="ios-cloud-upload-outline">{{ $t('part_second.Upload_Packet_Files') }}</Button>
    </Upload>
  </div>
</template>

<script>
import config from '@/config'
import Store from '@/utils/store'
import { upload } from '@/api/file'

export default {
  name: 'edition-file',
  data() {
    return {
      defaultList: [],
      imgUrl: '',
      visible: false,
      uploadList: [],
      fileUrl: upload,
      token: '',
      fileName: '',
      btndisabled: false
    }
  },
	computed: {
		headers() {
			const sessionId = Store.loadObject('sessionId')
			const __headers = { sessionId };
			if (!!this.watermark) {
				__headers.watermark = this.watermark;
			}
			return __headers;
		}
	},
  props: {
		watermark: {
			type: [Number, String, Boolean, Object],
			default() {
				return false;
			}
		},
    limit: {
      type: Number,
      default: 1
    },
    getFilePath: {},
    defaultFile: {
      type: String
    },
    imgUpdate: ''
  },
  watch: {
    defaultFile(val) {
      if (!val) {
        return
      }
      this.btndisabled = true
      this.defaultList = [
        {
          url: val
        }
      ]
      this.uploadList = this.defaultList
    }
  },
  created() {
    // 处理初始化图片
    if (this.defaultFile) {
      this.btndisabled = true
      this.defaultList = [
        {
          url: this.defaultFile
        }
      ]
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    error(res) {
      // 上传失败~请重新上传~
      this.$Message.error(this.$t('tips.upload_fail'))
      this.btndisabled = false
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      let filePaths = this.$refs.upload.fileList.map(item => {
        return item.url
      })
      this.uploadList = filePaths
      // 通知父组件
      this.getFilePath('')
      this.btndisabled = false
    },
    handleSuccess(res, file) {
      this.fileName = file.name
      if (res.rspCd === '00000') {
        let filePath = res.data
        this.getFilePath(filePath)
      } else {
        this.$Message.error(res.rspInf)
      }
    },
    handleFormatError(file) {
      // 文件格式不对 格式不对, 请选择 包文件
      this.$Notice.warning({
        title: '文件格式不对 格式不对, 请选择 包文件'
        // desc: this.$t('tips.file') + ' ' + file.name + this.$t('tips.file_fomat_refuse_tips') + '.'
      })
      this.btndisabled = false
    },
    async handleBeforeUpload() {
      this.btndisabled = true
      if (this.limit === 1) {
        // 图片限制只有1张的情况
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(0, 1)
      } else {
        const check = this.uploadList.length < this.limit
        if (!check) {
          this.$Notice.warning({
            // 超过限制
            title: this.$t('tips.over_limit')
          })
        }
        return check
      }
    },
    handleMaxSize(file) {
      // 文件大小超出限制
      // 文件太大, 不要超过 2M.
      this.$Notice.warning({
        title: this.$t('tips.file_over'),
        desc: '文件太大, 不要超过 20M.'
      })
      this.btndisabled = false
    }
  }
}
</script>
