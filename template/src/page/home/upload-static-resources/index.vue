<template>
  <div class="p20 scroll-touch">
    <Upload
      multiple
      type="drag"
      :action="fileUrl"
      :on-success="onSuccess"
      :on-remove="onRemove"
    >
      <div class="upload-box">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" />
        <p>Click or drag files here to upload</p>
      </div>
    </Upload>
    <div class="file-scroll">
      <Card
        v-for="(e, i) in defaultFileList"
        :key="'default-file-list-' + (i + 1)"
        class="file-item-card display-middle"
      >
        <div class="card-item">
          <div class="card-item-img" v-viewer>
            <img class="file-item-card-img position-center" :src="e && e.response && isImg(e.name) && e.response.data || 'https://img.tinhnow.com/wownow/files/sit/app/M89/89/50/4E/1cc47ba0c22511ecb72baf1dd5d7bd06.png'" />
          </div>
          <div class="name-copy overflow" @click="copyStr(e.response.data)">{{ e.name }}</div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { upload } from '@/api/file';
export default {
  data() {
    return {
      fileUrl: `${upload.replace('/upload-assets', '/wownow-upload-assets')}?group=app`,
      defaultFileList: []
    }
  },
  methods: {
    isImg: fileName => /\.(jpg|jpeg|png|gif|jpg|png)$/.test(fileName.toLocaleLowerCase()),
    copyStr(msg) {
      import('@/utils/clipboard').then(({ copyString }) => copyString(msg));
    },
    onRemove(file, fileList) {
      this.$set(this, 'defaultFileList', fileList.filter(e => e && e.response && e.response.data));
    },
    onSuccess(response, file, fileList) {
      this.$set(this, 'defaultFileList', fileList.filter(e => e && e.response && e.response.data));
    }
  }
}
</script>


<style scoped lang="stylus">
.file-item-card {
  width: 300px;
  text-align: center;
  margin: 10px 10px 0 0;
}
.file-scroll {
  width: 100%;
}
.p20 {
  padding: 20px;
  width: 100%;
  height: 100%;
}

.file-item-card-img {
  width: 166px;
}
.card-item {
  width: 100%;
  height: 100%;
  position: relative;
}
.card-item-img {
  width: 166px;
  height: 166px;
  position: relative;
  overflow hidden
  display: inline-block
}
.name-copy {
  cursor pointer
  padding-top: 10px;
  transition: all .3s;
}
.name-copy:hover {
  color: rgb(51, 153, 255);
}

.upload-box {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>