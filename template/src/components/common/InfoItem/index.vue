<!--
 * @Description: 详情页基础信息使用
 * @Author: Rico.刘一飞
 * @Date: 2019-01-08 14:53:11
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-09-27 16:10:01

 *  @params hide {Function} 控制当前项显示隐藏，参数为数据集合data,
                示例：{ name: this.$t('scriptv1.bankCode'), key: 'payerAcNo',
                    hide: (params) => params.payerType && params.payerType.code === 10
                },
 *  @params none {String} 缺省值，默认'-'
 *
 * TODO1:  2019.1.9 后续加多render函数支持
 * TODO1:  2019.7.22 后续加多hide参数支持函数传递
 -->

<template>
  <div>
    <Form inline :label-width="labelWidth">
      <Row>
        <Col :span="item.column || column" v-for="(item, index) in config" :key="index">
          <FormItem :label="item.name + '：'" :required="item.required" v-if="isHide(index)" class="chaosInfo">
            <span v-if="item.render">
              <Expand :key="index" :params="data" :render="item.render"></Expand>
            </span>
            <span v-else-if="item.isMoney">
              {{ Util.money(data[item.key] )}}
            </span>
            <span v-else-if="item.isDatetime">
              {{ data[item.key] | Datetime }}
            </span>
            <span v-else class="span-width-normal margin-right-gutter">{{ data[item.key] || none }}</span>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import Expand from './expand.js'
export default {
  name: 'InfoItem',
  props: {
    config: {
      type: Array,
      default: () => {
        return []
      }
    },
    column: {
      type: String,
      default: '12'
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    none: {
      type: String,
      default: '-'
    },
    labelWidth: {
      type: [Number, String],
      default: 200
    }
  },
  computed: {},
  methods: {
    isHide(index) {
      // 默认展示
      let hide = function() {
        return true
      }
      if (this.config[index].hide) hide = this.config[index].hide
      return hide(this.data)
    }
  },
  components: { Expand }
}
</script>

<style lang="stylus" scoped>
.span-width-normal
    width 280px !important
    white-space normal
    word-wrap break-word
    // word-break break-all
</style>
<style lang="stylus">
.chaosInfo.ivu-form-item {
  margin-bottom 0 !important
}
</style>
