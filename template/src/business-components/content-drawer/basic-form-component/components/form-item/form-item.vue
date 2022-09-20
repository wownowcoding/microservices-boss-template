<template>
  <FormItem
    :label="item.label + labelTag"
    v-show="!item.hidden"
    :prop="item.field"
    class="content-drawer-input"
    :key="itemKey"
  >
    <!-- 单个输入框 -->
    <Input :key="itemKey" v-if="!item.component" v-model="formValidate[item.field]" :disabled="!!item.disabled" :readonly="!!item.readonly" :style="item.style || ''" />

    <!-- 开关 -->
    <FormSwitch :key="itemKey" v-if="item.component === 'switch'" v-model="formValidate[item.field]" :disabled="!!item.disabled" :click="item.click || undefined" :style="item.style || ''" />

    <!-- 多行输入框 -->
    <Input :key="itemKey" v-if="item.component === 'textarea'" type="textarea" style="max-width: 500px;" v-model="formValidate[item.field]" :autosize="{ minRows: 5, maxRows: 10 }" :disabled="!!item.disabled" :style="item.style || ''" />

    <!-- 多按钮平铺实现下拉框逻辑 -->
    <WownowSelect :key="itemKey" v-if="item.component === 'select'" v-model="formValidate[item.field]" :options="item.options" :disabled="!!item.disabled" :readonly="!!item.readonly" :style="item.style || ''" />

    <!-- 单日期选择 -->
    <FormDatePicker :key="itemKey" v-if="item.component === 'date-picker'" :style="item.style || ''" v-model="formValidate[item.field]" :item="item" />

    <!-- 单日期选择 -->
    <FormTimePicker :key="itemKey" :style="item.style || ''" v-if="item.component === 'timerange'" v-model="formValidate[item.field]" />

    <FormTimer :key="itemKey" :style="item.style || ''" v-if="item.component === 'timer'" v-model="formValidate[item.field]" :format="item.format" :disabled="!!item.disabled" />

    <FormTxtList :key="itemKey" :style="item.style || ''" v-if="item.component === 'list-input'" v-model="formValidate[item.field]" :disabled="!!item.disabled" :maxLength="item.maxLength || 10" />

    <FormUploadFile
      v-if="item.component === 'upload-file'"
      v-model="formValidate[item.field]"
      :options="item.options"
      :style="item.style || ''"
      :key="itemKey"
      :isSwitched="item.isSwitched"
    />

    <div class="component-slot" :key="itemKey" v-if="item.component === 'slot'" :style="item.style || ''">
      <slot :name="item.field"  />
    </div>

    <UploadExecl :key="itemKey" :style="item.style || ''" v-if="item.component === 'upload-execl'" v-model="formValidate[item.field]" :templateUrl="item.templateUrl || ''" :fileFilterKeys="item.fileFilterKeys" />

    <FormText :key="itemKey" :style="item.style || ''" v-if="item.component === 'txt'" :isCopy="!!item.copy" v-model="formValidate[item.field]" />

    <ExtendSlot v-if="item.component === 'render'" :form="formValidate" :item="item" :render="item.render"></ExtendSlot>
  </FormItem>
</template>

<script>
const WownowSelect = resolve => import('../wownow-select').then(resolve);
const UploadExecl = resolve => import('../upload-execl').then(resolve);
const FormSwitch = resolve => import('../form-switch').then(resolve);
const FormTimer = resolve => import('../form-timer').then(resolve);
const FormText = resolve => import('../form-text').then(resolve);
const FormUploadFile = resolve => import('../form-upload-file').then(resolve);
const FormDatePicker = resolve => import('../form-date-picker').then(resolve);
const FormTxtList = resolve => import('../form-txt-list').then(resolve);
const ExtendSlot = {
  functional: true,
  props: {
    form: Object,
    item: Object,
    render: Function
  },
  render: (h, data) => {
    const params = { ...data.props }
    return data.props.render(h, params)
  }
}
export default {
  name: 'wownow-form-item',
  props: {
    itemKey: {
      type: String,
      default: () => ''
    },
    item: {
      type: Object,
      default: () => ({})
    },
    formValidate: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    WownowSelect, UploadExecl, FormSwitch, FormTimer, FormText, FormUploadFile, FormDatePicker, ExtendSlot, FormTxtList
  },
  computed: {
    labelTag() {
      return this.$i18n.locale === 'zh' && '：' || ':';
    }
  }
}
</script>
