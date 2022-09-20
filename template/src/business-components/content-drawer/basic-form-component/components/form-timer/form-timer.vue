<template>
  <Row>
    <Col span="12">
      <TimePicker style="padding-right: 20px;" v-if="timerValue[0] || timerValue[0] === ''" v-model="timerValue[0]" :format="format" :disabled="!!disabled" :placeholder="$t('v3_1_1.pleaseChooseATime')" />
    </Col>
    <Col span="12">
      <TimePicker v-if="timerValue[1] || timerValue[1] === ''"  v-model="timerValue[1]" :format="format" :disabled="!!disabled" :placeholder="$t('v3_1_1.pleaseChooseATime')" />
    </Col>
  </Row>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => ['', '']
    },
    format: {
      type: String,
      default: () => ''
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    timerValue: {
      deep: true,
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.value)) {
          this.$emit('input', val);
        }
      }
    },
    value: {
      deep: true,
      handler(val) {
        if (Array.isArray(val) && val.length === 2 && JSON.stringify(val) !== JSON.stringify(this.timerValue)) {
          this.$set(this, 'timerValue', val);
        } else if (!(Array.isArray(val) && val.length === 2)) {
          this.$emit('input', this.timerValue);
        }
      }
    }
  },
  data() {
    return {
      timerValue: this.value
    };
  }
}
</script>