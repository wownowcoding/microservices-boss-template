<template>
  <div class="upload-preview-image">
    <Form
      ref="basicForm"
      :model="form"
      :rules="formRules"
      inline
    >
      <FormItem prop="popImage" class="current-basic-form-item">
        <div class="drag-viewer-image drag-ios-eye" v-if="form.popImage && form.popImage.length" v-viewer="{movable: false}" @click="show">
          <Icon type="ios-eye" />
          <img :src="form.popImage[0].url" v-show="false" />
        </div>
        <div class="drag-viewer-image drag-ios-close" v-if="imagesLength > 1" @click="removeImage">
          <Icon type="ios-close-circle" />
        </div>
        <Upload
          :disabled="disabled"
          type="drag"
          :before-upload="handleUpload"
          :format="format"
          style="border: 0 none !important;"
        >
          <div class="drag-site" v-if="!(form.popImage && form.popImage.length)">
            <div class="position-center drag-site-center">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" />
              <p class="upload-preview-image-tips">{{ $t('v4_1_1.pictureAspectRatio') }}</p>
              <p class="upload-preview-image-tips">{{ $t('v4_1_1.recommended', { width: autoCropWidth, height: autoCropHeight }) }}</p>
              <p class="upload-preview-image-tips">{{ $t('v4_1_1.supportpicture', { format: 'JPG、PNG' })}}</p>
              <p class="upload-preview-image-tips">{{ $t('v4_1_1.eachpicture', { maxSize: maxSize }) }}</p>
            </div>
          </div>
          <div class="drag-site" v-else>
            <img :src="form.popImage[0].url" class="drag-site-image" />
          </div>
        </Upload>
        <images-upload-dialog
          ref="imagesIploadDialog"
          :watermark="watermark"
          :disabled="disabled"
          :maxSize="maxSize"
          :group="group"
          :autoCropWidth="autoCropWidth"
          :autoCropHeight="autoCropHeight"
          v-model="form.popImage"
          :fileTypeRegexp="fileTypeRegexp"
          :limit="limit"
          :fixed="fixed"
          :enlarge="enlarge"
          :fixedBox="fixedBox"
          :fixedCropTip="fixedCropTip"
          :format="format"
        />
      </FormItem>
      <FormItem class="current-basic-form-item">
        <span v-if="disabled">{{form.jumpLink}}</span>
        <Input v-else v-model="form.jumpLink" :placeholder="$t('v4_1_1.pleaseEnterTheRedirectionAddress')" />
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { validRequired, validListRequired } from '@/utils/validator';
import ImagesUploadDialog from './images-upload-dialog-basic';
export default {
  name: 'upload-preview-image',
  components: { [ImagesUploadDialog.name]: ImagesUploadDialog },
  props: {
    format: {
      type: Array,
      default: () => ['jpg', 'jpeg', 'png']
    },
    watermark: {
			type: [Number, String, Boolean, Object],
			default() {
				return false;
			}
		},
    disabled: {
      type: Boolean,
      default: false
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
      type: Object,
      required: true,
      default: () => ({
        popImage: '',
        jumpLink: ''
      })
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
    imagesLength: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      form: {
        popImage: [(this?.value?.popImage || '')].filter(e => !!e).map(e => ({ group: 'app', url: e })),
        jumpLink: (this?.value?.jumpLink ?? '')
      }
    }
  },
  computed: {
    formRules() {
      return {
        popImage: [{ required: true, validator: validListRequired, trigger: 'blur' }],
        jumpLink: [{ required: true, validator: validRequired, trigger: 'blur' }]
      };
    }
  },
  watch: {
    ['form.popImage']: {
      deep: true,
      handler(val) {
        if (val.length > 1) {
          this.$nextTick(() => {
            this.$set(this.form, 'popImage', [val[val.length - 1]]);
            this.Util.timeout(() => this.setInput(), 10);
          });
        } else if (val.length === 1) {
          // 下面语句会死循环
          // this.$set(this.form, 'popImage', [val[val.length - 1]]);
          this.Util.timeout(() => this.setInput(), 10);
        }
      }
    },
    ['form.jumpLink'](val) {
      this.Util.timeout(() => this.setInput(), 10);
    },
    value: {
      deep: true,
      handler(val) {
        const { popImage, jumpLink } = val;
        if (popImage !== (this?.form?.popImage?.[0]?.url)) {
          this.$set(this.form, 'popImage', popImage && [{ group: 'app', url: popImage }] || []);
        }
        if (jumpLink !== this.form.jumpLink) {
          this.form.jumpLink = jumpLink;
        }
      }
    }
  },
  methods: {
    validate() {
      return this.$refs.basicForm.validate();
    },
    setInput() {
      const { popImage, jumpLink } = this.form;
      this.$emit('input', {
        popImage: (popImage?.[0]?.url ?? ''),
        jumpLink
      });
    },
    show() {
      const viewer = this.$el.querySelector('.drag-viewer-image').$viewer
      viewer.show()
    },
    handleUpload(file) {
      this.$refs.imagesIploadDialog.fileChange({
        target: {
          value: file.name,
          size: file.size
        }
      }, [file]);
      return false;
    },
    removeImage() {
      this.$emit('remove-image')
    }
  }
}
</script>

<style>

</style>

<style lang="stylus" scoped>
  .upload-preview-image {
    width: 230px;
    margin-right: 10px;
  }
  .drag-site-image {
    height: 144px;
  }
  .drag-site {
    width: 230px;
    height: 144px;
    position: relative;
  }
  .drag-site-center {
    width: 100%;
    padding: 20px 0;
  }
  .upload-preview-image-tips {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
  }
  .current-basic-form-item {
    width: 100%;
    position: relative;
  }
  .upload-preview-image-tips {
    font-size: 12px;
    line-height: 14px;
    white-space: nowrap;
  }
  .drag-viewer-image {
    font-size: 24px;
    position: absolute;
    cursor: pointer;
    top: -5px;
    z-index: 10;
    color: #f39322;
  }
  .drag-ios-eye {
    left: 6px;
    font-size: 24px;
  }
  .drag-ios-close {
    font-size: 16px;
    right: 6px;
  }
</style>
