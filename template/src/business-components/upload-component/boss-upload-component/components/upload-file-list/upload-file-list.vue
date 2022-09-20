<template>
  <div class="download-list">
    <div
      class="download-item"
      v-for="(item, idx) in uploadList"
      :key="'download-item-upload-list-' + (idx + 1)"
    >
      <template v-if="item.status === 'finished'">
        <a class="download-name" :href="item.url" target="_blank" :download="item.name" v-text="item.name" />
        <Icon class="close-btn" type="md-close-circle" @click.native="handleRemove(item)" />
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info />
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    uploadList: {
      type: Array,
      default: () => []
    },
    handleRemove: {
      type: Function,
      default: () => () => {}
    }
  }
}
</script>
<style lang="stylus" scoped>
.download-list {
  margin-top: 10px;
  border: 1px solid #dddee1;
  border-bottom: none;
  border-radius: 4px;
}

.download-item {
  padding: 0 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 1px solid #dddee1;
  align-items: center;
}

.download-name {
  text-overflow: emphasis;
  flex: auto;
  width: 0;
  white-space: nowrap;
  overflow: hidden;
}

.close-btn {
  color: #ed3f14;
  font-size: 16px;
  cursor: pointer;
}
</style>
