<template>
  <div class="i18n-wrap">
    <div class="input-wrapper">
      <p class="input-title" v-if="title">{{ title }}</p>
      <div class="input-items">
        <slot />
        <!-- <span>{{ $t("wm_3_0_5.title") }}</span>
        <Input
          v-model="model[item.titleKey]"
          show-word-limit
          :maxlength="32"
          :disabled="isDetail"
          :placeholder="item.titleTips"
        />
        <span>{{ $t("wm_3_0_5.content") }}</span>
        <Input
          v-model="model[item.descKey]"
          show-word-limit
          :maxlength="100"
          type="textarea"
          :rows="6"
          :disabled="isDetail"
          :placeholder="item.descTips"
        /> -->
        <template v-if="texts && texts.length">
          <div class="input-texts" v-for="(item, index) in texts" :key="index">
            <template v-if="item && typeof item === 'object'">
              <strong>{{ item.title }}：</strong>
              <span>{{ item.content }}</span>
            </template>
            <template v-else>
              <span>{{ item }}</span>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    texts: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
    keys: {
      type: Array,
      default: () => [
        'titleZh', 'contentZh',
        'titleEn', 'contentEn',
        'titleCb', 'contentCb',
      ]
    },
    values: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    value: {
      immediate: true,
      handler (val) {
        console.log('set model')
        console.log(val)
        this.model = val || {}
      }
    },
    keys: {
      immediate: false,
      handler(val) {
        if (val && val.length) {
          this.updateModelKey(val)
        }
      }
    },
  },


  data() {
    return {
      model: {},
      texts: [
        {
          name: "CH",
          titleKey: this.keys[0],
          descKey: this.keys[1],
          titleTips: this.$t("v8_1_1.maxLenTips", { msg: 32 }),
          descTips: this.$t("v8_1_1.maxLenTips", { msg: 100 }),
        },
        {
          name: "EN",
          titleKey: this.keys[2],
          descKey: this.keys[3],
          titleTips: this.$t("v8_1_1.maxLenTips", { msg: 32 }),
          descTips: this.$t("v8_1_1.maxLenTips", { msg: 100 }),
        },
        {
          name: "KM",
          titleKey: this.keys[4],
          descKey: this.keys[5],
          titleTips: this.$t("v8_1_1.maxLenTips", { msg: 32 }),
          descTips: this.$t("v8_1_1.maxLenTips", { msg: 100 }),

        },
      ],
    };
  },

  methods: {
    updateModelKey(keys) {
      this.texts.forEach((textItem, index) => {
        const roundIndex = index * 2
        this.$set(textItem, 'titleKey', keys[roundIndex])
        this.$set(textItem, 'descKey', keys[roundIndex + 1])
      })
    },
    handleInputChange(key, newVal) {
      // this.$emit('change', {
      //   key,
      //   value: newVal
      // })
    }
  },
};
</script>

<style lang="stylus" scoped>
.i18n-wrap {
  display flex;
}

.input-wrapper {
  width: 100%;
  margin-right: 10px;
  margin-bottom: 10px;
  // background-color: rgb(243, 243, 243);
  // border: 1px solid rgb(217, 217, 217);
  background-color: #f8f8f9;
  border: 1px solid #dcdee2;
  border-radius: 4px;

  .input-title {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #dcdee2;
    // border-bottom: 1px solid rgb(217, 217, 217);
  }

  .input-items {
    display: flex;
    flex-direction column;
    padding: 10px;

    .ivu-input-wrapper {
      margin-bottom: 6px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.input-texts {
  padding-left: 4px;
  // margin-top: -10px;
}

>>> .ivu-input-wrapper-disabled {
  .ivu-input {
    color: #808080;
  }
}
</style>
