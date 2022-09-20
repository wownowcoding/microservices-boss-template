<template>
  <div class="icon-img" :style="bgStyle">
    <img @load="load" v-if="url" :src="url" draggable="false" />
    <img v-else src="./images/logo.png" class="icon-default" :style="logoStyle" draggable="false" />
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String
    },
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    bgColor: {
      type: String,
      default: '#e4e5ea'
    },
    iconSize: {
      type: Number,
      default: 36
    },
  },
  computed: {
    logoStyle() {
      return `width:${this.iconSize}px;height:${this.iconSize}px`
    },
    bgStyle() {
      if (this.url) return ''
      return `background-color: ${this.bgColor};`
    }
  },
  methods: {
    load(e) {
      this.$emit('load', e)
    }
  }
}
</script>
<style lang="stylus" scoped>
.icon-img {
  display: block;
  position: relative;
  border-radius: 5px;
  overflow: hidden;

  img{
    width: inherit;
    height: inherit;
  }

  .icon-default {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
