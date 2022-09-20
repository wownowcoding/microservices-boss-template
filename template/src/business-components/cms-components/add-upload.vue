<template>
 <UploadFile :btnName="btnName" :disabled="disabled" :format="['jpg', 'jpeg', 'png', 'gif']" group="app" v-model="iconArr" :maxSize="maxSize" :limit="1" :pictureResolution="pictureResolution" :imgDisplayMode="true" />
</template>

<script>
import UploadFile from "@/components/Upload/UploadFile.vue";

export default {
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxSize: {
      type: Number,
      default: 15 * 1024
    },
    pictureResolution: {
      type: Object,
      default: function () {
        return { width: 3000, height: 3000 }
      }
    },
    btnName: {
      type: String
    },
  },
  computed: {
    iconArr: {
      get() {
        if (this.value) return [{ url: this.value }]
        return []
      },
      set(data) {
        const url = data.length > 0 ? data[0].url : ''
        this.$emit('input', url)
        this.$emit('on-change', url)
      }
    }
  },
  components: {
    UploadFile,
  }
}
</script>
<style lang="stylus" scoped></style>
