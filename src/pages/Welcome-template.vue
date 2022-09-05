<template>
  <div>
    <div>{{$t('welcome')}}-{{count}}</div>
    <div>
      <VButtons
        :item="item"
        :multiple="!!item.multiple"
        :options="item.options"
        v-model="form[item.key]"
        @button-change="(value) => {$emit('filter-button-change', value)}"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VButtons from '../business-components/vipayEcharts/buttons'
import VipayEcharts from '../business-components/vipayEcharts'
export default {
  components: { VButtons, VipayEcharts },
  data () {
    return {
      item: {
        multiple: true,
        options: [
          {
            orderCount: 1,
            code: 'hello',
            message: "hello"
          }
        ],
        key: 'hello'
      },
      form: {
        hello: "hello"
      }
    }
  },
  mounted () {
    console.log(this.$store)
  },
  methods: {
    ...mapActions("bossTemplate", {
      add: 'increment',
    })
    // add () {
    //   console.log('add')
    // }
  },
  computed: {
    ...mapGetters("bossTemplate", {
      count: 'getCount',
    })
  }
}
</script>

<style>
</style>