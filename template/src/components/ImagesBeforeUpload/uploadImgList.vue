<template>
  <div class="img-list" v-viewer>
    <div class="img-wrapper margin-right-gutter" v-for="(item, idx) in uploadList" :key="idx">
      <img :src="item.url" />
      <div v-if="fileInfo" class="img-info" @click="handleInfo(item)">
        {{ fileNote }}
        <Icon style="color: #fff" type="md-information-circle" />
      </div>
      <div class="img-list-action" v-if="limit > 1">
        <div class="img-list-item">
          <div class="img-list-see" @click.stop.prevent="handleImg(idx)"></div>
        </div>
        <div class="img-list-item" v-if="imagesMap[item.url]">
          <div class="img-list-cut" @click.stop.prevent="handleCut(item)"></div>
        </div>
        <div class="img-list-item">
          <Icon type="md-close-circle" @click.stop.prevent="handleRemove(item)"></Icon>
        </div>
      </div>
      <Icon v-else class="i-red" type="md-close-circle" @click.native="handleRemove(item)"></Icon>
    </div>
  </div>
</template>
<script>
export default {
  name: 'uploadFileList',
  data() {
    return {
      visible: false
    }
  },
  props: ['uploadList', 'handleRemove', 'handleInfo', 'fileInfo', 'fileNote', 'limit', 'imagesMap'],
  methods: {
    handleView(url) {
      this.imgUrl = url;
      this.visible = true;
    },
    handleCut(item) {
      this.$emit('handleCut', item)
    },
    handleImg(index) {
      const imgs = this.$el.querySelectorAll('img')
      if (imgs && imgs[index]) {
        imgs[index].click()
      }
    }
  }
};
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
  position: relative;
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
      z-index: 200;
    }

    &:hover .i-red {
      visibility: visible;
    }

    &:hover .img-info {
      visibility: visible;
    }

    &:hover {
      .img-list-action {
        display: flex;
      }
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

.img-list-action {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  .img-list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.62);
    color: #bebebe;

    &:hover {
      .img-list-see,
      .img-list-cut,
      i{
        cursor: pointer;
        opacity: 0.62;
      }
    }
  }
  .img-list-cut{
    width: 14px;
    height: 14px;
    background: url("./images/cut.png") no-repeat;
    background-size: 100% 100%;

  }
  .img-list-see {
    width: 14px;
    height: 14px;
    background: url("./images/see.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
