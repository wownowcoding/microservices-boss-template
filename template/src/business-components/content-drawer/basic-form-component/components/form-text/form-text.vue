<template>
  <div class="form-text" :class="{ 'copy-txt-class': isCopy && !!value }" v-html="showValue" @click="copyString" />
</template>

<script>
import { copyString } from '@/utils/clipboard';
export default {
  props: {
    //  是否允许复制
    isCopy: {
      type: Boolean,
      default: () => false
    },
    //  展示的数据
    value: {
      type: [Number, String, Array],
      default: () => ''
    }
  },
  computed: {
    showValue() {
      if (this.value) {
        return Array.isArray(this.value) && this.value.join('</br>') || this.value; 
      }
      return '-';
    }
  },
  methods: {
    //  复制字符串
    copyString() {
      !!this.isCopy && !!this.value && copyString(this.value);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .form-text {
    paddint-top: 1px !important;
  }
  .copy-txt-class {
    cursor: pointer;
    transition: all .3s;
  }
  .copy-txt-class:hover {
    color: blue;
  }
</style>