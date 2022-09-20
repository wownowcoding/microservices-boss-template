<template>
  <div class="buttons">
    <span v-for="opt in options" :key="opt.code">
      <Badge :count="opt.orderCount" overflow-count="10000000">
        <Button
          :type="!multiple && (value === opt.code && 'primary' || 'default') || (value.indexOf && value.indexOf(opt.code) !== -1 && 'primary' || 'default')"
          :style="getStyle(opt)"
          :key="opt.code + 'buttons'"
          class="filter-form-button"
          @click="btnClick(opt)"
        >{{ opt.message }}</Button>
      </Badge>
    </span>
    <span v-if="close && options && options.length && (typeof buttonActive === 'string' && buttonActive || Array.isArray(buttonActive) && buttonActive.length)">
      <Tooltip :content="$t('i.datepicker.clear')" placement="top">
        <Button
          type="default"
          class="filter-form-button"
          @click="closeClick"
        >
          <Icon type="ios-close"  class="close-btn" />  
        </Button>
      </Tooltip>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    close: {
      type: Boolean,
      default: () => false
    },
    multiple: {
      type: Boolean,
      default: () => false
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Number, String, Object],
      default: () => ''
    },
    item: {
      type: Object,
      default() {
        return {};
      }
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
    },
    value(val) {
      if (!this.multiple && val !== this.buttonActive || this.multiple && JSON.stringify(val) !== JSON.stringify(this.buttonActive)) {
        this.buttonActive = val;
      }
    }
  },
  methods: {
    closeClick() {
      this.$set(this, 'buttonActive', Array.isArray(this.buttonActive) ? [] : '');
      this.$emit('button-change', this.buttonActive);
    },
    btnClick(item) {
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
    },
    getStyle(item) {
      let style = item.style || {}
      return {
        textTransform: "capitalize",
        ...style
      };
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
  .buttons {
    display: block !important;
    position relative
  }
  .close-btn {
    font-size: 18px;
  }
</style>
