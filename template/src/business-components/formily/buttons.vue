<template>
  <div>
    <Button v-for="bt in btns" :key="bt.code" :disabled="disabled" :type="getType(bt.code)" @click="onClick(bt.code)" style="margin-right: 4px">
      {{ bt.message }}
    </Button>
  </div>
</template>

<script>
export default {
  props: {
    btns: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Array],
      default: () => ''
    },
    isSingle: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      model: this.value
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.model = val
      }
    },
    model: {
      immediate: true,
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },

  methods: {
    getType(val) {
      if (this.isSingle) {
        return this.model === val ? 'primary' : ''
      }
      if (Array.isArray(this.model)) {
        return this.model.includes(val) ? 'primary' : ''
      }
      return ''
    },
    onClick(val) {
      if (this.isSingle) {
        // 清空
        if (this.model && this.model === val) {
          this.model = ''
        } else {
          this.model = val
        }
      }

      if (!this.isSingle) {
        if (!Array.isArray(this.model)) {
          this.model = []
        }
        if (this.model.includes(val)) {
          let index = this.model.findIndex(e => e === val)
          this.model.splice(index, 1)
        } else {
          this.model.push(val)
        }
      }
    }
  }
}
</script>

<style>
</style>