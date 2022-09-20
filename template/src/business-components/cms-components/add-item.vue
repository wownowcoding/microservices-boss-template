<template>
  <div class="cms-add-item" @click="$emit('click')">+</div>
</template>

<script>
export default {
}
</script>
<style lang="stylus" scoped>
.cms-add-item {
  padding 6px 10px
  width: 280px;
  line-height: 1;
  font-size: 24px;
  color: #999;
  text-align: center;
  border: 1px dashed #dcdcdc;
  border-radius: 5px;
  overflow: hidden;

  &:hover {
    cursor pointer
    color: #f39322;
    border-color: #f39322;
  }
}
</style>
