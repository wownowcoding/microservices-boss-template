<template>
  <div v-if="title" class="user-select">
    <div v-if="!isTips && data && data.length" class="pts-wrapper">
      <h2 class="pts-title" v-text="title" />
      <ul v-if="data && data.length && !isTips">
        <li class="pts-tip" v-for="(item, itemIndex) in data" :key="'pts-tip-' + (itemIndex + 1)" v-html="item"></li>
      </ul>
      <div class="pts-switch" v-if="hasSwitch">
        <w-switch :value="val" @click="switchChangePage" manualSetting />
      </div>

      <div class="pts-line" v-if="!hasSwitch || val"></div>
      <div>
        <slot />
      </div>
    </div>
    <Card v-if="isTips || !isTips && !(data && data.length)" style="margin-bottom: 10px;">
      <h2 class="pts-title" v-text="title" />
      <ul v-if="isTips">
        <li class="pts-tip" v-for="(item, itemIndex) in __tips" :key="'pts-tip-' + (itemIndex + 1)" v-html="item"></li>
      </ul>
      <div class="pts-switch" style="margin-top: 10px;" v-if="hasSwitch">
        <w-switch :value="val" @click="switchChangePage" manualSetting />
      </div>
    </Card>
  </div>
</template>

<script>
import { Switch } from 'element-ui'

export default {
  name: 'PageTipSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    hasSwitch: {
      type: Boolean,
      default: false
    },
    tips: {
      type: [String, Array],
      default: () => ''
    },
    switchClick: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      val: false
    }
  },
  methods: {
    switchChangePage() {
      if (typeof this.switchClick === 'function') {
        const switchClickRet = this.switchClick(this.val);
        if (switchClickRet instanceof Promise) {
          switchClickRet.then(e => this.$set(this, 'val', !!e));
          return;
        }
        this.$set(this, 'val', !!switchClickRet);
        return;
      }
      this.val = !this.val;
    }
  },
  watch: {
    val(__val) {
      this.$emit('input', __val)
    },
    value: {
      handler() {
        this.val = this.value
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    isTips() {
      return Array.isArray(this.__tips) && this.__tips.length;
    },
    __tips() {
      return Array.isArray(this.tips) && this.tips || this.tips && [this.tips] || [];
    }
  },
  components: {
    [Switch.name]: Switch
  }
}
</script>
<style lang="stylus">
.pts-wrapper {
  position: relative;
}

.pts-title {
  margin-bottom: 10px;
  color: #333;
}

.pts-tip {
  margin-left: 24px;
  list-style: disc;
  line-height: 1.6;
  font-size: 12px;
}

.pts-switch {
  position: absolute;
  top: 0px;
  right: 10px;
}

.pts-line {
  margin: 10px 0;
  width: 100%;
  border-bottom: 1px solid #dcdee2;
}
</style>
