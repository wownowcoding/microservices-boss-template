<template>
  <UploadFile
    :format="options.format || undefined"
    :group="options.group || 'app'"
    v-model="uploadValue"
    :maxSize="options.maxSize || undefined"
    :watermark="options.watermark || undefined"
    :disabled="options.disabled || undefined"
    :fileNote="options.fileNote || undefined"
    :fileInfo="options.fileInfo || undefined"
    :pictureResolution="options.pictureResolution || undefined"
    :imgDisplayMode="options.imgDisplayMode || undefined"
    :limit="options.limit || undefined"
    :fileNameKey="options.fileNameKey || undefined"
    :fileUrlKey="options.fileUrlKey || undefined"
    :showUploadList="options.showUploadList || undefined"
    :btnName="options.btnName || undefined"
    :hasShowVideo="options.hasShowVideo || undefined"
    :isSwitched="isSwitched"
  />
</template>

<script>
import UploadFile from '@/components/Upload/UploadFile.vue'
import defaultProps from "@/utils/default-props";
const { defaultObjectProps, defaultArrayProps } = defaultProps;
export default {
  name: 'form-upload-file',
  components: { UploadFile },
  props: {
    isSlot: {
      type: Boolean,
      default: () => false
    },
    options: defaultObjectProps,
    value: defaultArrayProps,
    //  是否可以切换成输入框
    isSwitched: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      uploadValue: this.value
    }
  },
  watch: {
    uploadValue(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.value)) {
        this.$emit('input', val);
      }
    },
    value(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.uploadValue)) {
        this.$set(this, 'uploadValue', val);
      }
    }
  }
}
</script>