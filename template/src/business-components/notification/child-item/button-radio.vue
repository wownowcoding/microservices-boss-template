<template>
  <div class="button-radio">
    <Button :disabled="disabled" v-for="item in options" :key="item.code" @click="selectItem(item)" :type="value == item.code ? 'primary' : 'default'">{{ item.message }}</Button>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectItem(item) {
      if (this.disabled) return false
      this.$emit('input', item.code)
      this.$emit('change', item.code)
    }
  }
}
</script>

<style lang="stylus" scoped>
.button-radio {
  height: 100%;

  button {
    margin-right: 10px;
    margin-bottom: 10px;
    min-width: 64px;
  }
}
</style>
