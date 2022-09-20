<template>
  <span ref="wrapper" class="wrapper" v-viewer>
    <img
      v-for="(image, index) in srcList"
      :key="index"
      :class="classes"
      :src="image"
      v-show="!!image"
      :style="{'min-width':`${minWidth}px`,'min-height':`${minHeight}px`,'max-width':`${maxWidth}px`,'max-height':`${maxHeight}px`}"
    />
  </span>
</template>
<script>
export default {
  name: "previewImg",
  props: {
    // 2.9.18.0 新增,支持传入图片链接集合
    src: {},
    maxWidth: {
      default: 200
    },
    maxHeight: {
      default: 32
    },
    minWidth: {
      default: 0
    },
    minHeight: {
      default: 0
    },
  },
  data() {
    return {
      // maxWidth: 200,//暂时的解决方案是订个最大宽
      isShowMax: false
    };
  },
  // mounted() {
  //     console.log(this.maxWidth)
  // },
  computed: {
    classes() {
      return [this.class, "previewImg", this.srcList.length > 1 ? "margin-right-gutter" : ""];
    },
    srcList() {
      return this.Util.isType('Array')(this.src) ? this.src : [this.src]
    },
  },
  methods: {
    // toggleMax() {
    //     this.isShowMax = !this.isShowMax;
    // }
  }
};
</script>
<style lang="stylus" scoped>
.wrapper
  display inline-block
  .previewImg
    cursor zoom-in
    box-shadow 0 1px 6px rgba(0, 0, 0, 0.2)
    border-color #eee
    &.list
      margin 5px 12px
</style>
