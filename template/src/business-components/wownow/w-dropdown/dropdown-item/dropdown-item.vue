<template>
  <component
    :is="!isChildArray ? 'DropdownItem' : 'Dropdown'"
    :placement="placement"
    v-show="show"
  >
    <div v-if="!isChildArray" @click="onclick">
      <Icon :type="icon" v-if="icon" class="dropdown-item-icon-left" />
      <span v-text="value" />
    </div>
    <DropdownItem v-if="isChildArray">
      <div @click="onclick">
        <Icon :type="icon" v-if="icon" class="dropdown-item-icon-left" />
        <span v-text="value" />
        <Icon type="ios-arrow-forward" class="dropdown-item-icon-right" />
      </div>
    </DropdownItem>
    <DropdownMenu slot="list" v-if="isChildArray">
      <slot />
    </DropdownMenu>
  </component>
</template>

<script>
export default {
  name: 'dropdown-item',
  props: {
    value: {
      type: String,
      default: () => ''
    },
    icon: {
      type: String,
      default: () => ''
    },
    child: {
      type: Array,
      default: () => []
    },
    show: {
      type: Boolean,
      default: () => true
    },
    placement: {
      type: String,
      default: () => 'right'
    }
  },
  computed: {
    isChildArray() {
      return !!(this.child && this.child.length)
    }
  },
  methods: {
    onclick() {
      this.$emit('click', {
        value: this.value,
        icon: this.icon,
        child: this.child
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
  .dropdown-item-icon-left {
    padding-right: 4px;
  }
  .dropdown-item-icon-right {
    padding-left: 4px;
  }
</style>