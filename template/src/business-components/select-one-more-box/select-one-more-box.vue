<template>
  <Modal class="select-one-more-box user-select" footer-hide v-model="isShow" fullscreen :closable="false">
    <div class="steps-site">
      <Steps :current="steps.value" class="position-center select-one-more-box-steps" :style="StepsStyle">
        <Step
          v-for="(e, i) in steps.list"
          :key="'step-item-' + (i + 1)"
          :title="e.title"
          :content="e.content"
        />
      </Steps>
    </div>
    <div class="card-site position-center">
      <Card
        v-for="(e, i) in cards"
        :key="'card-item-' + (i + 1)"
        class="display-middle select-one-more-box-card"
        ref="cards"
        @click.native="cardClick(e)"
      >
        <div style="text-align:center">
          <img :src="e.img">
          <h1 v-text="e.title" style="margin-bottom: 5px;" />
          <h4 v-for="(t, ti) in e.tips" :key="'tips-item-' + (ti + 1)" v-text="t" />
        </div>
      </Card>
    </div>
    <Button type="primary" class="position-center back-button" @click="isShow = false">{{ $t('btn.back') }}</Button>
  </Modal>
</template>

<script>
export default {
  props: {
    steps: {
      type: Object
    },
    cards: {
      type: Object
    }
  },
  computed: {
    StepsStyle() {
      let left = 92;
      if (this?.steps?.list?.length > 1) {
        left = 92.5 - (this?.steps?.list?.length * 10);
      }
      return `left: ${left}%;`;
    }
  },
  data() {
    return {
      isShow: false,
      cardMaxHeight: 0,
      params: undefined
    };
  },
  watch: {
    isShow(val) {
      if (!val) {
        this.Util.timeout(() => {
          this.$set(this, 'params', undefined);
        }, 500);
      } else {
        // this.Util.timeout(() => {
        //   for (let i = 0, len = this.$refs.cards.length; i < len; i++) {
        //     this.$refs.cards[i].$el.addEventListener('click', () => this.cardClick(this.cards[i]));
        //   }
        // }, 500);
      }
    }
  },
  methods: {
    cardClick(e) {
      e && e.click && typeof e.click === 'function' && e.click(this.params, () => { this.isShow = false; });
    },
    show(params) {
      this.$set(this, 'params', params);
      this.isShow = true;
    }
  }
}
</script>

<style lang="stylus">
  .select-one-more-box {
    position relative
    .steps-site {
      position relative;
      height: 60px;
      overflow hidden
    }
    .ivu-modal-body {
      max-height: inherit;
    }
    .card-site {
      white-space: nowrap;
    }
    .select-one-more-box-card {
      width: 320px;
      height: 240px;
      margin: 0 10px;
      cursor pointer
    }
    .back-button {
      top: 88%;
      padding: 4px 20px;
      font-size: 14px;
    }
  }
</style>