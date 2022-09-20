<template>
  <w-switch v-model="switchValue" class="form-switch" :disabled="!!disabled" manualSetting @click="switchClick" />
</template>

<script>
  const defaultBooleanProps = {
    type: Boolean,
    default: () => false
  };
  export default {
    props: {
      value: defaultBooleanProps,
      disabled: defaultBooleanProps,
      readonly: defaultBooleanProps,
      click: {
        type: Function
      }
    },
    data() {
      return {
        switchValue: !!this.value
      };
    },
    watch: {
      value(val) {
        if (!!val !== !!this.switchValue) {
          this.switchValue = !!val;
        }
      },
      switchValue(val) {
        if (!!val !== !!this.value) {
          this.$emit('input', !!val);
        }
      }
    },
    methods: {
      switchClick() {
        if (!this.readonly && !this.disabled) {
          this.click && typeof this.click === 'function' ? this.click(!this.switchValue) : this.$set(this, 'switchValue', !this.switchValue);
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .form-switch {
    width: -webkit-fill-available;
  }
</style>