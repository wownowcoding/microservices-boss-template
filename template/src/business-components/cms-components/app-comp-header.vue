<template>
  <div class="app-comp-header" :style="headerStyle" v-if="cardContent.title || cardContent.subTitle">
    <div class="app-comp-title">
      <img v-if="cardContent.icon" :src="cardContent.icon" class="app-comp-icon" />
      <span :style="titleStyle">{{ cardContent.title }}</span>
    </div>
    <div class="app-comp-link" v-if="(cardContent.title && cardContent.subTitle) && !(cardContent.style == '1')"></div>
    <span class="app-comp-subtitle" :style="subtitleStyle">{{ cardContent.subTitle }}</span>
  </div>
</template>

<script>
export default {
  props: {
    cardContent: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    headerStyle() {
      if (this.cardContent) {
        return `justify-content: ${this.cardContent.style == '1' ? 'space-between' : 'flex-start'};`
      }
      return ''
    },
    titleStyle() {
      if (this.cardContent) {
        let cssText = ''
        cssText += `color: ${this.cardContent.titleColor};`
        if (this.cardContent.titleFont > 0) {
          cssText += `font-size: ${this.cardContent.titleFont}px;`
        }
        return cssText
      }
      return ''
    },
    subtitleStyle() {
      if (this.cardContent) {
        let cssText = ''
        cssText += `color: ${this.cardContent.subTitleColor};`
        if (this.cardContent.subTitleFont > 0) {
          cssText += `font-size: ${this.cardContent.subTitleFont}px;`
        }
        return cssText
      }
      return ''
    }
  },
}
</script>
<style lang="stylus" scoped>
.app-comp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 10;
  pointer-events: none;
}

.app-comp-title {
  padding: 8px 5px 8px 15px;
  line-height: 17px;
  font-size: 17px;
  color: #343b4d;
  font-weight: 400;
  white-space: nowrap;
}

.app-comp-icon {
  padding-right: 15px;
  max-width: 120px;
}

.app-comp-subtitle {
  padding: 8px 15px 8px 5px;
  line-height: 17px;
  font-size: 16px;
  color: #767f92;
}

.app-comp-link {
  width: 1px;
  height: 16px;
  background-color: #b5b3b3;
}
</style>
