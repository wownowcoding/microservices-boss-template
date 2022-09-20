<template>
  <div class="home-popup">
    <VipayTable labelWidth="120" ref="vipayTable" :table="table" :queryList="queryList" auth @handleSearch="handleSearch" @onload="handleSearchForm">
      <Button slot="queryButton" :loading="loading" type="primary" @click="popUpDetail">{{$t("btn.add")}}</Button>
    </VipayTable>
    <Modal
      v-model="deleteShow"
      :title="$t('v2_1_1.confirmDelete')"
      @on-ok="deleteOk"
      @on-cancel="cancelDeletePop">
      <p>{{itemPop.popName}}</p>
    </Modal>

    <Modal
      v-model="releaseShow"
      @on-ok="releaseOk"
      @on-cancel="cancelDeletePop">
      <p style="margin: 10px 0;">{{ popTitle }}</p>
      <Input v-model="remark" :placeholder="$t('v2_1_1.pleaseEnterTheReason')" :maxlength="300" type="textarea" height="220px"></Input>
    </Modal>
    <PopupDetail @handleSearch="handleSearch" ref="popupDetail" :clientType="clientType" />
  </div>
</template>
<script>
import VipayTable from '@/components/VipayTable';
import tableMixin from './mixins/table';
import queryMixin from './mixins/query-list';
import AdsZoneMixin from './mixins/adsZone';
import PopupDetail from './components/popup-detail';
import {
  configPopAdsGetPopAdsList,
  configPopAdsGetPopDetail,
  configPopAdsGetPopAdsDelete,
  configPopAdsGetPopAdsEnd,
} from "@/api/adManage.js";

export default {
  name: 'home-popup',
  props: {
    /**
     * SuperApp:超级App用户端
     * YumNow:外卖用户端
     * TinhNow:电商用户端
     * YumNowMerchant:外卖商户端
     * YumNowDelivery:外卖骑手端
     */
    clientType: {
      type: String,
      default: () => ''
    }
  },
  mixins: [tableMixin, queryMixin, AdsZoneMixin],
  components: {
    VipayTable,
    PopupDetail
  },
  data() {
    return {
      deleteShow: false,
      itemPop: {},
      adsZone: [],
      releaseShow: false,
      remark: '',
      popTitle: '',
    }
  },
  computed: {
    ...Vuex.mapState({
      popShowType: (state, getter) => getter.enumStateArr('config', 'popShowType'),
      popShowTypeEnum: (state, getter) => getter.enumGetter('config', 'popShowType'),
      activeState: (state, getter) => getter.enumStateArr('config', 'activeState'),
      activeStateEnum: (state, getter) => getter.enumGetter('config', 'activeState')
    })
  },
  watch: {
    ['table.page.pageNum'](val) {
      this.getList();
    },
    ['table.page.pageSize'](val) {
      //  改变 size 重置回第一页
      this.$set(this.page, 'pageNum', 1);
      this.handleSearchForm();
    }
  },
  methods: {
    popUpDetail() {
      this.$refs.popupDetail.show();
    },
    handleSearchForm() {
      this.$refs.vipayTable.handleSearchForm();
    },
    handleSearch(params = {}) {
      this.getList({
        ...(params?.page ?? { pageNum: 1, pageSize: 10 }),
        ...(params?.form ?? {})
      });
    },
    getList(params) {
      if (!this.loading) {
        this.loading = true;
        const apiParams = Object.assign({}, params, { clientType: this.clientType });
        if (apiParams.startTime && apiParams.endTime) {
          apiParams.startTime = this.Util.toTimeStamp(`${apiParams.startTime} 00:00:00`);
          apiParams.endTime = this.Util.toTimeStamp(`${apiParams.endTime} 23:59:59`);
        }
        this.$nextTick(() => configPopAdsGetPopAdsList(apiParams, {
          success: (ret => {
            const { pageNum, total, list } = ret;
            // this.$set(this.page, 'pageNum', pageNum);
            this.$set(this.page, 'total', total);
            this.$set(this, 'data', list);
          })
        }).finally(() => this.$set(this, 'loading', false)));
      }
    },
    getDetail(row, operateType = 'info') {
      this.configPopAdsGetPopDetail(row, operateType)
    },
    getEdit(row, operateType = 'edit') {
      this.configPopAdsGetPopDetail(row, operateType)
    },
    configPopAdsGetPopDetail(row, operateType) {
      this.loading = true
      configPopAdsGetPopDetail({
        popNo: row.popNo
      }).then(res => {
        this.loading = false
        this.$refs.popupDetail.show({
          operateType,
          data: { ...res.data }
        });
      })
    },
    deleteItem(row) {
      this.itemPop = row
      this.deleteShow = true
    },
    deleteOk() {
      this.loading = true
      this.deleteShow = false
      configPopAdsGetPopAdsDelete({
        popNo: this.itemPop.popNo,
      }).then(res => {
        this.loading = false
        if (res.rspCd === '00000'){
          this.$Message.success(this.$t('v3_1_1.successfullyDeleted'))
          this.handleSearch()
        }
      })
    },
    releaseItem(row) {
      this.itemPop = row
      this.remark = ''
      this.popTitle = `${this.$t('v2_1_1.confirmToReleaseInAdvance')}【${row.popName}】？`
      this.releaseShow = true
      this.popstate = 10
    },
    releaseOk(){
      this.loading = true
      this.releaseShow = false
      configPopAdsGetPopAdsEnd({
        popNo: this.itemPop.popNo,
        state: this.popstate,
        remark: this.remark
      }).then(res => {
        this.loading = false
        if (res.rspCd === '00000'){
          this.$Message.success(this.$t('v2_1_1.successfulOperation'))
          this.handleSearch()
        }
      })
    },
    endItem(row) {
      this.itemPop = row
      this.remark = ''
      this.popTitle = `${this.$t('v2_1_1.confirmToEndEarly')}【${row.popName}】？`
      this.releaseShow = true
      this.popstate = 12
    },
    cancelDeletePop(){
      this.itemPop = {};
    }
  }
}
</script>
