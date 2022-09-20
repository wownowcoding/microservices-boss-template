<template>
  <Drawer
    v-show="isVShow"
    class="content-drawer-sdfjakgwle"
    :closable="closable"
    :title="title"
    v-model="isShow"
    :width="$root.contentSite.width - 8"
    :style="style"
    :mask="false"
    :mask-closable="false"
  >
    <div slot="header" v-if="isShowHeader" class="content-drawer-sdfjakgwle-header">
      <slot name="header" />
    </div>
    <div
      class="content-drawer-div"
    >
      <slot />
    </div>
  </Drawer>
</template>
<script>
export default {
  props: {
    closable: {
      type: Boolean,
      default: () => true
    },
    value: {
      type: Boolean,
      default: () => false
    },
    title: {
      type: String,
      default: () => ''
    },
    isShowHeader: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      isShow: false,
      isVShow: false,
      popstateEvent: undefined
    }
  },
  watch: {
    value(val) {
      if (val !== this.isShow) {
        this.$set(this, 'isShow', !!val);
      }
    },
    isShow(val) {
      if (val !== this.value) {
        this.$emit('input', !!val);
      }
      if (val) {
        this.$set(this, 'isVShow', !!val);
        this.setBackPopstate(() => {
          this.Util.timeout(() => {
            this.$set(this, 'isShow', false);
          }, 50);
        });
      } else {
        window.removeEventListener('popstate', this.popstateEvent);
        this.$set(this, 'popstateEvent', undefined);
        this.Util.timeout(() => {
          this.$set(this, 'isVShow', !!val);
        }, 500);
      }
    }
  },
  computed: {
    style() {
      return `height: ${this.$root.contentSite.height}px;`;
    }
  },
  methods: {
    //  设置返回按钮事件
    setBackPopstate(callback, isClear = true) {
      this.$set(this, 'popstateEvent', e => {
        if (isClear) {
          window.removeEventListener('popstate', this.popstateEvent);
        }
        typeof callback === 'function' && callback(e);
      });
      window.addEventListener('popstate', this.popstateEvent, false);
      window.history.pushState({
        title: document.title,
        url: window.location.href
      }, document.title, window.location.href);
      return this.popstateEvent;
    }
  }
}
</script>

<style lang="stylus" scoped>
  .content-drawer-sdfjakgwle-header {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
</style>

<style lang="stylus">
  .content-drawer-sdfjakgwle {
    .ivu-drawer {
      height: calc(100% - 40px);
      margin-top: 40px;
    }
    .ivu-drawer-wrap {
      z-index: 100;
    }
    .content-drawer-input {
      input {
        width: 200px;
      }
      textarea {
        resize none
      }
    }
  }
</style>