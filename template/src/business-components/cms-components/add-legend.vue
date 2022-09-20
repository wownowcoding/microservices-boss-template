<template>
  <div class="add-fieldset">
    <span v-if="title" class="add-legend">{{title}}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
}
</script>
<style lang="stylus" scoped>
.add-fieldset {
  margin-bottom: 10px;
  padding: 10px 0;
  border-radius: 10px;
  border: 1px solid #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}

.add-legend{
  display: block;
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
}
</style>
