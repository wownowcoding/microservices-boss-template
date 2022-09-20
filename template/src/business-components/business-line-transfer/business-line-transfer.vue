<template>
  <Transfer v-if="businessLineList.length" :data="businessLineList" ref="businessLineList" :target-keys="targetKeys" @on-change="handleChange" @on-selected-change="selectChange" :titles="[$t('v3_1_1.selectAll'), $t('v3_1_1.cancelAll')]" />
</template>
<script>
import { superappMerBusinessList as superappMerBusinessListApi } from '@/api/customerCenter/merchantManagement';
const { mapState } = Vuex;
const defaultFilterFunctionProps = {
  type: Function,
  default: () => () => true
}
export default {
  props: {
    //  数据展示过滤的方法
    filter: defaultFilterFunctionProps,
    //  组件自带的屏蔽型过滤的方法
    filterMethod: defaultFilterFunctionProps,
    value: {
      type: Object,
      default: () => {}
    },
    readonly: {
      type: Boolean
    }
  },
  data() {
    return {
      targetKeys: [],
      superappMerBusinessListDataSource: []
    }
  },
  watch: {
    targetKeys(val, oldVal) {
      const inputValue = {
        businessLineValueList: this.businessLineValueList,
        allBusinessLine: this.businessLineValueList.length === this.superappMerBusinessListDataSource.length
      };
      if (JSON.stringify(this.value) !== JSON.stringify(inputValue)) {
        this.$nextTick(() => {
          this.$emit('input', inputValue);
        });
      }
    },
    value(val) {
      if (JSON.stringify(val) !== JSON.stringify({
        businessLineValueList: this.businessLineValueList,
        allBusinessLine: this.businessLineValueList.length === this.businessLine.length
      })) {
        this.$nextTick(() => {
          this.targetKeys = val?.allBusinessLine && this.businessLineList.map(e => e.key) || val.businessLineValueList.map(e => e.code || e);
        });
      }
    }
  },
  mounted() {
    this.$store.commit(`department/getDepartmentTreeList`);
    this.superappMerBusinessList();
  },
  computed: {
    operatorInfoBusinessLine() {
      return this.$store.state?.account?.operatorInfo?.businessLine;
    },
    businessLineMap() {
      const __businessLine = {};
      for (const e of this.businessLine) {
        __businessLine[e.code] = e.message;
      }
      return __businessLine;
    },
    businessLineValueList() {
      return this.targetKeys.map(e => {
        return {
          code: e,
          message: this.businessLineMap[e]
        };
      });
    },
    ...mapState({
      businessLine: (state, getter) => getter.enumStateArr('basic-common', 'businessLine')
    }),
    businessLineList() {
      return this.businessLine.filter(e => this.filter(e) && this.superappMerBusinessListDataSource.indexOf(e.code) !== -1).map(e => {
        return {
          key: e.code,
          label: e.message,
          disabled: !this.filterMethod(e) || this.operatorInfoBusinessLine.indexOf(e.code) === -1 || !!this.readonly
        };
      });
    }
  },
  methods: {
    superappMerBusinessList() {
      superappMerBusinessListApi({}, {
        success: list => {
          this.superappMerBusinessListDataSource = list;
        }
      })
    },
    selectChange(leftList, rightList) {
      if (leftList.length === this.businessLine.length) {
        this.$set(this, 'targetKeys', leftList);
        this.$nextTick(() => this.$set(this.$refs.businessLineList, 'rightCheckedKeys', []));
      } else if (rightList.length === this.businessLine.length) {
        this.$set(this, 'targetKeys', []);
        this.$nextTick(() => this.$set(this.$refs.businessLineList, 'leftCheckedKeys', []));
      }
    },
    handleChange(newTargetKeys) {
      this.targetKeys = newTargetKeys
    }
  }
}
</script>