<template>
  <Form ref="form" :model="form" :rules="ruleCustom" :label-width="160" class="form-data" v-if="data.length">
    <FormItem
      v-for="(item, $index) in data"
      :key="item.key || `key${Date.now()}`"
      :label="getLabel(item.label)"
      :required="!!item.required"
      :prop="item.key"
      :rules="!!item.required ? {required: true, message: $t('tips.required'), trigger: 'blur'} : null"
    >
      <template v-if="item.type === 'imagesBeforeUpload'">
        <AddImages
          :disabled="disabled"
          @on-change="release(item.key)"
          group="app"
          v-model="form[item.key]"
          :fixed="item.fixed === undefined ? true : item.fixed"
          :autoCropWidth="item.autoCropWidth"
          :autoCropHeight="item.autoCropHeight"
          :maxSize="5 * 1024"
          :limit="1"
        ></AddImages>
      </template>
      <template v-else-if="item.type === 'file'">
        <AddUpload :disabled="disabled" @on-change="release(item.key)" v-model="form[item.key]" :pictureResolution="item.pictureResolution"></AddUpload>
      </template>
      <template v-else-if="item.type === 'color'">
        <el-color-picker @change="release(item.key)" :disabled="disabled" v-model="form[item.key]"></el-color-picker>
      </template>
      <template v-else-if="item.type === 'label'">
        <span>{{ form[item.key] || item.value }}</span>
      </template>

      <template v-else-if="item.type === 'radio'">
        <ButtonRadio :disabled="disabled" v-if="item.targetForm" size="default" v-model="item.targetForm[item.key]" :options="item.options" @change="e => item.change && item.change(e)"></ButtonRadio>
        <ButtonRadio :disabled="disabled" v-else size="default" v-model="form[item.key]" :options="item.options" @change="e => item.change && item.change(e)"></ButtonRadio>
      </template>

      <template v-else-if="item.type === 'select'">
        <Select clearable v-model="form[item.key]" :disabled="disabled || item.disabled" :placeholder="item.placeholder" style="width: 200px" @on-change="release(item.key)">
          <Option v-for="opt in item.options" style="text-transform: capitalize" :label="opt.message" :value="opt.code" :key="opt.code"></Option>
        </Select>
      </template>

      <template v-else-if="item.type === 'textarea'">
        <Input :disabled="disabled" @on-change="release(item.key)" type="textarea" v-model.trim="form[item.key]" :maxlength="item.maxlength" style="width: 200px"></Input>
      </template>

      <template v-else-if="item.type === 'text'">
        <Input :disabled="disabled || item.disabled" @on-change="release(item.key)" v-model.trim="form[item.key]" :value="item.value" :maxlength="item.maxlength" :placeholder="item.placeholder" clearable style="width: 200px" />
      </template>

      <template v-else-if="item.type === 'inputNumber'">
        <AddNumber :disabled="disabled" :min="item.min" :max="item.max" :precision="item.precision" :step="item.step" @on-change="release(item.key)" v-model="form[item.key]"></AddNumber>
      </template>

      <template v-else-if="item.type === 'switch'">
        <w-switch style="margin:0;" v-model="form[item.key]" :disabled="disabled"/>
      </template>

      <template v-else-if="item.type === 'dataSource'">
        <Select clearable v-model="form[item.key]" :disabled="disabled || item.disabled" :placeholder="item.placeholder" style="width: 200px" @on-change="release(item.key)">
          <Option v-for="opt in dataSource" style="text-transform: capitalize" :label="opt.dataResourceName" :value="opt.dataResourceValue" :key="opt.dataResourceValue"></Option>
        </Select>
      </template>

      <slot v-if="!item.type" :name="item.key || 'form'" :item="item"></slot>

      <template v-if="item.tip">
        <Tooltip :content="item.tip">
          <Icon type="ios-alert" style="font-size:24px;margin-left:10px;color:#f39322;"></Icon>
        </Tooltip>
      </template>
    </FormItem>
    <FormItem v-if="more">
      <div class="app-base-more" :class="{ active: showMore }" @click="showOrHideMore">
        {{ !showMore ? $t('v3_1_1.showMore') : $t('v3_1_1.shrinkMore') }}
        <Icon type="ios-arrow-down" />
      </div>
    </FormItem>
  </Form>
</template>

<script>
import AddImages from "./add-images.vue"
import AddUpload from "./add-upload.vue"
import AddNumber from "./add-number.vue"
import ButtonRadio from "./button-radio";
import { ColorPicker } from 'element-ui'
import { searchCmsDataResource } from './api'

export default {
  inject: ['onRelease'],
  props: {
    form: {
      type: Object,
      required: true
    },
    column: {
      type: Array
    },
    more: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    ruleCustom: {
      type: Object,
    },
  },
  data() {
    return {
      showMore: false,
      dataSource: []
    }
  },
  computed: {
    data() {
      return this.column.filter(item => {
        return !item.hidden
      })
    }
  },
  created() {
    searchCmsDataResource({
      pageNum: 1,
      pageSize: 1000
    }).then(res => {
      this.dataSource = res.data.list
    })
  },
  methods: {
    getLabel(val) {
      return `${val}${this.$t('v1.semicolon')}`;
    },
    showOrHideMore() {
      this.showMore = !this.showMore
      this.$emit('showOrHideMore', this.showMore)
    },
    release(key) {
      this.$emit('on-change')
      this.onRelease && this.onRelease(key)
    },
    validate() {
      return this.$refs.form.validate()
    }
  },
  components: {
    AddImages,
    AddUpload,
    AddNumber,
    ButtonRadio,
    [ColorPicker.name]: ColorPicker,
  }
}
</script>
<style>
.el-color-dropdown__value{
  width: 130px;
}
.el-color-dropdown__link-btn {
  margin-right: 5px;
  border: 1px solid #dcdcdc;
  color: #333;
  line-height: 24px;
  border-radius: 2px;
  padding: 0 20px;
  cursor: pointer;
  background-color: transparent;
  outline: 0;
  font-size: 12px;
  height: 26px;
}

.page-card-switch {
  display: flex;
  align-items: center;
  position: absolute;
  top: 6px;
  right: 16px;
  height: 28px;
  line-height: 28px;
}
</style>

