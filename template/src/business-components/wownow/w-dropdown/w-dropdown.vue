<template>
  <Dropdown trigger="click" class="w-dropdown" @on-visible-change="onVisibleChange">
    <div @mouseenter="mouseup = true" @mouseleave="mouseup = false">
      <Input :value="dropdownValue" readonly class="w-dropdown-input" ref="dropdownInput" :placeholder="placeholder">
        <Icon v-if="!mouseup || !dropdownValue" type="ios-arrow-down" class="ios-arrow-icon" :class="{ 'ios-arrow-up' : visible }" slot="suffix" />
        <Icon v-if="mouseup && dropdownValue" type="ios-close-circle" slot="suffix" @click="clearValue" />
      </Input>
    </div>
    <div slot="list" class="w-dropdown-menu">
      <Input suffix="ios-search" v-model="searchValue" ref="searchValueInput" class="w-dropdown-search" :placeholder="$t('v3_1_1.pleaseEnterTheContentToBeSearched')" style="width: auto" />
      <ul class="ivu-dropdown-menu">
        <dropdown-item
          v-for="(e, i) in optionsList"
          :key="'dropdown-item-e-' + (i + 1)"
          v-model="e.value"
          :child="e.child || []"
          :icon="e.icon || ''"
          @click="onclick(e, [i])"
          :show="e.show"
          :placement="placement"
        >
          <dropdown-item
            v-for="(t, ti) in e.child"
            :key="'dropdown-item-ti-' + (ti + 1)"
            v-model="t.value"
            :child="t.child || []"
            :icon="t.icon || ''"
            @click="onclick(t, [i, ti])"
            :show="t.show"
            :placement="placement"
          >
            <dropdown-item
              :placement="placement"
              v-for="(t1, ti1) in t.child"
              :key="'dropdown-item-ti1' + (ti1 + 1)"
              v-model="t1.value"
              :child="t1.child || []"
              :icon="t1.icon || ''"
              @click="onclick(t1, [i, ti, ti1])"
              :show="t1.show"
            >
            </dropdown-item>
          </dropdown-item>
        </dropdown-item>
      </ul>
    </div>
  </Dropdown>
</template>

<script>
import DropdownItem from './dropdown-item';
import Emitter from 'iview/src/mixins/emitter';
export default {
  components: { [DropdownItem.name]: DropdownItem },
  mixins: [Emitter],
  props: {
    placeholder: {
      type: String,
      default: () => ''
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    placement: {
      type: String,
      default: () => undefined
    },
    getOneValue: {
      type: Boolean,
      default: () => false
    }
  },
  name: 'w-dropdown',
  data() {
    return {
      searchValue: '',
      optionsList: [],
      selectItem: this.value,
      visible: false,
      mouseup: false
    };
  },
  computed: {
    dropdownValue() {
      if (!(this?.optionsList?.length)) {
        return '';
      }
      if (!this.getOneValue) {
        let __value = '';
        let currentFather;
        this.selectItem.forEach(e => {
          if (!currentFather) {
            currentFather = this.optionsList;
          }
          __value = currentFather[e].value;
          if (currentFather[e]?.child?.length) {
            currentFather = currentFather[e].child;
          }
        });
        return __value;
      }
      return this?.optionsList?.[this.selectItem[0]]?.value || '';
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.Util.timeout(() => {
        this.setOptionsList();
      }, 5);
    });
  },
  watch: {
    options: {
      deep: true,
      handler(val) {
        this.visible && this.setOptionsList();
      }
    },
    searchValue(val) {
      this.visible && this.setOptionsList();
    },
    selectItem(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.value)) {
        this.$emit('input', val);
        this.dispatch('FormItem', 'on-form-blur', val);
      }
    },
    dropdownValue(val) {
      this.$nextTick(() => {
        this.$refs.dropdownInput.handleBlur(this.$refs.dropdownInput.$el);
      });
    },
    value(val) {
      if (Array.isArray(val) && JSON.stringify(val) !== JSON.stringify(this.selectItem)) {
        this.$set(this, 'selectItem', val);
      }
      if (!Array.isArray(val)) {
        this.$emit('input', this.selectItem);
        this.dispatch('FormItem', 'on-form-blur', this.selectItem);
      }
    }
  },
  methods: {
    clearValue() {
      this.$set(this, 'selectItem', []);
      this.$emit('clear-value');
    },
    setOptionsList() {
      this.Util.timeout(() => {
        this.$set(this, 'optionsList', this.getOptionsList());
      }, 50);
    },
    getOptionsList() {
      return this.options.map(e => {
        if (!!(!this.searchValue || this.searchValue && e.value.indexOf(this.searchValue) !== -1) && !(e?.child?.length)) {
          return {...e, show: true };
        }
        let childLength = 0;
        e.child = e?.child?.map(child => {
          if (!!(!this.searchValue || this.searchValue && child.value.indexOf(this.searchValue) !== -1) && !(child?.child?.length)) {
            ++childLength;
            return {...child, show: true };
          }
          let childLength1 = 0;
          child.child = child?.child?.map(c => {
            const show = !this.searchValue || this.searchValue && c.value.indexOf(this.searchValue) !== -1;
            if (show) {
              ++childLength1;
            }
            return {...child, show };
          }) ?? [];
          if (childLength1) {
            ++childLength;
            return {...child, show: true };
          }
          return {...child, show: false };
        }) ?? [];
        if (childLength) {
          return {...e, show: true };
        }
        return {...e, show: false };
      });
    },
    onVisibleChange(val) {
      this.visible = !!val;
      if (val) {
        this.Util.timeout(() => {
          this.$refs.searchValueInput && this.$refs.searchValueInput.focus();
          this.setOptionsList();
        }, 50);
      }
    },
    onclick(item, itemIndex) {
      if (!item.disabledClick) {
        this.$set(this, 'selectItem', itemIndex);
      }
    },
    filterOptions(currentOptions) {
      for (let i = 0, len = currentOptions.length; i < len; i++) {
        const optionItem = currentOptions[i];
        if (optionItem?.value?.indexOf(this.searchValue) !== -1) {
          currentOptions[i].show = true;
          continue;
        }
        if (optionItem?.child?.length) {
          const newChild = [];
          this.filterOptions(optionItem.child, newChild);
          if (newChild && newChild.length) {
            newOptions.push(Object.assign({}, optionItem, {
              child: newChild
            }));
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus">
  .w-dropdown {
    .ivu-dropdown-menu {
      width: 100%;
      display: grid;
    }
    .ios-arrow-icon {
      transition: all .3s;
    }
    .ios-arrow-up {
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    .w-dropdown-menu {
      box-sizing: border-box;
    }
    .ivu-dropdown-item {
      padding: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      div {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 7px 20px;
      }
    }
    .w-dropdown-search {
      padding: 0 4px 4px 4px;
      box-shadow: none !important;
      input {
        box-shadow: none !important;
        border: 1px solid #dcdee2 !important;
      }
    }
    .w-dropdown-input {
      cursor pointer
      box-shadow: none !important;
      input {
        box-shadow: none !important;
        cursor pointer
      }
    }
  }
</style>