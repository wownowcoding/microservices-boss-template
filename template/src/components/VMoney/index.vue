<template>
  <span class="money" :style="style">
    <!-- 展示模式 -->
    <span v-if="!editAble" class="money-text">
      <!-- 有值 -->
      <template v-if="value">
        <span v-if="currencyDisplay === 'prev'" class="money-text-prev-currency">{{prevCurrency}}</span>
        <span class="money-text-amount">{{value['amount'] | AmtThousandsFmt}}</span>
        <span
          v-if="currencyDisplay === 'append'"
          class="money-text-append-currency"
        >{{appendCurrency}}</span>
      </template>
      <!-- 无值显示placeholder -->
      <template v-else>{{placeholder}}</template>
    </span>
    <!-- 文本框模式 -->
    <span class="money-input" v-else>
      <!-- TODO 实现下拉框切换币种 -->
      <!-- TODO 实现输入金额输入框 -->
      <!-- TODO 金额格式化 -->
    </span>
  </span>
</template>
<script>
export default {
  name: 'Money',
  data() {
    return {
      currencyFlagDict: {
        'USD': '$',
        'KHR': '៛',
      }
    }
  },
  props: {
    /**
     * @desc 与后端约定的Money类
     *  {
     *    amount: 金额
      *   cent: 金额(分)
      *   centFactor: 分位单位
      *   currency: 币种符号,必为大写 例:"USD" "KHR"
      *   md5: 预留
      *   rsa: 预留
     *  }
     */
    value: {
      type: Object,
      default: () => { }
    },
    // 是否可编辑,可编辑则变成文本框
    editAble: {
      type: Boolean,
      default: false
    },
    // 币种符号展示形式
    currencyDisplay: {
      type: String,
      default: 'prev'     // 'prev','append','null'
    },
    // 无值的缺省文案
    placeholder: {
      type: String,
      default: '-'
    },
    style:  {
      type: Object,
      default:() => {}
    }

  },
  model: {
    props: 'value',
    event: 'input',
  },
  computed: {
    // 前置币种符号
    prevCurrency() {
      return !!this.value ? this.currencyFlagDict[this.value.currency] : ''
    },
    // 后置币种符号
    appendCurrency() {
      return !!this.value ? this.value.currency : ''
    },
  }
};
</script>
<style lang="stylus" scoped>
.money
  &-text
    display inline-block
    &-prev-currency
        margin-right 1px
    &-append-currency
        margin-left 1px
</style>
