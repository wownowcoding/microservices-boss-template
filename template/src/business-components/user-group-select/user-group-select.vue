<template>
  <div class="user-group-select" :class="{ disabled }">
    <!-- <Poptip :placement="isMultiple ? 'bottom' : 'right-start'" v-model="popTipVisible"> -->
    <Poptip :placement="placement" v-model="popTipVisible" :transfer="transfer">
      <basic-group
        slot="content"
        ref="basicGroup"
        :isMultiple="isMultiple"
        :businessLineOps="businessLine"
        :userLabelNo="form.userLabelNo"
        @change="updateGroupValue"
        @getList="getList"
      />
      <Input
        v-if="!isMultiple"
        v-model="userLabelName"
        class="select-input"
        :disabled="disabled"
        readonly
        :placeholder="$t('v3_1_1.pleaseSelectUserGroup')"
      />
      <div class="multiple-wrap" v-if="isMultiple">
        <ul class="select-list-wrapper" v-if="selectList.length">
          <Tag closable v-for="(item, i) in selectList" :key="i" @on-close="removeGroupItem(item.groupNo)">{{ item.groupName }}</Tag>
        </ul>
        <p class="empty-tips" v-if="!selectList || !selectList.length">{{ $t('coupon_v1.pleaseChoose') }}</p>
        <Icon class="multiple-arrow" size="13" type="ios-arrow-down"></Icon>
      </div>
    </Poptip>
  </div>
</template>

<script>
import BasicGroup from './basic-group';
import Store from '@/utils/store';
import Emitter from 'iview/src/mixins/emitter';
import { tagGroupList } from '@/api/customerCenter/tags';

let isMultipleDef = false

export default {
  name: 'user-group-select',
  mixins: [Emitter],
  components: {
    [BasicGroup.name]: BasicGroup
  },
  props: {
    value: {
      type: [Array, Object],
      default: () => isMultipleDef ? [] : {
        userLabelNo: '',
        userLabelName: ''
      }
    },
    isMultiple: {
      type: Boolean,
      default: isMultipleDef
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'right-start'
    },
    transfer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: this.value,
      popTipVisible: false,
      groupList: [],
      selectList: [],
    };
  },
  mounted() {
		tagGroupList({ pageSize: 10000 }, {
			success: (res) => {
				const { list } = res
				this.groupList = list.map(e => ({...e, groupName: e.total && `${e.groupName} (${e.total})` || e.groupName}))
				this.allGroupCache = [...list]
			}}
		)
	},
  watch: {
    form() {
      this.getUserLabelName()
    },
    value: {
      deep: true,
      immediate: true,
      handler(val = {}) {
        if (!this.isMultiple) {
          const { userLabelNo, userLabelName } = val;
          userLabelNo && userLabelNo !== this.form.userLabelNo && this.$set(this.form, 'userLabelNo', userLabelNo);
          userLabelName && userLabelName !== this.form.userLabelName && this.$set(this.form, 'userLabelName', userLabelName);
        } else {
          if (!val || !val.length) {
            return
          }
          this.selectList = [...val]
          const _val = [...val]
          // 一定只能执行一次，不然会死循环，代码写的有问题
          if (!this.init) {
            this.init = true
            console.log(`user-group-select实例`, this)
            console.log(`user-group-select`, this.selectList)
            setTimeout(() => {
              const list = _val.map(e => {
                return {
                  ...e,
                  groupName: e.name || e.groupName
                }
              }).filter(e => e && e.groupName)
              this.$refs.basicGroup && this.$refs.basicGroup.setSelectList(list)
            }, 30)
          }
        }
      }
    },
    popTipVisible(val) {
      !val && this.$nextTick(() => this.dispatch('FormItem', 'on-form-blur', this.form.userLabelNo));
    }
  },
  computed: {
    userLabelName() {
      if (this.form.userLabelName) return this.form.userLabelName
      let userLabelName = ''
      this.groupList.forEach(item => {
        if (item.groupNo === this.form.userLabelNo) {
          this.form.userLabelName = item.groupName
          userLabelName = item.groupName
        }
      })
      return userLabelName
    },
    ...Vuex.mapState({ businessLine: (state, getter) => getter.enumStateArr('basic-common', 'businessLine') })
  },
  methods: {
    setGroupList(list) {
      this.$refs.basicGroup && this.$refs.basicGroup.setSelectList(list)
    },
    getList(list) {
      this.groupList = [...list]
    },
    updateGroupValue(val = {}) {
      if (this.isMultiple) {
        this.selectList = val
        this.dispatch('FormItem', 'on-form-blur', val);
        this.$emit('input', val);
        this.$emit('change', val);
      } else {
        const { groupNo, groupName } = val;
        this.form.userLabelNo = groupNo;
        this.form.userLabelName = groupName;
        this.dispatch('FormItem', 'on-form-blur', this.form.userLabelNo);
        this.$emit('input', this.form);
      }
    },
    removeGroupItem(no) {
      let list = this.selectList.filter(e => e.groupNo !== no)
      console.log(list)
      this.selectList = list
      this.$refs.basicGroup.setSelectList(list)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .user-group-select {
    &.disabled {
      background-color: #f2f2f2;
      pointer-events: none;
    }
  }
  .select-input {
    width: 200px;
    display: inline-block;
  }

  .multiple-wrap {
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 500px;
    border: 1px solid #dcdee2;
    padding: 1px 4px;
    border-radius: 4px;
    transition: border-color .3s;

    &:hover {
      border-color: #f5a94e;
      cursor pointer;
    }
  }

  .select-list-wrapper {
    min-height: 60px;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    cursor pointer;

    .select-item {
      padding: 0 15px;
      margin-bottom: 4px;
      margin-right: 4px;
      border-radius: 4px;
      border: 1px solid #dcdee2;
      font-size: 12px;

      .ivu-icon-md-close {
        cursor pointer;
      }
    }
  }

  .multiple-arrow {
    cursor pointer;
    font-size: 26px;
  }

  .empty-tips {
    align-self: flex-start;
    height: 30px;
    line-height: 30px;
    color: #c5c8ce;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 4px;
    padding-right: 22px;
  }
</style>
