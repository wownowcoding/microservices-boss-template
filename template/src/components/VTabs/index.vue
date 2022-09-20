<template>
  <Tabs v-bind="$attrs" v-on="$listeners" @on-click="onClickTab" :style="{ height: tabHeight }">
    <slot></slot>
  </Tabs>
</template>

<script>
// 该组件用来解决，存在多个tab时，Tabs容器只会按最高的Tabpane内容高度显示，不会自适应高度，导致部分tabpane下的按钮在底部
export default {
  name: 'VTabs',

  props: {
    value: {
      type: [Number, String],
      default: 0
    }
  },

  data() {
    return {
      tabHeight: 'auto',
      tab: this.value
    }
  },

  watch: {
    value(val) {
      this.tab = val
    },
    tab(val) {
      this.$emit('input', val)
    }
  },


  methods: {
    onClickTab(name) {
      // 在外层的Tabpane一定要定义name和id，才能实时计算高度
      // tabpane本身高度 + tab栏高度
      if (parseInt(name)) {
        return
      }
      setTimeout(() => {
        let dom = document.querySelector(`#${name}`)
        if (dom && dom.children) {
          let children = dom.children
          let h = 0
          for (let i = 0; i < children.length; i++) {
            const child = children[i]
            h += child.offsetHeight
          }
          this.tabHeight = h + 53 + 'px'
        }
      }, 16)
    }
  }
}
</script>

<style>
</style>