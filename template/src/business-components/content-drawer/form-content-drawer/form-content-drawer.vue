<template>
  <!--
    demo: client-manager-system/src/page/business-management/payment-management/payment-tools/components/tools-modal
    url: /boss/payment-management/payment-tools/list
    path: /payment-management/payment-tools/list
  -->
  <ContentDrawer ref="contentDrawer" v-model="isShow" isShowHeader :closable="false" class="content-drawer-fsdfhskjfhlkfh">
    <div slot="header" class="form-content-drawer-header user-select">
      <div class="form-content-drawer-buttons">
        <Button @click="isShow = false">{{ $t('btn.back') }}</Button>
        <div style="display: inline-block;" v-if="isShowSave">
          <slot name="button-list" >
            <Button :loading="loading" type="primary" @click="submit">{{ $t('btn.save') }}</Button>
          </slot>
        </div>
      </div>
      <div class="form-content-drawer-title" v-text="title" />
    </div>
    <slot name="header-slot" />
    <BasicFormComponent :slotComponents="slotComponents" ref="basicFormComponent" :formList="formList" v-if="isShow" @onload="onload()" :labelWidth="labelWidth">
      <div v-for="(e, i) in slotComponents" :key="'slot-components-' + (i + 1)" :slot="e.field">
        <slot :name="e.field"  />
      </div>
    </BasicFormComponent>
  </ContentDrawer>
</template>

<script>
import ContentDrawer from '../content-drawer.vue';
import BasicFormComponent from '../basic-form-component';

export default {
  props: {
    //  标题
    title: {
      type: String,
      default: () => ''
    },
    //  动态表单数组
    formList: {
      type: Array,
      default: () => []
    },
    //  控制 contentDrawer 限制的对象
    value: {
      type: Boolean,
      default: () => false
    },
    labelWidth: {
      type: [Number, String],
      default: () => 120
    },
    //  是否展示保存按钮
    isShowSave: {
      type: Boolean,
      default: () => true
    }
  },
  computed: {
    //  将动态表单需要拓展的字段组件抛出 slot 数组来遍历继承
    slotComponents() {
      return this.formList.filter(e => e.component === 'slot');
    }
  },
  watch: {
    value(val) {
      if (val !== this.isShow) {
        this.$set(this, 'isShow', !!val)
      }
    },
    isShow(val) {
      if (val !== this.value) {
        this.$emit('input', !!val);
      }
      if (!val) {
        this.$nextTick(() => {
          this.loading = false;
        });
      }
    }
  },
  components: {
    ContentDrawer, BasicFormComponent
  },
  data() {
    return {
      isShow: false,
      loading: false
    }
  },
  methods: {
    checkFunction(currentRef, functionName, args) {
      !this.$refs[currentRef] && this.Util.timeout(() => {
        this.$refs[currentRef] && this.$refs[currentRef][functionName](...args);
      }, 50) || this.$refs[currentRef] && this.$refs[currentRef][functionName](...args);
    },
    setFormValidate(...args) {
      this.checkFunction('basicFormComponent', 'setFormValidate', args);
    },
    getFormRef() {
      return this.$refs.basicFormComponent;
    },
    resetFields(...args) {
      this.checkFunction('basicFormComponent', 'resetFields', args);
    },
    confirm(...args) {
      this.checkFunction('basicFormComponent', 'confirm', args);
    },
    onload() {
      this.$nextTick(() => this.$emit('onload'));
    },
    validateForm(...args) {
      this.checkFunction('basicFormComponent', 'validateForm', args);
    },
    submit() {
      if (this.$refs.basicFormComponent && !this.loading) {
        this.loading = true;
        this.$nextTick(() => {
          this.$refs.basicFormComponent.submit().then(data => {
            if (data) {
              this.$emit('submit', data, () => {
                this.$Message.success(this.$t('tips.successful_operation'));
                this.loading = false;
              }, () => {
                this.loading = false;
              });
            } else {
              this.loading = false;
            }
          });
        });
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .form-content-drawer-header {
    position: relative;
  }
  .form-content-drawer-title {
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(0%, -50%);
    display: inline-block;
    font-size: 18px;
    color: #17233d;
    font-weight: bold;
  }
  .copy-txt-class {
    cursor: pointer;
    transition: all .3s;
  }
  .copy-txt-class:hover {
    color: blue;
  }
</style>
<style lang="stylus">
  .content-drawer-fsdfhskjfhlkfh {
    .ivu-btn {
      margin: 0 5px 0 0;
    }
    .ivu-form-item {
      margin-bottom: 6px;
      transition: all .3s;
    }
    .ivu-form-item-error {
      margin-bottom: 24px !important;
      .component-slot {
        border: 0.5px solid #ed4014;
        min-width: 100%;
        min-height: 32px;
      }
    }
  }
</style>
