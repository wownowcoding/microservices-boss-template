<template>
  <div class="buttons">
    <span v-for="opt in options" :key="opt.code">
      <Badge :count="opt.orderCount" overflow-count="10000000">
        <!-- :type="!multiple && (value === opt.code && 'primary' || 'default') || (value.indexOf && value.indexOf(opt.code) !== -1 && 'primary' || 'default')" -->
        <Button
          :type="!multiple && (buttonActive === opt.code && 'primary' || 'default') || (buttonActive.indexOf && buttonActive.indexOf(opt.code) !== -1 && 'primary' || 'default')"
          :style="getStyle(opt)"
          :key="opt.code + 'buttons'"
          @click="btnClick(opt)"
        >{{ opt.message }}</Button>
      </Badge>
    </span>
  </div>
</template>

<script>
export default {
  name: "v-button",
  props: {
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
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      buttonActive: ''
    };
  },
  watch: {
    buttonActive (val) {
      // if (!this.multiple && val !== this.value || this.multiple && JSON.stringify(val) !== JSON.stringify(this.value)) {
      //   this.$emit('input', val);
      // }
      this.$emit('input', val)
    },
    value (val) {
      if (!this.multiple && val !== this.buttonActive || this.multiple && JSON.stringify(val) !== JSON.stringify(this.buttonActive)) {
        this.buttonActive = val;
      }
    }
  },
  methods: {
    btnClick (item) {
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
    getStyle (item) {
      let style = item.style || {}
      return {
        textTransform: "capitalize",
        marginRight: '10px',
        ...style
      };
    }
  },
  mounted () {
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
}
</style>
