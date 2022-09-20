<template>
  <div class="boss-editor-wrapper">
    <ckeditor :editor="editor" v-model="content" :config="editorConfig" @ready="ready"></ckeditor>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue2'
import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import MyUploadAdapter from "./MyUploadAdapter.js"
import { editorConfig } from './config'

export default {
  name: "editor",

  components: {
    ckeditor: CKEditor.component,
  },
  
  data() {
    return {
      editor: DocumentEditor,
      content: this.value,
      editorConfig: { 
        placeholder: this.placeholder,
        ...editorConfig,
        ...this.diyConfig
      }
    }
  },

  props: {
    value: {
      type: String,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: () => false
    },
    diyConfig: {
      type: Object,
      default: () => {}
    },
    placeholder: {
      type: [String, Number],
      default: ''
    }
  },

  created() {
    this.content = this.value
  },

  watch:{
    'value' (val) {
      if (!this.editor && val && val !== this.content) {
        this.content = val
      }
    },
    content (val) {
      this.getText()
      this.$emit('input', val)
    }
  },

  methods: {
    ready(editor) {
      this.instance = editor
      if (this.readOnly) {
        editor.isReadOnly = true
      }
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
      editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return new MyUploadAdapter(loader);
      }
    },
    getHtml() {

    },
    getText() {
      if (!this.instance) {
        console.error('can not found the instance')
        return ''
      }
      const el = this.instance.sourceElement
      return el.innerText
    }
  }
}
</script>

<style lang="stylus" scoped>
.boss-editor-wrapper {
  width: 700px;
}
>>> .ck.ck-editor__editable_inline {
  border-color: #c4c4c4;
}
</style>

