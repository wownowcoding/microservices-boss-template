<template>
  <div>
    <div v-if="!!value">
      <div v-for="(item, index) in labelList" :key="index">
        <span v-show="showKey">{{keyDict[item['key']]}} :</span>
        <span>{{item['label']}}</span>
      </div>
    </div>
    <div v-else>-</div>
  </div>
</template>
<script>
export default {
  name: 'lang-label',
  data() {
    return {}
  },
  props: {
    // 包含三语的map
    value: {
      type: [Object, String],
      default: () => { }
    },
    // 对应key展示出来的文案
    keyDict: {
      type: Object,
      default: () => {
        return {
          "en-US": 'En',
          "zh-CN": '中',
          "km-KH": 'ខ្មែរ',
        }
      }
    },
    showKey: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    labelList() {
      if (!this.value) return []
      const value = typeof (this.value) == 'string' ? JSON.parse(this.value) : this.value
      return Object.keys(value).map(key => {
        return { key, label: value[key] }
      })
    }
  }
};
</script>
