<template>
  <div class="img-list" v-viewer>
    <div class="img-wrapper margin-right-gutter" v-for="(item, idx) in uploadList" :key="'margin-right-gutter-' + idx">
      <template v-if="item.status === 'finished'">
        <img :src="item.url" />
        <div v-if="fileInfo" class="img-info" @click="handleInfo(item)">
          {{ fileNote }}
          <Icon style="color: #fff" type="md-information-circle" />
        </div>
        <Icon class="i-red" type="md-close-circle" @click.native="handleRemove(item)"></Icon>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  props: ['uploadList', 'handleRemove', 'handleInfo', 'fileInfo', 'fileNote'],
  methods: {
    handleView(url) {
      this.imgUrl = url
      this.visible = true
    }
  }
}
</script>
<style lang="stylus" scoped>
.img-info {
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  z-index: 9999;
  cursor: pointer;
  color: #ffffff;
  user-select: none;
  text-align: center;
  line-height: 30px;
  background-color: #707980;
}

.img-list {
  display: flex;
  flex-wrap: wrap;

  .img-wrapper {
    margin-top: 10px;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    position: relative;
    overflow: hidden;

    & .i-red {
      visibility: hidden;
      color: red;
      font-size: 16px;
      cursor: pointer;
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 2;
    }

    &:hover .i-red {
      visibility: visible;
    }

    &:hover .img-info {
      visibility: visible;
    }

    .inner {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      cursor: pointer;
    }

    .inner:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }

    .inner i {
      visibility: hidden;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 2;
    }

    .inner:hover i {
      visibility: visible;
    }
  }
}
</style>
