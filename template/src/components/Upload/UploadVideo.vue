<template>
  <div class="upload upload-dsfhsdhfls">
    <Upload ref="upload" 
      :show-upload-list="showUploadList" 
      :on-preview="onPreview" 
      :headers="headers" 
      :data="params" 
      :default-file-list="defaultList" 
      :on-success="handleSuccess" 
      :format="format" 
      :max-size="maxSize" 
      :on-progress="onUploadProgress" 
      :on-format-error="handleFormatError" 
      :on-error="error"
      :on-remove="onRemove" 
      :on-exceeded-size="handleMaxSize" 
      :before-upload="handleBeforeUpload" 
      :action="fileUrl"
    >
      <Button :loading="isUploading" class="margin-bottom-gutter" v-if="!$slots.default" :disabled="btnDisabled || disabled" type="success" icon="ios-cloud-upload-outline">{{ btnName || $t('btn.upload_file') }} </Button>
      <slot />
      <slot name="tip" slot="tip" />
    </Upload>
  </div>
</template>

<script>
import { upload } from '@/api/file'
import Store from '@/utils/store'

export default {
  name: 'UploadVideo',
  data() {
    const group = this.group
    return {
      isManual: false,
      imgUrl: '',
      visible: false,
      mounted: false,
      token: '',
      fileUrl: `${upload}?group=${group}`,
      fileName: '',
      isUploading: false,
      manualValue: typeof this.value === 'string' && this.value || Array.isArray(this.value) && this.value[0] && this.value[0].url && this.value[0].url || this.value && this.value.url || ''
    }
  },
  props: {
    //  是否可以切换成输入框
    isSwitched: {
      type: Boolean,
      default: () => false
    },
		watermark: {
			type: [Number, String, Boolean, Object],
			default() {
				return false;
			}
		},
    disabled: {
      type: Boolean,
      default: () => false
    },
    fileNote: {
      type: String,
      default: '添加备注'
    },
    // 备注： fileInfo 用来确定是否显示 uploadImgList组件里面的 Icon
    fileInfo: {
      type: Boolean,
      default: false
    },

    pictureResolution: {
      type: Object,
      default: function () {
        return { width: 3000, height: 3000 }
      }
    },
    format: {
      default: () => ['doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png']
    },
    maxSize: {
      default: 5 * 1024
    },
    imgDisplayMode: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 1
    },
    value: {
      // type: Array,
      default: () => []
    },
    // 上传文件的指定分组
    group: {
      type: String,
      default: 'boss'
    },
    fileNameKey: {
      type: String,
      default: 'name'
    },
    fileUrlKey: {
      type: String,
      default: 'url'
    },
    showUploadList: {
      type: Boolean,
      default: false
    },
    btnName: {
      type: String,
      default: ''
    },
    hasShowVideo: {
      type: Boolean,
      default: false
    },
    paramsObj: {
      type: Object,
    }
  },
  model: {
    prop: 'value',
    event: 'setModelValue'
  },
  created() {
    // this.getToken()
  },
  computed: {
    params() {
      if (this.paramsObj) return { group: this.group, ...this.paramsObj }
      return { group: this.group }
    },
		headers() {
			const sessionId = Store.loadObject('sessionId')
			const __headers = { sessionId };
			if (this.watermark) {
				__headers.watermark = this.watermark;
			}
			return __headers;
		},
    defaultList() {
      let list = this.value || []

      return list.map(item => {
        const isObject = this.Util.isType('Object')
        const name = isObject(item) ? item[this.fileNameKey] : 'unknown'
        const url = isObject(item) ? item[this.fileUrlKey] : item
        return { name, url }
      })
    },
    btnDisabled() {
      // 上传时或大于上传限制时禁用按钮
      return this.isUploading || this.uploadList.length >= this.limit
    },
    uploadList() {
      if (this.mounted) {
        return this.$refs.upload.fileList
      } else {
        return []
      }
    }
  },
  watch: {
    manualValue(val) {
      if (this.isSwitched) {
        if (val && /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(val)) {
          const name = val.split('/');
          this.setModelValue([{
            url: val,
            name: name[name.length - 1].indexOf('.') === -1 && val || name[name.length - 1]
          }]);
        } else {
          this.$emit('input', val);
        }
      }
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    onRemove(file, fileList) {
      this.setModelValue(fileList)
    },
    onPreview(file) {
      if (file && file.url) {
        this.$Modal.info({
          closable: true,
          render: (h) => {
            return <video src={file.url} controls></video>
          }
        })
      }
    },
    setModelValue(items) {
      this.$emit(
        'setModelValue',
        items.map(item => {
          return {
            [this.fileNameKey]: item.name,
            [this.fileUrlKey]: item.url
          }
        })
      )
    },
    error(res) {
      // 上传失败~请重新上传~
      this.isUploading = false
      this.$Message.error(this.$t('tips.upload_fail'))
    },
    handleSuccess(res, file, fileList) {
      if (this.uploadEvent) {
        this.uploadEvent.percent = 100
      }
      this.isUploading = false
      if (res.rspCd === '00000') {
        let filePath = res.data
        file.url = filePath
        this.manualValue = filePath;
        // 上传成功更新 token
        // this.getToken()
        let list = this.$refs.upload.fileList
        let target = list[list.length - 1]
        if (this.width && this.height) {
          target.url = target.url + `?WxH=${parseInt(this.width)}x${parseInt(this.height)}`
          this.width = 0
          this.height = 0
        }
        this.setModelValue(this.$refs.upload.fileList)
        this.$emit('success', this.$refs.upload.fileList)
      } else {
        this.$Message.error(res.rspInf)
      }
    },
    handleFormatError(file) {
      this.$Message.error(file.name + this.$t('tips.invalid_file_type'))
    },
    handleMaxSize(file) {
      const [type, subType] = file.type.split('/')
      this.isUploading = false
      let size = this.maxSize <= 1024 ? `${this.maxSize}KB` : `${(this.maxSize / 1024).toFixed(0)}MB`
      this.$Message.error({
        content: this.$t('tips.upload_type_limit', {
          // size: `${this.maxSize}${(this.maxSize <= 1024 && 'KB') || 'MB'}`,
          size,
          type: `(${this.format.join(',')})`
        }),
        duration: 5
      })
    },
    handleBeforeUpload(file) {
      this.maxPercent = Math.floor(Math.random() * 10) + 85 
      const [type, subType] = file.type.split('/')
      // 分辨率 检查
      if (type === 'video') {
        return new Promise((resolve, reject) => {
          const videoUrl = URL.createObjectURL(file)
          const videoEl = document.createElement('video')
          videoEl.onloadeddata = (ev) => {
            URL.revokeObjectURL(videoUrl)
            this.width = videoEl.videoWidth
            this.height = videoEl.videoHeight
            resolve();
          }
          videoEl.src = videoUrl
          videoEl.load()
        })
      }
    },
    onUploadProgress(e, file, fileList) {
      if (e.percent > this.maxPercent) {
        e.percent = this.maxPercent
      }
      this.uploadEvent = e
      this.isUploading = true
    }
  },
}
</script>

<style lang="stylus" scoped>
.tips-text {
  color: #999;
  font-size: 12px;
  line-height: 1.25;
}
.download-list-comp {
  width: 400px;
}

.video-wrapper {
  margin: 10px 0;
  width: 300px;
  text-align: right;
}
.toops-click {
  cursor pointer
  text-align center
}
</style>

<style lang="stylus">
  .ivu-form-item-error {
    .ivu-upload {
      width:102px
      border: 1px solid red;
      text-align: left;
      height: auto;
      line-height: 1;
    }
  }
</style>
