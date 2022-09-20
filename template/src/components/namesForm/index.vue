<template>
  <Form ref="form" :model="form" :rules="ruleCustom" label-position="top" class="names-form-view">
    <Row>
      <Col span="8">
        <FormItem label="" prop="name">
          <Input v-model="form.name" :maxlength="maxlength" :disabled="disabled">
            <span slot="prepend">English</span>
          </Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="" prop="nameZh">
          <Input v-model="form.nameZh" :maxlength="maxlength" :disabled="disabled">
            <span slot="prepend">中文</span>
          </Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="" prop="nameKm">
          <Input v-model="form.nameKm" :maxlength="maxlength" :disabled="disabled">
            <span slot="prepend">ខ្មែរ</span>
          </Input>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script>
import { validRequired, validateName } from "@/utils/validator";
import formVModel from '@/utils/form-v-model';
const defaultRuleCustom = [{ required: true, validator: validRequired, trigger: 'blur' }, { required: true, validator: validateName, trigger: 'blur' }]
export default {
  mixins: [formVModel],
  props: {
    value: {
      type: Object,
      default() {
        return {};
      }
    },
    maxlength: {
      type: Number,
      default: 999999
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        //  英文名
        name: '',
        //  柬文名
        nameKm: '',
        //  中文名
        nameZh: ''
      }
    };
  },
  computed: {
    ruleCustom() {
      return {
        //  英文名
        name: defaultRuleCustom,
        //  柬文名
        nameKm: defaultRuleCustom,
        //  中文名
        nameZh: defaultRuleCustom
      };
    }
  },
  methods: {
    validAll() {
      return this.$refs.form.validate();
    }
  }
}
</script>

<style lang="stylus">
  .names-form-view {
    width: 100%;
    margin-top: 4.5px;
    .ivu-col-span-8 {
      box-sizing: border-box;
      padding: 0 10px;
    }
    .ivu-form-item-label:before {
      display: none !important;
    }
  }
</style>
