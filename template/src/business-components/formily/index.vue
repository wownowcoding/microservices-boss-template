<template>
  <div>
    <Form ref="form" v-bind="formConfig" :model="model" :rules="rules">
      <template v-for="item in config">
        <FormItem v-if="!item.hidden" :key="item.key" :label="item.label" :prop="item.prop || item.key">
          <Col v-bind="formConfig.layout">
            <template v-if="item.type === 'select'">
              <Select v-model="model[item.key]" v-bind="item.attrs">
                <Option v-for="(e) in item.options" :key="e.code" :label="e.message" :value="e.code"></Option>
              </Select>
            </template>
            <template v-if="item.type === 'text'">
              <Input v-bind="item.attrs" v-model="model[item.key]" />
            </template>
            <template v-if="item.type === 'textShow'">
              <span>{{ model[item.key] }}</span>
            </template>
            <template v-if="item.type === 'textarea'">
              <Input v-bind="item.attrs" v-model="model[item.key]" type="textarea" />
            </template>
            <template v-if="item.type === 'switch'">
              <i-switch v-model="model[item.key]" v-bind="item.attrs" />
            </template>
            <template v-if="item.type === 'buttons'">
              <Buttons v-model="model[item.key]" :disabled="item.attrs && item.attrs.disabled" :btns="item.options" v-bind="item.attrs" />
            </template>
            <template v-if="item.type === 'imagesBeforeUpload'">
              <ImagesBeforeUpload
                v-bind="item.attrs"
                :value="getFile(model[item.key])"
                @setModelValue="(files) => handleSetUploadFile(files, item)"
              />
            </template>
            <template v-if="item.type === 'upload'">
              <UploadFile
                :value="getFile(model[item.key])"
                :group="item.group || 'app'"
                :format="item.format || ['jpg', 'jpeg', 'png', 'gif']"
                :imgDisplayMode="true"
                :limit="item.limit"
                v-bind="item.attrs"
                @setModelValue="(files) => handleSetUploadFile(files, item)"
              />
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.key" v-bind:item="item" v-bind:model="model" v-bind:value="model[item.key]">
                {{ isDev ? '自定义插槽' + item.key : ''}}
              </slot>
              <!-- usage -->
              <!-- <template #slot="{item}">
                <p slot="slot">1212{{item}}</p>
              </template> -->
            </template>
            <p class="tips-text" v-if="item.attrs && item.attrs.tips">{{ item.attrs.tips }}</p>
          </Col>
          <slot :name="item.key + '-label'" slot="label" />
        </FormItem>
      </template>
    </Form>
  </div>
</template>

<script>
import UploadFile from '@/components/Upload/UploadFile.vue'
import ImagesBeforeUpload from '@/components/ImagesBeforeUpload/index'
import Buttons from './buttons'

export default {
  components: {
    UploadFile,
    ImagesBeforeUpload,
    Buttons
  },

  props: {
    formConfig: {
      type: Object,
      default: () => ({
        labelWidth: '120',
        labelPosition: 'right',
        showMessage: true,
        disabled: false,
        layout: {
          span: 16, 
          xs: 24,
          sm: 24, 
          md: 16, 
          lg: 12,
          xl: 12
        }
      })
    },
    data: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Array,
      default: () => []
    },
  },

  watch: {
    config: {
      immediate: true,
      handler() {
        if (!this._initConfig) {
          this.init()
        }
      }
    },
    data: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          if (val && Object.keys(val)) {
            let newVal = JSON.parse(JSON.stringify(val))
            for (let i = 0; i < this.config.length; i++) {
              const item = this.config[i]
              const { key } = item
              if (newVal[key] || typeof newVal[key] === 'boolean') {
                this.$set(this.model, key, newVal[key])
              }
            }
          }
        })
      }
    },
  },

  data() {
    return {
      model: {},
      rules: {},
      // eslint-disable-next-line no-undef
      isDev: process.env.NODE_ENV === 'development',
    }
  },

  methods: {
    init() {
      this._initConfig = true
      const config = this.config
      for (let i = 0; i < config.length; i++) {
        const item = config[i]
        const { default: defaultVal, key } = item
        if (defaultVal || this.data[key] || typeof defaultVal === 'boolean') {
          this.$set(this.model, key, defaultVal || this.data[key])
        }
        this.setRule(item)
      }
    },
    getFile(url) {
      let result = []
      if (url) {
        result.push({ url })
      }
      return result
    },
    setRule(configItem) {
      const { key, prop, required, rules } = configItem
      const finalProp = prop || key
      const result = []
      if (required) {
        result.push({ required: true, message: this.$t('tips.required') })
      }
      if (rules && Array.isArray(rules)) {
        result.push(...rules)
      }
      this.$set(this.rules, finalProp, result)
    },
    handleSetUploadFile(files, configItem) {
      const { key, attrs = { limit: 1 } } = configItem
      const { limit } = attrs
      let isMultiple = limit > 1 
      let defaultVal = isMultiple ? [] : ''
      if (!files || !files.length) {
        this.$set(this.model, key, defaultVal)
      } else {
        let value = isMultiple ? files.map(e => e.url) : files[0].url
        this.$set(this.model, key, value)
      }
    },
    getModel() {
      return this.model
    },
    getRules() {
      return this.rules
    },
    validate(cb) {
      this.$refs.form.validate((isValid) => {
        const model = this.getModel()
        cb(isValid, model)
      })
    },
    validateField(prop, cb) {
      return this.$refs.form.validateField(prop, cb)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tips-text {
  color: #999999;
  font-size: 12px;
  line-height: 1.75;
}
</style>