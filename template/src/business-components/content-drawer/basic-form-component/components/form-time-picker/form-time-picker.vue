<template>
  <!-- 单时间选择 -->
  <TimePicker
    v-model="timePickerValue"
    :format="item.format"
    type="timerange"
    :disabled="!!item.disabled"
    placement="bottom-end"
    :placeholder="$t('v3_1_1.pleaseChooseATime')"
  />
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: [Array, String],
      default: () => ''
    }
  },
  data() {
    return {
      timePickerValue: this.value
    };
  },
  watch: {
    timePickerValue(val) {
      const timePickerValueType = typeof val;
      const valueType = typeof this.value;
      if (typeof val === 'string' && val !== this.value || timePickerValueType !== valueType) {
        return this.$emit('input', val);
      }
      
      if (Array.isArray(val)) {
        if (!Array.isArray(this.value)) {
          return this.$emit('input', val);
        }
      }
      if (JSON.stringify(val) !== JSON.stringify(this.value)) {
        return this.$emit('input', val);
      }
    },
    value(val) {
      const timePickerValueType = typeof this.timePickerValue;
      const valueType = typeof val;
      if (typeof val === 'string' && val !== this.timePickerValue || timePickerValueType !== valueType) {
        return this.$set(this, 'timePickerValue', val);
      }
      
      if (Array.isArray(val)) {
        if (!Array.isArray(this.timePickerValue)) {
          return this.$set(this, 'timePickerValue', val);
        }
      }
      if (JSON.stringify(val) !== JSON.stringify(this.timePickerValue)) {
        return this.$set(this, 'timePickerValue', val);
      }
    }
  }
}
</script>