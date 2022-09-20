<template>
  <div class="schedulingTip" :class="{error: showError}">
    <span class="schedulingTipItem">{{ title || $t('v2_1_1.cmsScheTip') }}</span>
    <span v-if="showSubtitle" style="margin-top:10px;" class="schedulingTipItem">{{  subtitle ||  $t('v2_1_1.cmsScheSubTip') }}</span>
  </div>
</template>

<script>
export default {
  name: 'schedulingTip',
  props: {
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    showSubtitle: {
      type: Boolean,
      default: true
    },
    showError: {
      type: Boolean,
      default: false
    },
  }
}
</script>
<style lang="stylus" scoped>
.schedulingTip {
  margin-left: 160px;
  margin-bottom: 10px;
  display: inline-block;
  max-width: 380px;
  padding: 12px 18px;
  line-height: 1.2;
  font-size: 12px;
  color: #333;
  text-align: center;
  border: 1px dashed #3399ff;
  background-color: #f8fbff;
  border-radius: 5px;
  overflow: hidden;

  &.error{
    color: #eb3223;
    border: 1px solid #eb3223;
    background-color: #fcedec;
  }

  .schedulingTipItem {
    display: block;
  }
}
</style>
