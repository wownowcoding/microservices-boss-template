<template>
  <Card
		:bordered="bordered"
		:disHover="disHover"
		:shadow="shadow"
		:padding="padding"
		:title="title"
		:icon="icon"
		ref="card"
	>
    <slot name="title" slot="title" />
    <div v-if="collapsible" slot="extra">
      <Button size="small" type="text" @click="toggle">
        <Icon :type="!expand ? `ios-arrow-down` : `ios-arrow-up`" />
      </Button>
    </div>
    <div v-else slot="extra" name="extra"></div>
    <div v-show="expand">
      <slot />
    </div>
  </Card>
</template>
<script>
export default {
  name: 'VCard',
  props: {
    // 是否支持折叠
    collapsible: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: true
    },
    disHover: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Number
    },
    title: {
      type: String
    },
    icon: {
      type: String
    },
    value: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      expand: true
    }
  },
  mounted() {
    if (this.value !== this.expand) {
      this.expand = !!this.value
    }
  },
  watch: {
    value(val) {
      if (val !== this.expand) {
        this.expand = !!val
      }
    },
    expand(val) {
      if (val !== this.value) {
        this.$emit('input', !!val)
      }
    }
  },
  methods: {
    toggle() {
      this.expand = !this.expand
      this.expand ? (this.$refs.card.$el.querySelectorAll('.ivu-card-body')[0].style.padding = '16px') : (this.$refs.card.$el.querySelectorAll('.ivu-card-body')[0].style.padding = '0px')
    }
  }
}
</script>

<style lang="stylus" scoped>
.clickable {
  cursor: pointer;
}
</style>
