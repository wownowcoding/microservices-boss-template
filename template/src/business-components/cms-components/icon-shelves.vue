<template>
  <div class="icon-shelves">
    <img src="./images/shelves.png" class="shelves-header" ref="img" />
    <h4 class="icon-shelves-title" ref="title">
      {{ $t('v3_1_1.theCurrentNodeHasBeenRemoved') }}
    </h4>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      const el = this.$el
      const parent = el.parentElement
      const size = Math.min(parent.clientWidth * 0.3, parent.clientHieght * 0.4)
      this.$refs.img.style.width = size + 'px'
      this.$refs.img.style.height = size + 'px'
      if (parent.clientWidth < 118) {
        this.$refs.title.innerHTML = this.$t('v3_1_1.hasBeenRemoved')
      }
    })
  },
}
</script>
<style lang="stylus" scoped>
.icon-shelves {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.68);
}

.shelves-header {
  display: block;
  margin: 6px auto;
  width: 18px;
  height: 18px;
}

.icon-shelves-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
}
</style>
