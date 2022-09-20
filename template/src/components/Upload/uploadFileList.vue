<template>
  <div class="download-list">
    <div class="download-item" v-for="(item, idx) in uploadList" :key="'download-item-upload-list-' + idx">
      <template v-if="item.status === 'finished'">
        <a class="download-name" :href="item.url" target="_blank" :download="item.name">{{ item.name }}</a>
        <Icon class="close-btn" type="md-close-circle" @click.native="handleRemove(item)"></Icon>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'uploadFileList',
  props: ['uploadList', 'handleRemove']
}
</script>
<style lang="stylus" scoped>
.download-list {
  margin-top: 10px;
  border: 1px solid #dddee1;
  border-bottom: none;
  border-radius: 4px;

  .download-item {
    padding: 0 $gutter_small;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid #dddee1;
    align-items: center;

    .download-name {
      text-overflow: emphasis;
      flex: auto;
      width: 0;
      white-space: nowrap;
      overflow: hidden;
    }

    .close-btn {
      color: $color_error;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>
