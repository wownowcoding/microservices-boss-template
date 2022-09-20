<template>
  <div class="form-txt-list">
    <div class="form-txt-list-item" v-for="(e, i) in inputList" :key="'input-list-' + (i + 1)">
      <Input class="form-txt-list-input display-middle" v-model="inputList[i]" />
      <Button type="warning" icon="md-add" shape="circle" @click="addItem" v-if="i < maxLength - 1 && inputList[i] && i === inputList.length - 1" />
      <Button type="warning" icon="md-close" v-if="inputList.length > 1 && inputList[i]" shape="circle" @click="deleteItem(i)" />
    </div>
  </div>
</template>

<script>
import Emitter from 'iview/src/mixins/emitter';
export default {
  name: 'form-txt-list',
  mixins: [ Emitter ],
  props: {
    value: {
      type: Array,
      default: () => []
    },
    //  最大添加数量
    maxLength: {
      type: Number,
      default: () => 10
    }
  },
  watch: {
    inputList: {
      deep: true,
      handler(val) {
        if (val && val.length) {
          const lastEmptyList = val.filter((e, i) => i === val.length -1 || !!e);
          if (lastEmptyList.length !== val.length) {
            return this.$nextTick(() => this.$set(this, 'inputList', lastEmptyList));
          }
          this.$nextTick(() => {
            const __inputList = JSON.parse(JSON.stringify(val.filter(e => !!e))).sort();
            const __value = JSON.parse(JSON.stringify(this.value)).sort();
            if (JSON.stringify(__inputList) !== JSON.stringify(__value)) {
              this.$emit('input', val);
            }
          });
        }
      }
    },
    value: {
      deep: true,
      handler(val) {
        if (val && val.length) {
          const __inputList = JSON.parse(JSON.stringify(this.inputList.filter(e => !!e))).sort();
          const __value = JSON.parse(JSON.stringify(val.filter(e => !!e))).sort();
          if (JSON.stringify(__inputList) !== JSON.stringify(__value)) {
            this.$set(this, 'inputList', __value);
          }
        }
      }
    }
  },
  data() {
    return {
      inputList: Array.isArray(this.value) && this.value.length && !!this.value[0] ? this.value : ['']
    };
  },
  methods: {
    addItem() {
      this.inputList.push('');
    },
    deleteItem(deleteIndex) {
      this.inputList.splice(deleteIndex, 1);
    }
  }
}
</script>

<style lang="stylus">
  .form-txt-list-input {
    width: 200px;
    margin-right: 10px;
  }
</style>
