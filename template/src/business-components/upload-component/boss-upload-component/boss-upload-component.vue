<template>
  <div class="upload">
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="format"
      :headers="headers"
      :data="params"
      :max-size="maxSize"
      :on-progress="onUploadProgress"
      :on-format-error="handleFormatError"
      :on-error="error"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :action="fileUrl"
    >
      <Button
        class="margin-bottom-gutter"
        v-if="!$slots.default"
        :disabled="btnDisabled || disabled"
        type="success"
        icon="ios-cloud-upload-outline"
      >
        {{ btnName }}
      </Button>
      <slot />
    </Upload>
    <slot name="info" />
    <div
      v-show="uploadList.length > 0 && showUploadList && !showVideoEl"
    >
      <component
        :is="imgDisplayMode ? 'UploadImgList' : 'UploadFileList'"
        class="download-list-comp"
        :fileInfo="fileInfo"
        :fileNote="fileNote"
        :uploadList="uploadList"
        :handleInfo="handleInfo"
        :handleRemove="handleRemove"
      />
    </div>
    <div
      class="video-wrapper"
      v-if="uploadList.length && value.length && showVideoEl && hasShowVideo"
    >
      <Button style="margin-bottom: 10px" @click="removeVideo">{{ $t('v3_1_1.deleteVideo') }}</Button>
      <video :src="value[0].url" controls />
    </div>
  </div>
</template>

<script>
import config from '@/config'
import UploadFileList from './components/upload-file-list'
import UploadImgList from './components/upload-img-list'
import Store from '@/utils/store'
import { get_upload_url } from '@/api/bizApiUtils';
import propsMixin from './mixins/props';
import { jsCrypto } from '@/utils/axios'

export default {
  name: 'upload_file',
  mixins: [propsMixin],
  data() {
    return {
      loading: false,
      imgUrl: '',
      mounted: false,
      fileName: '',
      fileUrl: get_upload_url('/file_web/file-service/file/upload.do'),
      params: { group: 'boss' },
      isUploading: false,
      showVideoEl: false
    }
  },
  model: {
    prop: 'value',
    event: 'setModelValue'
  },
  computed: {
		headers() {
			return { sessionId: Store.loadObject('sessionId') };
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
      return this.mounted && this.$refs.upload.fileList || [];
    }
  },
  mounted() {
    this.mounted = true;
  },
  methods: {
    handleInfo(file) {
      this.$emit('itemInfoClick', file)
    },
    setModelValue(items) {
      this.$emit(
        'setModelValue',
        items.map(item => ({
          [this.fileNameKey]: item.name,
          [this.fileUrlKey]: item.url
        }))
      )
    },
    error(res) {
      // 上传失败~请重新上传~
      this.isUploading = false
      this.$Message.error(this.$t('tips.upload_fail'))
    },
    handleRemove(file) {
      if (!this.disabled) {
        // todo 有问题
        this.$refs.upload.fileList.splice(this.$refs.upload.fileList.indexOf(file), 1)
        // 通知父组件
        this.setModelValue(this.$refs.upload.fileList)
      }
    },
    handleSuccess(res, file, fileList) {
      this.isUploading = false
      if (typeof res === 'string') {
        res = JSON.parse(decodeURIComponent(jsCrypto.decrypt(res)))
      }
      if (res.rspCd === '00000') {
        let filePath = res.data
        file.url = filePath
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
      this.$Message.error(file.name + this.$t('tips.invalid_file_type'))
    },
    handleMaxSize(file) {
      this.isUploading = false
      this.$Message.error({
        content: this.$t('tips.upload_type_img', {
          size: `${this.maxSize}${(this.maxSize <= 1024 && 'KB') || 'MB'}`,
          type: `(${this.format.join(',')})`
        }),
        duration: 5
      });
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
      this.showVideoEl = type === 'video';
      if (!this.showVideoEl) {
        return Promise.resolve()
      }
    },
    onUploadProgress() {
      this.isUploading = true
    }
  },
  components: { UploadFileList, UploadImgList }
}
</script>

<style lang="stylus" scoped>
.download-list-comp {
  width: 400px;
}

.video-wrapper {
  margin: 10px 0;
  width: 300px;
  text-align: right;
}
</style>
