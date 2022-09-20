<template>
  <div class="v-input" :class="{ 'detail-input': isDetail }">
    <Input ref="input" :type="type" :value="trimmedValue" v-bind="$attrs" v-on="$listeners" :maxlength="maxlength">
      <slot name="prepend" slot="prepend"></slot>
      <slot name="append" slot="append"></slot>
      <slot name="prefix" slot="prefix"></slot>
      <slot name="suffix" slot="suffix">
        <span ref="inputLimit" class="input-length-limit">
          <span v-if="isLengthLimitVisible && type === 'text'" class="input-length-limit-inner"> {{ textLength }}/{{ upperLimit }} </span>
        </span>
      </slot>
    </Input>
    <span v-if="isLengthLimitVisible && type === 'textarea'" class="area-length-limit"> {{ textLength }}/{{ upperLimit }} </span>
  </div>
</template>
<script>
import { setStyle, getStyle } from '@/utils/dom'

export default {
  name: 'v-input',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    showLengthLimit: {
      type: Boolean,
      default: false,
    },
    isTrim: {
      type: Boolean,
      default: true,
    },
    isDetail: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isLengthLimitVisible() {
      // 只读、禁用状态下不可用
      return this.showLengthLimit && this.$attrs.maxlength && (this.type === 'text' || this.type === 'textarea') && !this.$attrs.readonly && !this.$attrs.disabled
    },
    textLength() {
      if (typeof this.value === 'number') {
        return String(this.value).length
      }

      return (this.value || '').length
    },
    upperLimit() {
      return this.$attrs.maxlength
    },
    trimmedValue() {
      let trimmedValue = typeof this.value === 'string' ? this.value.trim() : this.value
      const result = this.type !== 'textarea' && this.isTrim ? trimmedValue : this.value
      this.$emit('input', result)
      return result
    },
    maxlength() {
      const MAX_LENGTH_MAP = {
        textarea: 500,
      }
      return this.$attrs['maxlength'] || MAX_LENGTH_MAP[this.type]
    },
  },
  mounted() {
    this.registerRefFunction()
    this.isLengthLimitVisible && this.$nextTick(this.adjustSuffixWidth)
  },
  methods: {
    registerRefFunction() {
      const METHODS_NAMES = ['focus']
      METHODS_NAMES.forEach(methodName => {
        this[methodName] = this.$refs['input'][methodName]
      })
    },
    adjustSuffixWidth() {
      const EXTRA_WIDTH = 20
      const iViewInputEl = this.$refs['input'].$el
      const suffixEl = iViewInputEl.querySelector('.ivu-input-suffix')
      setStyle(suffixEl, 'width', 'auto')

      const inputEl = iViewInputEl.querySelector('.ivu-input-with-suffix')
      const inputLimitEl = this.$refs['inputLimit']
      const limitWidth = parseInt(getStyle(inputLimitEl, 'width'), 10) + EXTRA_WIDTH + 'px'
      setStyle(inputEl, 'paddingRight', limitWidth)
    },
  },
}
</script>



<style lang="stylus" scoped>
.v-input {
  position: relative;

  .input-length-limit {
    display: inline-flex;
    align-items: center;
    height: 32px;
    margin-right: 6px;

    .input-length-limit-inner {
      font-size: 14px;
      color: #909399;
      background-color: #fff;
    }
  }

  .area-length-limit {
    position: absolute;
    font-size: 12px;
    bottom: 5px;
    right: 10px;
    color: #909399;
    background: #fff;
    line-height: 1;
  }
}
</style>

<style lang="stylus">
.detail-input {
  width: 100%;
  .ivu-input {
    border: 0 none !important;
    box-shadow: 0 0 0 0 !important;
  }
}
</style>