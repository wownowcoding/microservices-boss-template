<template>
  <div class="textarea-wrapper">
    <Input v-model="content" :disabled="disabled" class="input_width" type="textarea" v-bind="$attrs" />
    <span v-if="showWordLimit" class="limit-text">
      <span :class="{ red: content && content.length > maxLength }">{{ content ? content.length : 0 }}</span> / {{ maxLength }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: () => ''
    },
    'show-word-limit': {
      type: Boolean,
      default: () => false
    },
    maxLength: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.content = val
      },
    },
    content(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  data() {
    return {
      content: this.value
    }
  }
}
</script>

<style lang="stylus" scoped>
.textarea-wrapper {
  position: relative;

  .limit-text {
    position: absolute;
    bottom: 0px;
    right: 15px;
    .red {
      color: #ed4014;
    }
  }
}
</style>