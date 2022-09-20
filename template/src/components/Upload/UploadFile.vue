<template>
  <div class="upload upload-dsfhsdhfls">
    <Poptip v-if="isSwitched" trigger="hover" v-show="!isManual">
      <div slot="content">
        <p class="toops-click" @click="isManual = true">{{ $t('v3_1_1.manualInput') }}</p>
      </div>
      <Upload
        ref="upload"
        :show-upload-list="false"
        :headers="headers"
        :data="params"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="format"
        :max-size="maxSize"
        :on-progress="onUploadProgress"
        :on-format-error="handleFormatError"
        :on-error="error"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        :action="fileUrl"
      >
        <Button class="margin-bottom-gutter" v-if="!$slots.default" :disabled="btnDisabled || disabled" type="success" icon="ios-cloud-upload-outline">{{ btnName || $t('btn.upload_file') }} </Button>
        <slot />
      </Upload>
    </Poptip>
    <Poptip v-if="isSwitched" trigger="hover" v-show="isManual">
      <div slot="content">
        <p class="toops-click" @click="isManual = false">{{ $t('v3_1_1.toolUpload') }}</p>
      </div>
      <Input v-model="manualValue" />
    </Poptip>
    <Upload v-if="!isSwitched" ref="upload" :show-upload-list="false" :headers="headers" :data="params" :default-file-list="defaultList" :on-success="handleSuccess" :format="format" :max-size="maxSize" :on-progress="onUploadProgress" :on-format-error="handleFormatError" :on-error="error" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :action="fileUrl">
      <Button class="margin-bottom-gutter" v-if="!$slots.default" :disabled="btnDisabled || disabled" type="success" icon="ios-cloud-upload-outline">{{ btnName || $t('btn.upload_file') }} </Button>
      <slot />
    </Upload>
    <div class="tips-text">
      <slot name="tips"></slot>
    </div>
    <slot name="info" />
    <div v-show="uploadList.length > 0 && showUploadList && !hasShowVideo">
      <component :is="imgDisplayMode ? 'uploadImgList' : 'uploadFileList'" class="download-list-comp" :fileInfo="fileInfo" :fileNote="fileNote" :uploadList="uploadList" :handleInfo="handleInfo" :handleRemove="handleRemove" />
    </div>
    <div class="video-wrapper" v-if="uploadList.length && value.length && hasShowVideo">
      <Button style="margin-bottom: 10px" @click="removeVideo">{{ $t('v3_1_1.deleteVideo') }}</Button>
      <p>{{ value[0].name }}</p>
      <video :src="value[0].url" controls></video>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import { upload } from '@/api/file'
import uploadFileList from './uploadFileList.vue'
import uploadImgList from './uploadImgList.vue'
import Store from '@/utils/store'

export default {
  name: 'upload_file',
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
      showVideoEl: false,
      manualValue: typeof this.value === 'string' && this.value || Array.isArray(this.value) && this.value[0] && this.value[0].url || this.value.url || ''
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
      typr: Boolean,
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
      default: true
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
    },
    onFormatError: {
      type: Function,
      default: null
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
    handleInfo(file) {
      this.$emit('itemInfoClick', file)
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
    handleRemove(file) {
      if (!this.disabled) {
        this.$emit('onRemove')
        // todo 有问题
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
        // 通知父组件
        this.setModelValue(this.$refs.upload.fileList)
      }
    },
    handleSuccess(res, file, fileList) {
      this.isUploading = false
      if (res.rspCd === '00000') {
        let filePath = res.data
        file.url = filePath
        this.manualValue = filePath;
        // 上传成功更新 token
        // this.getToken()
        this.setModelValue(this.$refs.upload.fileList)
        this.$emit('success', this.$refs.upload.fileList)
      } else {
        this.$Message.error(res.rspInf)
      }
    },
    removeVideo() {
      this.setModelValue(this.$refs.upload.fileList.slice(1))
    },
    handleFormatError(file) {
      if (this.onFormatError) {
        this.onFormatError(file)
      } else {
        this.$Message.error(file.name + this.$t('tips.invalid_file_type'))
      }
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
      const [type, subType] = file.type.split('/')
      let { width, height } = this.pictureResolution
      // 分辨率 检查
      if (type === 'image') {
        this.showVideoEl = false
        let url = URL.createObjectURL(file)
        let image = new Image()
        image.src = url
        const _this = this
        let p1 = () => {
          return new Promise((resolve, reject) => {
            image.onload = function () {
              let imageWidth = image.width
              let imageHeight = image.height
              if (imageWidth <= parseInt(width) && imageHeight <= parseInt(height)) {
                resolve()
              } else {
                reject()
                _this.$Message.error({
                  content:
                    file.name +
                    _this.$t('kingKongAndBarNav.uploadFilePictureResolutionSize', {
                      width,
                      height
                    }),
                  duration: 5
                })
              }
            }
          })
        }
        return p1()
      }
      if (type === 'video') {
        this.showVideoEl = true
      } else {
        this.showVideoEl = false
        return Promise.resolve()
      }
    },
    onUploadProgress() {
      this.isUploading = true
    }
  },
  components: { uploadFileList, uploadImgList }
}
</script>

<style lang="stylus" scoped>
.tips-text {
  color: #999;
  font-size: 12px;
  line-height: 1.25;
  margin-top: 6px;
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
