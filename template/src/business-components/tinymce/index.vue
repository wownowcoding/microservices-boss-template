<template>
  <div v-loading="loading" :class="{ fullscreen: fullscreen }" class="tinymce-container" :style="{ width: containerWidth }">
    <textarea :id="tinymceId" class="tinymce-textarea" />
  </div>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
import { upload } from '@/api/file'
import axios from 'axios'
import { marginSetRegistered, marginFormats } from './toolbar/marginSet'

function getimgsrc(htmlstr) {
  const reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim
  const arr = []
  let tem = ''
  while (tem = reg.exec(htmlstr)) {
    arr.push(tem[2])
  }
  return arr
}

export default {
  name: 'Tinymce',
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      required: false,
      default: 560
    },
    toolbar: {
      type: Array,
    },
    plugins: {
      type: Array,
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      loading: false,
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    },
    tinymceCDN() {
      let tinymceCDN = 'https://boss.lifekh.com'
      if (typeof this.ssr === 'object' && this.ssr.env !== 'pro') {
        tinymceCDN = `https://boss-${this.ssr.env}.lifekh.com`
      } else if (this.ssr === '') {
        tinymceCDN = `https://boss-sit.lifekh.com`
      }
      return tinymceCDN
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      load(this.tinymceCDN + '/boss/public/lib/tinymce/tinymce.min.js', (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.baseURL = this.tinymceCDN + '/boss/public/lib/tinymce'

      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.$store.state.settings.lang === 'en' ? 'en' : 'zh_CN',
        height: this.height,
        body_class: 'panel-body',
        object_resizing: false,
        toolbar: this.toolbar || toolbar,
        plugins: this.plugins || plugins,
        menu: {},
        menubar: '',
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: [
          'tinhnow.oss-ap-southeast-1.aliyuncs.com',
          'localhost:8000',
          this.tinymceCDN.replace('https://', ''),
        ],
        default_link_target: '_blank',
        fontsize_formats: "10px 12px 14px 18px 24px 36px",
        link_title: false,
        branding: false,
        formats: { ...marginFormats },
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;line-height:1; }',
        paste_preprocess: function (plugin, arg) {
          // http://tinymce.ax-z.cn/plugins/paste.php
          let val = arg.content
          // 1、匹配color，background，backgroundcolor
          // 2、带:
          // 3、可能带一个空白
          // 4、可能带一个#号
          // 5、属性值可能是十六进制，也可能是关键字，或者是缩写
          // 6、可能是分号
          let reg = /(background-color|backgroundColor|color|background|):\s?#?[0-9a-zA-Z]{3,10};?/gi
          arg.content = val.replace(reg, '')
          // const imgs = getimgsrc(arg.content)
          // imgs && imgs.length && _this.replaceImgSource(imgs)
        },
        images_upload_handler: async function (blobInfo, success, failure) {
          _this.uploadImg(new File([blobInfo.blob()], blobInfo.filename(), { type: 'png' })).then(res => {
            success(res)
          })
        },
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
          _this.$emit('init', editor)
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
          marginSetRegistered.call(_this, editor)
          _this.$emit('setup', editor)
        },
        convert_urls: false
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }
      if (tinymce) {
        tinymce.destroy()
      }
    },
    instantiation() {
      return this.hasInit
    },
    getTinymce() {
      if (window.tinymce) {
        return window.tinymce.get(this.tinymceId)
      }
    },
    setContent(value) {
      const it = this.getTinymce()
      if (it) {
        it.setContent && it.setContent(value)
      }
    },
    getContent() {
      const it = this.getTinymce()
      if (it) return it.getContent()
      return ''
    },
    goEnd() {
      const editor = window.tinymce.get(this.tinymceId)
      editor.execCommand('selectAll')
      editor.selection.getRng().collapse(false)
      editor.focus()
    },
    getWindow() {
      const it = this.getTinymce()
      if (it) {
        return it.iframeElement.contentWindow
      }
    },
    imageSuccessCBK(arr) {
      arr.forEach(v => window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`))
    },
    uploadImg(file) {
      return new Promise(async (resolve, reject) => {
        var formData = new FormData();
        formData.append('file', file)
        formData.append('group', 'app')
        const axiosOption = {
          method: 'post',
          url: `${upload}?group=app`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        const res = await axios(axiosOption)
        resolve(res.data.data)
      })
    },
    async replaceImgSource(imgs) {
      this.loading = true
      const urls = []
      let html = this.getContent()
      for (let i = 0; i < imgs.length; i++) {
        const file = await this.getImgSrcToFile(imgs[i])
        const url = await this.uploadImg(file)
        urls.push({
          form: imgs[i],
          to: url
        })
      }
      for (let i = 0; i < urls.length; i++) {
        const reg = new RegExp(urls[i].form, 'g')
        html = html.replace(reg, urls[i].to)
      }
      this.setContent(html)
      this.loading = false
    },
    getImgSrcToFile(url) {
      return new Promise(async (resolve, reject) => {
        const img = new Image
        img.crossOrigin = 'anonymous'
        img.onload = function () {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.height = img.height
          canvas.width = img.width
          ctx.drawImage(img, 0, 0)
          const dataURL = canvas.toDataURL('image/png')
          const arr = dataURL.split(',')
          const mime = arr[0].match(/:(.*?);/)[1]
          const bstr = atob(arr[1])
          const n = bstr.length
          let u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          resolve(new File([u8arr], Date.now(), { type: mime }))
        }
        img.src = url
      })
    },
  }
}
</script>

<style lang="stylus">
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  height: 667px;

  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-upload-btn {
  display: inline-block;
}

.tox-tbtn {
  background-color: transparent;
}

.tox .tox-dialog-wrap__backdrop {
  background-color: rgba(55, 55, 55, 0.6) !important;
}
</style>
