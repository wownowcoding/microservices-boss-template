<template>
  <Card>
    <h1
      style="margin-bottom: 10px"
    >{{$t('v2_1_1.displayWhenTheCurrentPageIsOnlyInDevelopmentMode')}}</h1>
    <div style="margin-bottom: 10px">{{$t('scriptv1.b6d59db8c4c80a6110b71a9ef6f5ec2e6')}}</div>
    <ul class="list-wrap">
      <li v-for="(item, idx) in $router.options.routes" :key="idx">
        <VCard class="list-item" v-if="item.meta && item.meta.title">
          <h4 slot="title">{{$t(item.meta.title)}}</h4>
          <div v-for="(_item, _idx) in item.children" :key="_idx">
            <router-link :to="_item">{{_item.meta && $t(_item.meta.title)}}</router-link>
          </div>
        </VCard>
      </li>
    </ul>
  </Card>
</template>
<script>
export default {
  name: 'devHome',
  data () {
    return {}
  },
};
</script>
<style lang="stylus" scoped>
.list-wrap {
  display: flex;
  flex-wrap: wrap;

  .list-item {
    margin-left: 10px;
    margin-bottom: 10px;
    width: 150px;
  }
}
</style>
