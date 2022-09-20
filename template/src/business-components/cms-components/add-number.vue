<template>
  <Input-number :disabled="disabled" :precision="precision" :step="step" v-model="val" :min="min" :max="max" @on-change="change"></Input-number>
</template>

<script>
export default {
  inject: ['onRelease'],
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: [Number, String, undefined],
      default: 0
    },
    max: {
      type: [Number, String, undefined],
      default: 10000
    },
    precision: {
      type: [Number, String, undefined],
      default: ''
    },
    step: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      val: ''
    }
  },
  methods: {
    change() {
      this.$emit('on-change')
      this.onRelease && this.onRelease()
      setTimeout(() => {
        if (Number(this.value) > this.max) {
          this.$emit('input', this.max)
        }
      }, 40)
    }
  },
  watch: {
    val() {
      this.$emit('input', Number(this.val))
    },
    value: {
      handler() {
        this.val = Number(this.value)
      },
      immediate: true
    }
  }
}
</script>
<style lang="stylus" scoped>
.cms-add-utils {
  width: 25px;
  border-bottom-right-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);
  overflow: hidden;
  .cms-add-utils-item {
    width: 25px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #999;
    font-size: 14px;
    &.disabled {
      color: #dcdcdc !important;
    }
    &:hover {
      color: #f39322;
      cursor: pointer;
    }
  }
}
.cms-utils-line {
  margin: 0 2px;
  height: 1px;
  background-color: #dcdcdc;
}
</style>
