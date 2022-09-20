<template>
  <div class="icon-task" ref="task" @click.prevent.stop @mouseover="show" @mouseout="hide">
    <img src="./images/task.png" draggable="false" />
    <transition name="fade">
      <div v-if="v" ref="target" class="icon-task-pop" @mouseover="resetHide" @mouseout="hide">
        <div class="icon-task-header">
          <span>{{ $t('v3_1_1.theCurrentNodeHas') }}</span>
          <strong class="icon-task-strong">{{ plan.length }}</strong>
          <span>{{ $t('v3_1_1.piece') }}</span>
          <span>{{ $t('v3_1_1.deliveryPlan') }}</span>
        </div>

        <div class="icon-task-item" v-for="(item, $index) in plan" :key="$index" @click="selectPlan(item)">
          <strong>{{ format(item.publishDate) }}</strong>
          <span>{{ $t('utils.to') }}</span>
          <strong>{{ format(item.endDate) }}</strong>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { formatDate } from "@/utils/formate"

export default {
  props: {
    plan: {
      type: Array,
      required: () => []
    },
  },
  data() {
    return {
      v: false
    }
  },
  methods: {
    format(date) {
      return formatDate(new Date(date), 'dd/MM/yyyy')
    },
    selectPlan(item) {
      this.$emit('selectPlan', item)
      this.hide()
    },
    show() {
      this.hideer && clearTimeout(this.hideer)
      this.v = true
      this.$nextTick(() => {
        const rect = this.$refs.task.getBoundingClientRect()
        const top = rect.top + 28 + 10
        const left = rect.left - 90
        this.$refs.target.style.cssText = `top:${top}px;left:${left}px;`
        document.body.appendChild(this.$refs.target)
      })
    },
    hide() {
      this.hideer && clearTimeout(this.hideer)
      this.hideer = setTimeout(() => {
        this.v = false
      }, 200)
    },
    resetHide() {
      this.hideer && clearTimeout(this.hideer)
    }
  }
}
</script>
<style lang="stylus" scoped>
.icon-task {
  display: block;
  position: absolute;
  right: 3px;
  bottom: 3px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
  z-index: 100;

  &:hover {
    cursor: pointer;
    background-color: #dcdcdc;
  }

  img {
    display: block;
    margin: 5px;
    width: 18px;
    height: 18px;
  }


}
.icon-task-strong {
  font-size: 14px;
  font-weight: bold;
  color: #f39322;
}

.icon-task-item {
  margin-top: 12px;

  strong {
    color: #f39322;
  }

  &:hover {
    cursor pointer
    text-decoration: underline;
  }
}

.icon-task-pop {
  position: fixed;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}
</style>
