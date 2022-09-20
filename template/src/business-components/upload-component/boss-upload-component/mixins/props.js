export default {
  props: {
    disabled: {
      typr: Boolean,
      default: () => false
    },
    fileNote: {
      type: String,
      default: function() {
        return this.$t('v3_1_1.addNotes');
      }
    },
    // 备注： fileInfo 用来确定是否显示 uploadImgList组件里面的 Icon
    fileInfo: {
      type: Boolean,
      default: () => false
    },
    pictureResolution: {
      type: Object,
      default: () => ({ width: 3000, height: 3000 })
    },
    format: {
      //  ['doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png']
      default: () => []
    },
    //  5 * 1024
    maxSize: {
      type: Number,
      default: () => 5120
    },
    imgDisplayMode: {
      type: Boolean,
      default: () => false
    },
    limit: {
      type: Number,
      default: () => 1
    },
    value: {
      // type: Array,
      default: () => []
    },
    fileNameKey: {
      type: String,
      default: () => 'name'
    },
    fileUrlKey: {
      type: String,
      default: () => 'url'
    },
    showUploadList: {
      type: Boolean,
      default: () => true
    },
    btnName: {
      type: String,
      default: function() {
        return this.$t('btn.upload_file');
      }
    },
    hasShowVideo: {
      type: Boolean,
      default: () => true
    }
  }
}