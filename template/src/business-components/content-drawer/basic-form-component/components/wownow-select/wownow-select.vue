<template>
  <div class="wownow-select">
    <Button
      v-for="(e, i) in options"
      :key="'wownow-select-' + (i + 1) + e.code"
      :type="!multiple && (value === e.code && 'primary' || 'default') || (value.indexOf && value.indexOf(e.code) !== -1 && 'primary' || 'default')"
      class="wownow-select-button"
      @click="btnClick(e)"
      :disabled="disabled || e.disabled"
    >{{ e.message }}</Button>
  </div>
</template>

<script>
import Emitter from 'iview/src/mixins/emitter';
export default {
  name: 'wownow-select',
  mixins: [ Emitter ],
  props: {
    options: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: () => false
    },
    value: {
      type: [Number, String, Object],
      default: () => ''
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      buttonActive: ''
    };
  },
  watch: {
    buttonActive(val) {
      if (!this.multiple && val !== this.value || this.multiple && JSON.stringify(val) !== JSON.stringify(this.value)) {
        this.$emit('input', val);
      }
      this.dispatch('FormItem', 'on-form-blur', val);
    },
    value(val) {
      if (!this.multiple && val !== this.buttonActive || this.multiple && JSON.stringify(val) !== JSON.stringify(this.buttonActive)) {
        this.buttonActive = val;
      }
    }
  },
  methods: {
    btnClick(item) {
      if (!this.readonly) {
        if (!this.multiple) {
          this.buttonActive = this.buttonActive === item.code ? '' : item.code;
        } else {
          if (!Array.isArray(this.buttonActive)) {
            this.buttonActive = [];
          }
          const __index = this.buttonActive.indexOf(item.code);
          __index === -1 && this.buttonActive.push(item.code) || this.buttonActive.splice(__index, 1);
        }
        this.$emit('button-change', this.buttonActive);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.multiple) {
        this.buttonActive = [];
      }
      if (this.buttonActive !== this.value) {
        this.buttonActive = this.value;
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  .wownow-select {
    padding: 2px 10px 5px 0px;
    box-sizing: border-box;
    border: 0.5px solid transparent;
  }
  .wownow-select-button {
    margin: 0 4px 4px 0;
  }
</style>

<style lang="stylus">
  .ivu-form-item-error {
    .wownow-select {
      border: 0.5px solid #ed4014;
    }
  }
</style>
