<template>
  <div class="images-upload-wrapper">
    <div v-if="!isHiddenVueCropper">
      <Button class="margin-bottom-gutter" @click="showUpdate" :disabled="btnDisabled || disabled" type="success" icon="ios-cloud-upload-outline">{{ btnName || $t('btn.upload_file') }} </Button>
      <span v-loading="uploadLoading" class="images-upload-loading"></span>
    </div>
    <UploadFile v-if="isHiddenVueCropper" :watermark="1" :format="['jpg', 'jpeg', 'png']" :group="group" :limit="1" v-model="image" :value="[]" :paramsObj="paramsObj" :maxSize="maxSize" imgDisplayMode @success="success" />
    <div v-if="!isHiddenVueCropper && showList && value.length > 0">
      <uploadImgList
        class="download-list-comp"
        :fileInfo="false"
        :fileNote="$t('v3_1_1.addNotes')"
        :uploadList="value"
        :handleRemove="handleRemove"
        :limit="limit"
        :imagesMap="imagesMap"
        @handleCut="handleCut"
      />
    </div>
    <Modal
      ref="model"
      v-if="!isHiddenVueCropper"
      v-model="visible"
      class="images-upload-dialog"
      width="1000px"
      footer-hide
      :closable="false"
      :mask-closable="false"
    >
      <div class="images-upload-cropper">
        <div class="images-cropper-content">
          <div class="images-cropper" ref="cropperWrapper">
            <vueCropper
              v-if="visible"
              ref="cropper"
              :img="option.img"
              :outputSize="option.outputSize"
              :outputType="option.outputType"
              :fixed="fixed"
              :fixedNumber="[autoCropWidth, autoCropHeight]"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :fixedBox="fixedBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="autoCropWidth"
              :autoCropHeight="autoCropHeight"
              :centerBox="option.centerBox"
              :high="option.high"
              :enlarge="enlarge"
              @realTime="realTime"
            ></vueCropper>
          </div>

          <div class="images-cropper-preview">
            <!-- <section class="pre-item">
              <div :style="previews.previewStyle">
                <div :style="previews.div">
                  <img :src="previews.url" :style="previews.img" />
                </div>
              </div>
            </section> -->
            <template v-if="previewsUrl">
              <img :src="previewsUrl" class="images-cropper-images" />
              <span class="images-cropper-text">{{ $t('v2_1_1.preview') }}: {{ previews.w }} x {{ previews.h }}</span>
              <span class="images-cropper-text">{{ $t('v2_1_1.size') }}: {{ size }} kb</span>
              <div style="margin-right: 20px" v-if="option.outputType !== 'png'">
                <el-slider v-model="outputSize" :step="10"></el-slider>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="images-upload-button">
        <Button :loading="uploading" type="primary" @click="confirm">{{ $t('operation.confirm') }}</Button>
        <Button @click="visible = false">{{ $t('btn.back') }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import UploadFile from "@/components/Upload/UploadFile.vue"
import { Slider } from 'element-ui';
import axios from 'axios'
import { upload } from '@/api/file'
import uploadImgList from './uploadImgList.vue';
Vue.use(VueCropper)

export default {
  name: 'ImagesBeforeUpload',
  props: {
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
    btnName: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number,
      default: 5 * 1024
    },
    group: {
      type: String,
      default: 'app'
    },
    autoCropWidth: {
      type: Number,
      default: 200
    },
    autoCropHeight: {
      type: Number,
      default: 200
    },
    value: {
      type: Array,
      default: () => []
    },
    fileTypeRegexp: {
      type: RegExp,
      default: () => /\.(gif|jpg|jpeg|png|JPG|PNG)/
    },
    limit: {
      type: Number,
      default: 1
    },
    showList: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    enlarge: {
      type: Number,
      default: 1
    },
    fixedBox: {
      type: Boolean,
      default: false
    },
    fixedCropTip: {
      type: Boolean,
      default: false
    },
    isNotPixi: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      uploading: false,
      visible: false,
      outputSize: 80,
      uploadLoading: false,
      size: 0,
      previewsUrl: '',
      previews: {},
      imagesMap: {},
      imagesFile: {},
      image: [],
      option: {
        outputSize: 1,
        size: 1,
        high: false, // 是否根据dpr生成适合屏幕的高清图片
        full: false, // 是否输出原图比例的截图
        outputType: 'jpeg', // ['jpg', 'png', 'webp']
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        centerBox: true // 截图框是否限制在图片里(只有在自动生成截图框时才能生效)
      },
      paramsObj: {}
    }
  },
  computed: {
    btnDisabled() {
      // 上传时或大于上传限制时禁用按钮
      return this.value.length >= this.limit
    },
    isHiddenVueCropper() {
      return this.$route?.query?.isHiddenVueCropper ?? false;
    }
  },
  methods: {
    success(filelist) {
      this.value.push({
        group: this.group,
        url: filelist[0].url
      })
      this.$emit('input', this.value)
      this.$emit('setModelValue', this.value)
    },
    showUpdate() {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      if (this.limit > 1) {
        input.setAttribute('multiple', 'multiple')
      }
      const that = this
      input.addEventListener('change', (e, num) => {
        const files = e.target.files
        const validates = []
        files.forEach((file, index) => {
          if (index < that.limit - that.value.length) {
            validates.push(that.fileValidate(file))
          }
        })
        console.log('validates', validates)
        Promise.all(validates).then(images => {
          const _fileImages = []
          const _files = []
          images.forEach((image, $index) => {
            if (image) {
              _files.push(files[$index])
              _fileImages.push(image)
            }
          })
          if (that.limit > 1) {
            let l = 0
            const len = _files.length
            this.uploadLoading = true
            _files.forEach((item, $index) => {
              that.uploadFileListPost(item, _fileImages[$index], () => {
                l++
                if (l >= len) {
                  this.uploadLoading = false
                }
              })
            })
          } else {
            that.option.img = ''
            that.fileToImage(_files[0]).then(img => {
              that.showCropModel(img.src)
            })
          }
        })
      })
      input.click()
    },
    realTime(previews) {
      previews.w = Number(previews.w).toFixed(2)
      previews.h = Number(previews.h).toFixed(2)
      this.previews = {
        ...previews,
        previewStyle: {
          width: previews.w + "px",
          height: previews.h + "px",
          overflow: "hidden",
          margin: "0",
          zoom: (152 / previews.w)
        }
      }
      this.getImage()
    },
    getImage() {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.cropper.getCropData((data) => {
          this.size = (data.length / 1024).toFixed(2)
          this.previewsUrl = data
        })
      }, 300)
    },
    async confirm() {
      if (!this.previewsUrl) return false
      this.uploading = true
      let formData = new FormData()
      const arr = this.previewsUrl.split(',')
      const bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      let fileType = 'png'
      if (this.fileType.indexOf('jpg') > -1 || this.fileType.indexOf('jpeg') > -1) {
        fileType = 'jpg'
      }
      formData.append('file', new File([u8arr], `k${Date.now()}.${fileType}`, { type: this.fileType }))
      formData.append('group', this.group)
      this.axiosUpload(formData, {
        width: this.previews.w,
        height: this.previews.h
      }).then(data => {
        if (this.confirmCallBack) {
          this.confirmCallBack(data)
          this.confirmCallBack = null
        } else {
          this.value.push(data)
        }
        this.$emit('input', this.value)
        this.$emit('setModelValue', this.value)
        this.visible = false
        this.uploading = false
      })
    },
    uploadFileListPost(file, image, callback) {
      let formData = new FormData()
      formData.append('file', file)
      formData.append('group', this.group)
      this.axiosUpload(formData, {
        width: image.width,
        height: image.height,
      }).then(data => {
        this.imagesMap[data.url] = 1
        this.imagesFile[data.url] = file
        this.value.push(data)
        this.$emit('input', this.value)
        this.$emit('setModelValue', this.value)
        callback && callback()
      })
    },
    axiosUpload(formData, image) {
      return new Promise((resolve, reject) => {
        const axiosOption = {
          method: 'post',
          url: `${upload}?group=${this.group}`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        console.log('watermark: ', this.watermark);
        if (this.watermark) {
          axiosOption.headers.watermark = this.watermark;
        }
        axios(axiosOption).then(res => {
          console.log('1111 res.data.data: ', res.data.data);
          const that = this
          var img = document.createElement('img')
          img.onload = function () {
            resolve({
              group: that.group,
              url: that.getUrls(res.data.data, img.width, img.height)
            })
          }
          img.src = res.data.data
        })
      })
    },
    getUrls(url, w, h) {
      if (this.isNotPixi) return url
      return `${url}?WxH=${parseInt(w)}x${parseInt(h)}`
    },
    handleRemove(file) {
      if (!this.disabled) {
        const value = this.value.slice();
        value.splice(value.indexOf(file), 1);
        this.$emit('input', value)
        this.$emit('setModelValue', value)
      }
    },
    showCropModel(data) {
      const that = this
      var img = document.createElement('img')
      img.onload = function () {
        that.option.img = data
        that.visible = true
        that.$nextTick(() => {
          if (img.height > 420) {
            var cropperWrapper = that.$refs.cropperWrapper
            cropperWrapper.style.height = `${img.height}px`
          }
          const wrapper = that.$refs.model.$el.querySelector('.ivu-modal-body')
          if (wrapper.scrollHeight > wrapper.clientHeight) {
            wrapper.scrollTop = (wrapper.scrollHeight - wrapper.clientHeight) / 2
          }
        })
      }
      img.src = data
    },
    handleCut(item) {
      this.confirmCallBack = (data) => {
        item.url = data.url
      }
      this.fileToImage(this.imagesFile[item.url]).then(img => {
        this.showCropModel(img.src)
      })
    },
    fileValidate(file) {
      return new Promise((resolve, reject) => {
        if (!this.fileTypeRegexp.test(file.name)) {
          this.$Message.error(file.name + this.$t('tips.invalid_file_type'));
          return resolve(false)
        }
        // KB单位
        if (file.size > this.maxSize * 1024) {
          this.$Message.error({
            content: this.$t('tips.upload_advice_img', {
              size: `${this.maxSize}KB`
            }),
            duration: 5
          })
        }
        resolve(this.fileToImage(file))
      })
    },
    fileToImage(file) {
      return new Promise((resolve, reject) => {
        var reader = new FileReader()
        const that = this
        reader.onload = e => {
          let data;
          if (typeof e.target.result === "object") {
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (file.type.indexOf('png') > -1) {
            that.option.outputType = 'png'
          }
          that.fileType = file.type
          var img = document.createElement('img')
          img.onload = function () {
            if (that.fixedCropTip) {
              if (!(img.width >= that.autoCropWidth && img.height >= that.autoCropHeight)) {
                that.$Message.error({
                  content: `请上传的图片分辨率为${that.autoCropWidth}x${that.autoCropHeight}`,
                  duration: 6
                })
                return resolve()
              }
            }
            resolve(img)
          }
          img.src = data
        }
        reader.readAsArrayBuffer(file)

      })
    }
  },
  watch: {
    outputSize(val) {
      if (val < 10) {
        this.option.outputSize = 0.1
      } else {
        this.option.outputSize = val / 100
      }
      this.getImage()
    },
    visible() {
      if (!this.visible) {
        this.confirmCallBack = null
      }
    }
  },
  components: {
    UploadFile,
    uploadImgList,
    [Slider.name]: Slider
  }
}

</script>

<style scoped lang="stylus">
.images-upload-wrapper {
  position: relative;
  display: inline-block;
}

.images-upload-cropper {
  position: relative;
  margin-bottom: 70px;
  width: 100%;
}

.images-cropper-content {
  display: flex;
}

.images-cropper-preview {
  position: sticky;
  position: -webkit-sticky;
  margin-left: 16px;
  width: 152px;
  height: 90%;
  flex-shrink: 0;
  top: 0;
  z-index: 2;

  & >>> img {
    display: block;
    max-width: initial;
  }

  .images-cropper-images {
    width: 152px;
  }

  .images-cropper-text {
    display: block;
    padding: 5px 0;
    font-size: 14px;
    color: #999;
  }
}

.images-upload-button {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 16px 0;
  text-align: center;
  background-color: #fff;

  & >>> .ivu-btn+.ivu-btn {
    margin-left: 20px;
  }
}

.images-upload-dialog {
  & >>> .ivu-modal {
    overflow: auto;
    max-height: 100vh;
  }

  & >>> .ivu-modal-body {
    max-height: 600px;
  }

  & >>> .images-cropper {
    width: 100%;
    height: 420px;
  }
}

.pre-item {
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
}

.images-upload-loading{
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  transform: scale(0.5);
}
</style>
