<template>
  <div class="button-radio disabled">
    <Button :size="size" v-for="item in options" :key="item.code" @click="selectItem(item)" :type="value == item.code ? 'primary' : 'default'" :disabled="item.disabled">{{ item.message }}</Button>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    },
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
    },
  },
  methods: {
    selectItem(item) {
      if (this.disabled) return false
      if (item.code != this.value) {
        this.$emit('input', item.code)
        this.$emit('change', item.code)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.button-radio {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;

  button {
    margin-right: 10px;
    margin-bottom: 10px;
    min-width: 64px;
  }
}
</style>
