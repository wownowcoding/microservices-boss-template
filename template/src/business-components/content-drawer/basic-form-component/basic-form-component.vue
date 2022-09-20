<template>
  <transition mode="out-in">
    <Form v-if="!resetForm" ref="form" autocomplete="on" :model="formValidate" :rules="ruleCustom" :label-width="labelWidth" class="basic-form-component-fjksdlhflsdhf">
      <component
        :is="e.component === 'divider' ? 'el-divider' : 'wownow-form-item'"
        :item="e"
        :formValidate="formValidate"
        v-for="(e, i) in viewFormList"
        :key="'basic-form-item-' + (i + 1) + e.field"
        :itemKey="'basic-form-item-' + (i + 1) + e.field"
        content-position="left"
      >
        <span class="divider-title" v-if="e.component === 'divider'" v-text="e.divider" :style="e.style || ''" />
        <div v-for="(e, i) in slotComponents" :key="'slot-components-' + (i + 1)" :slot="e.field">
          <slot :name="e.field"  />
        </div>
      </component>
    </Form>
  </transition>
</template>

<script>
import { validRequired, validateTimeRange, validListRequired } from '@/utils/validator';
import { Divider }  from 'element-ui';
import FormItem from './components/form-item';
Vue.use(Divider);

export default {
  props: {
    slotComponents: {
      type: Array,
      default: () => []
    },
    formList: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: [Number, String],
      default: () => 120
    }
  },
  computed: {
    formListDataSourceString() {
      return JSON.stringify(this.formList.map(e => Object.fromEntries(Object.entries(e).filter(q => q[0] !== 'value'))));
    },
    viewFormList() {
      const __viewFormList = [];
      const data = JSON.parse(this.formListDataSourceString)
      for (let i = 0; i < data.length; i++) {
        const e = data[i]
        const formItem = this.formList[i]
        if (e.divider) {
          __viewFormList.push({
            component: 'divider',
            divider: e.divider
          });
        }
        if (formItem.field === e.field) {
          e.render = formItem.render
          e.validator = formItem.validator
          e.click = formItem.click
        }
        __viewFormList.push(e);
      }
      return __viewFormList;
    },
    formMap() {
      return Object.fromEntries(this.currentFormList.filter(e => !!e.watch).map(e => [e.field, e]));
    },
    currentFormList() {
      return this.formList.map(e => {
        if (e.component === 'date-picker') {
          if (e.currentTime && !(e?.options?.disabledDate)) {
            if (!e.options) {
              e.options = {};
            }
            e.options.disabledDate = date => date && date.valueOf() < Date.now() - 86400000;
          }
        }
        return e;
      });
    },
    ruleCustom() {
      return Object.fromEntries(
        this.viewFormList
          .map(e => {
            if (e.required) {
              if (['timerange', 'timer'].indexOf(e.component) !== -1 || e.component === 'date-picker' && e.type === 'daterange') {
                return e.required === true && [e.field, { required: true, validator: (rule, value, callback) => validateTimeRange(value, callback), trigger: 'blur' }] || [e.field, e.required]
              }
              if (e.required === 'array') {
                return [e.field, { required: true, validator: validListRequired, trigger: 'blur' }];
              }
              if (e.validator) {
               return e.required === true && [e.field, [{ required: true, validator: (rule, value, callback) => {
                 return e.validator(this.formValidate, callback)
               }, trigger: 'blur' }]];
              }
              return e.required === true && [e.field, { required: true, validator: validRequired, trigger: 'blur' }] || [e.field, e.required];
            }
            return [e.field, { required: false }];
          })
      )
    }
  },
  watch: {
    formListDataSourceString(val, oldVal) {
      this.goResetForm();
    },
    currentFormList(val) {
      this.$set(this, 'formValidate', Object.fromEntries(val.map(e => {
        let value = this.formValidate[e.field];
        if (value === undefined || value === null) {
          value = e.component === 'switch' ? false : '';
        }
        return [e.field, value];
      })))
    },
    formValidate: {
      handler: function (val) {
        const oldForm = {};
        Object.keys(val).forEach(e => {
          if (val[e] !== this.formValidateOld[e]) {
            oldForm[e] = {
              val: val[e],
              old: this.formValidateOld[e]
            }
          }
        });
        for (const e of Object.keys(oldForm)) {
          if (this.formMap[e] && this.formMap[e].watch && typeof this.formMap[e].watch === 'function') {
            if (this.watchList.indexOf(e) === -1) {
              if (!(!this.formMap[e].component || this.formMap[e].component && ['textarea', 'slot'].indexOf(this.formMap[e].component) !== -1)) {
                this.goResetForm();
              }
              this.formMap[e].watch(oldForm[e].val, oldForm[e].old, (ret) => {
                if (!!ret || ret === false || ret === '') {
                  this.watchList.push(e);
                  this.$set(this.formValidate, e, ret);
                  this.$nextTick(() => {
                    this.watchList.splice(this.watchList.indexOf(e), 1);
                  });
                }
              });
            }
          }
        }
        this.$nextTick(() => {
          this.Util.timeout(() => {
            Object.keys(oldForm).forEach(e => {
              this.formValidateOld[e] = oldForm[e].val;
            });
            if (this.validateStatus) {
              this.goResetForm();
            }
          }, 10);
        });
      },
      deep: true
    }
  },
  components: {
    [FormItem.name]: FormItem
  },
  mounted() {
    this.$nextTick(() => this.init());
  },
  data() {
    const formValidateString = JSON.stringify({})
    return {
      formValidateString,
      formValidate: JSON.parse(formValidateString),
      formValidateOld: JSON.parse(formValidateString),
      watchList: [],
      resetForm: false,
      validateStatus: false
    }
  },
  methods: {
    goResetForm() {
      this.validateStatus = false;
      this.$set(this, 'resetForm', true);
      this.$nextTick(() => this.Util.timeout(() => {
        this.resetForm = false;
      }, 5));
    },
    //  更新某个表单值
    setFormValidate(key, value) {
      this.validateStatus = false;
      if (Object.keys(this.formValidate).indexOf(key) !== -1) {
        this.$set(this.formValidate, key, value);
      }
    },
    //  更新表单的错误信息
    resetFields() {
      this.$refs?.form?.resetFields();
    },
    //  规范化弹框函数
    confirm(options = {}) {
      const { onOk, onCancel, title, tips } = options;
      if (title && typeof onOk === 'function') {
        const confirmOption = {
          title,
          okText: this.$t('btn.save'),
          cancelText: this.$t('btn.cancel'),
          onOk
        };
        if (tips) {
          confirmOption.content = tips;
        }
        if (typeof onCancel === 'function') {
          confirmOption.onCancel = onCancel;
        }
        this.$Modal.confirm(confirmOption);
      }
    },
    //  初始化
    init() {
      this.formList.forEach(e => {
        if (e.component === 'switch') {
          this.$set(this.formValidate, e.field, e?.value ?? false);
        } else {
          this.$set(this.formValidate, e.field, e?.value ?? (e.required === 'array' && [] || ''));
        }
      });
      this.$set(this, 'formValidateOld', JSON.parse(JSON.stringify(this.formValidate)));
      this.$nextTick(() => this.$emit('onload'));
    },
    //  校验表单
    validateForm(callback) {
      this.validateStatus = true;
      return this?.$refs?.form?.validate(callback);
    },
    //  获取表单数据
    submitFormData() {
      const newFormData = {};
      this.formList.forEach(e => {
        if (!e.disabled) {
          if (!e.formField) {
            newFormData[e.field] = this.formValidate[e.field];
          } else if (e.formField && Array.isArray(e.formField) && Array.isArray(this.formValidate[e.field])) {
            e.formField.forEach((f, i) => {
              newFormData[f] =  this.formValidate[e.field][i];
            });
          }
        }
      });
      return newFormData;
    },
    //  先校验再获取表单数据
    submit() {
      return new Promise(resolve => {
        try {
          this.validateForm(valid => !!valid && resolve(this.submitFormData()) || resolve(false)).catch(err => {
            console.log('basic-form-component validateForm error: ', err);
            resolve(false);
          });
        } catch(err) {
          console.log('basic-form-component submit error: ', err);
          resolve(false);
        }
      });
    }
  }
}
</script>

<style lang="stylus">
  .basic-form-component-fjksdlhflsdhf {
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
