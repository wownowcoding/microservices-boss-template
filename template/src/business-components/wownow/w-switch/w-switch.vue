<template>
  <div class="wownow-switch" @click="onclick">
    <i-switch v-model="switchData" :disabled="disabled">
      <Icon type="md-checkmark" slot="open" />
      <Icon type="md-close" slot="close" />
    </i-switch>
    <div v-if="manualSetting" class="wownow-switch-masking position-center" />
  </div>
</template>

<script>
export default {
  name: 'w-switch',
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    manualSetting: {
      type: Boolean,
      default: () => false
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.value !== this.switchData) {
        this.switchData = !!this.value;
      }
    });
  },
  data() {
    return {
      switchData: this.value
    };
  },
  watch: {
    value(val) {
      if (this.switchData !== val) {
        this.switchData = !!val;
      }
    },
    switchData(val) {
      this.$emit('input', !!val, this);
    }
  },
  methods: {
    onclick() {
      this.$emit('click');
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wownow-switch {
    position: relative;
    width: fit-content;
    margin: 0 auto;
    cursor: pointer;
  }
  .wownow-switch-masking {
    width: 100%;
    height: 100%;
  }
</style>

<style lang="stylus">
  .wownow-switch {
    .ivu-icon-md-checkmark {
      top: -2px;
      right: 2px;
      font-weight: bold;
    }
    .ivu-icon-md-close {
      font-weight: bold;
      top: -2px;
      right: 2px;
    }
  }
</style>