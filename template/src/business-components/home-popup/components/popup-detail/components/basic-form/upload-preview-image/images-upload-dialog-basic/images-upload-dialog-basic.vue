<template>
  <Modal ref="model" v-if="!isHiddenVueCropper" v-model="visible" class="images-upload-dialog" width="1000px" footer-hide :closable="false">
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
</template>

<script>
import { VueCropper } from 'vue-cropper'
import { Slider } from 'element-ui';
import axios from 'axios'
import { upload } from '@/api/file'
Vue.use(VueCropper)
export default {
  name: 'images-upload-dialog',
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
    }
  },
  components: {
    [Slider.name]: Slider
  },
  data() {
    return {
      uploading: false,
      visible: false,
      outputSize: 80,
      size: 0,
      previewsUrl: '',
      previews: {},
      image: this.value,
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
      }
    };
  },
  methods: {
    fileChange(dom, files) {
      //上传图片
      const file = files[0]
      if (!this.fileTypeRegexp.test(dom.target.value)) {
        return this.$Message.error(file.name + this.$t('tips.invalid_file_type'));
      }
      // KB单位
      if (file.size > this.maxSize * 1024) {
        this.$Message.error({
          content: this.$t('tips.upload_advice_img', {
            size: `${this.maxSize}KB`
          }),
          duration: 5
        });
      }
      const reader = new FileReader();
      reader.onload = renderDom => {
        const data = typeof renderDom.target.result === 'object' ? window.URL.createObjectURL(new Blob([renderDom.target.result])) : renderDom.target.result;
        if (file.type.indexOf('png') !== -1) {
          this.option.outputType = 'png'
        };
        const img = document.createElement('img')
        img.onload = () => {
          if (this.fixedCropTip) {
            if (!(img.width >= this.autoCropWidth && img.height >= this.autoCropHeight)) {
              return this.$Message.error({
                content: this.$t(`请上传的图片分辨率为${this.autoCropWidth}x${this.autoCropHeight}`),
                duration: 6
              });
            }
          }
          this.fileName = file.name;
          this.fileType = file.type;
          this.option.img = data;
          this.visible = true;
          this.$nextTick(() => {
            if (img.height > 420) {
              this.$refs.cropperWrapper.style.height = `${img.height}px`
            }
            const wrapper = this.$refs.model.$el.querySelector('.ivu-modal-body')
            if (wrapper.scrollHeight > wrapper.clientHeight) {
              wrapper.scrollTop = (wrapper.scrollHeight - wrapper.clientHeight) / 2
            }
          })
        }
        img.src = data
      }
      reader.readAsArrayBuffer(file);
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
          this.previewsUrl = data;
        })
      }, 300)
    },
    async confirm() {
      if (!this.previewsUrl) return false;
      this.uploading = true;
      const formData = new FormData();
      const arr = this.previewsUrl.split(',');
      const bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      formData.append('file', new File([u8arr], this.fileName, { type: this.fileType }))
      formData.append('group', this.group)
      const axiosOption = {
        method: 'post',
        url: `${upload}?group=${this.group}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      if (this.watermark) {
        axiosOption.headers.watermark = this.watermark;
      }
      const res = await axios(axiosOption);
      console.log('1111 res.data.data: ', res.data.data);
      this.image.push({
        group: this.group,
        url: res.data.data
      });
      this.$emit('input', this.image);
      this.visible = false;
      this.uploading = false;
    }
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
</style>