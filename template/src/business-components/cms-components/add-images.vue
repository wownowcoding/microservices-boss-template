<template>
  <ImagesBeforeUpload :isNotPixi="isNotPixi" :fixed="fixed" :disabled="disabled" v-model="iconArr" v-bind="$attrs" />
</template>

<script>
import ImagesBeforeUpload from "@/components/ImagesBeforeUpload"

export default {
  props: {
    value: {
      type: String
    },
    fixed: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isNotPixi: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    iconArr: {
      get() {
        if (this.value) return [{ url: this.value }]
        return []
      },
      set(data) {
        const url = data.length > 0 ? data[0].url : ''
        this.$emit('input', url)
        this.$emit('on-change', url)
      }
    }
  },
  components: {
    ImagesBeforeUpload,
  }
}
</script>
<style lang="stylus" scoped></style>
