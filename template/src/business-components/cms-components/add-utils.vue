<template>
  <div class="cms-add-utils">
    <template v-if="option.showUpSelect">
      <Tooltip :content="upDisabled ? $t('scriptv1.a595bc1c59632a10a8d8fa3e53716cb15') : $t('scriptv1.c2f9058b7796907cb3033694a5a0a8590')" placement="right-start">
        <div class="cms-add-utils-item" @click="upItem" :class="{ disabled: upDisabled }">
          <img src="./images/up.png" class="cms-add-utils-icon" />
        </div>
      </Tooltip>
      <div class="cms-utils-line"></div>
    </template>

    <template v-if="option.showDownSelect">
      <Tooltip :content="downDisabled ? $t('scriptv1.a0423a9d1ae49fe9bd7df080c64ebb378') : $t('scriptv1.b989d41ad62f9a25c17b910735bf3763e')" placement="right-start">
        <div class="cms-add-utils-item" @click="downItem" :class="{ disabled: downDisabled }">
          <img src="./images/up.png" class="cms-add-utils-icon" style="transform: rotate(180deg);" />
        </div>
      </Tooltip>
      <div class="cms-utils-line"></div>
    </template>

    <template v-if="option.showUp">
      <Tooltip :content="upDisabled ? $t('v3_1_1.theCurrentItemIsAlreadyTheFirstItem') : selectUpTip" placement="right-start">
        <div class="cms-add-utils-item" @click="selectUpItem" :class="{ disabled: upDisabled }">
          <Icon type="md-arrow-round-up" />
        </div>
      </Tooltip>
      <div class="cms-utils-line"></div>
    </template>

    <template v-if="option.showDown">
      <Tooltip :content="downDisabled ? $t('v3_1_1.theCurrentItemIsTheLastItem') : selectDownTip" placement="right-start">
        <div class="cms-add-utils-item" @click="selectDownItem" :class="{ disabled: downDisabled }">
          <Icon type="md-arrow-round-down" />
        </div>
      </Tooltip>
      <div class="cms-utils-line"></div>
    </template>

    <template v-if="option.showRemove">
      <Tooltip :content="removeTip" placement="right-start">
        <div class="cms-add-utils-item" @click="removeItem" :class="{ disabled: removeDisabled }">
          <Icon type="md-trash" />
        </div>
      </Tooltip>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    len: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    selectUpTip: {
      type: String,
      default: '编辑上一项'
    },
    selectDownTip: {
      type: String,
      default: '编辑下一项'
    },
    removeTip: {
      type: String,
      default: '下架当前项'
    },
    option: {
      type: Array,
      default: () => ({
        showUpSelect: true,
        showDownSelect: true,
        showUp: true,
        showDown: true,
        showRemove: true,
      })
    }
  },
  computed: {
    upDisabled() {
      return this.index <= 0
    },
    downDisabled() {
      if (this.index < 0) return true
      return this.index >= this.len - 1
    },
    removeDisabled() {
      if (this.index < 0) return true
      return this.len < 1
    }
  },
  methods: {
    upItem() {
      if (this.upDisabled) return
      this.$emit('up')
    },
    downItem() {
      if (this.downDisabled) return
      this.$emit('down')
    },
    selectUpItem() {
      if (this.upDisabled) return
      this.$emit('selectUp')
    },
    selectDownItem() {
      if (this.downDisabled) return
      this.$emit('selectDown')
    },
    removeItem() {
      if (this.removeDisabled) return
      this.$emit('remove')
    }
  }
}
</script>
<style lang="stylus" scoped>
.cms-add-utils {
  width: 25px;
  border-bottom-right-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);

  .cms-add-utils-item {
    width: 25px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #999;
    font-size: 14px;
    transition: transform 0.3s;

    &.disabled {
      color: #dcdcdc !important;
      background-color: #f6f6f6;

      img {
        opacity: 0.4 !important;
      }
    }

    &:hover {
      color: #f39322;
      cursor: pointer;
      img {
        opacity: 0.68;
      }
    }
  }
}

.cms-utils-line {
  margin: 0 2px;
  height: 1px;
  background-color: #dcdcdc;
}

.cms-add-utils-icon {
  width: 16px;
  height: 16px;
}
</style>
