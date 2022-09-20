<template>
  <ContentDrawer ref="contentDrawer" v-model="isShow" isShowHeader :closable="false" class="popup-detail">
    <div slot="header" class="form-content-drawer-header user-select">
      <div class="form-content-drawer-buttons">
        <Button @click="isShow = false">{{ $t('btn.back') }}</Button>
        <Button :loading="loading" v-if="operateType !=='info'" type="primary" @click="submit">{{ $t('btn.save') }}</Button>
      </div>
      <div class="form-content-drawer-title" v-text="$t('v4_1_1.bulletFrameSettings')" />
    </div>
    <BasicForm ref="basicForm" v-if="operateType !=='info' && isShowForm" :clientType="clientType" />
    <InfoForm ref="infoForm" v-if="operateType ==='info' && isShowForm" :clientType="clientType" />
  </ContentDrawer>
</template>

<script>
import ContentDrawer from '@/business-components/content-drawer';
import BasicForm from './components/basic-form';
import InfoForm from './components/info-form';
import {
  configPopAdsGetPopAdsAdd,
  configPopAdsGetPopAdsUpdate
} from "@/api/adManage.js";

export default {
  props: {
    clientType: {
      type: String,
      default: () => ''
    }
  },
  components: {
    ContentDrawer,
    BasicForm,
    InfoForm
  },
  data() {
    const formValidateString = JSON.stringify({})
    return {
      loading: false,
      isShow: false,
      refuseShow: false,
      formValidateString,
      formValidate: JSON.parse(formValidateString),
      operateType: '',
      usersuccess: undefined,
      editDatasource: undefined,
      isShowForm: false
    }
  },
  watch: {
    ['formValidate.packageLink'](val) {
      this.$refs.formContentDrawer.setFormValidate('packageLink', val)
    },
    isShow(val) {
      !val && this.$nextTick(() => this.Util.timeout(() => this.close(), 100))
    }
  },
  computed: {
    currentFormList() {
      const __currentFormList = [{
        label: this.$t('part_second.effective_time'),
        field: 'effectiveTime',
        required: true,
        component: 'date-picker',
        value: this?.formValidate?.effectiveTime ?? ''
      }, {
        label: this.$t('part_second.adaptive_version'),
        field: 'adaptiveVersion',
        value: this?.formValidate?.adaptiveVersion ?? ''
      }, {
        label: this.$t('part_second.package_link'),
        field: 'packageLink',
        component: 'upload-file',
        isSwitched: true,
        required: true,
        uploadFileType: 'drag'
      }, {
        label: 'km-KH',
        field: 'cb',
        component: 'textarea',
        required: true,
        value: this?.formValidate?.['cb'] ?? ''
      }];
      return __currentFormList
    }
  },
  methods: {
    close() {
      this.$set(this, 'isShow', false)
      this.$set(this, 'usersuccess', undefined)
      this.$set(this, 'operateType', '')
      this.$set(this, 'formValidate', JSON.parse(this.formValidateString))
      this.$set(this, 'editDatasource', undefined);
      this.isShowForm = false;
    },
    show(options = {}) {
      const { operateType = 'add', data: data, success = () => {} } = options
      this.$set(this, 'usersuccess', success)
      this.$set(this, 'operateType', operateType)
      this.isShow = true;
      this.isShowForm = true;
      if (operateType === 'info') {
        this.$nextTick(() => {
          this.$refs.infoForm.setData(data, operateType);
        })
      } else if (operateType === 'edit') {
        this.$nextTick(() => {
          this.$refs.basicForm.setData(data);
        })
      }
    },
    submit() {
      if (this.loading) return false
      this.$refs.basicForm.submitClick().then(res => {
        this.loading = true
        const data = this.$refs.basicForm.popupData
        const beginTime = typeof data.beginTime === 'number' ? new Date(data.beginTime) : data.beginTime
        const endTime = typeof data.endTime === 'number' ? new Date(data.endTime) : data.endTime
        const format = Vue.filter('Date')
        const params = {
          beginTime: this.Util.toTimeStamp(beginTime),
          endTime: this.Util.toTimeStamp(endTime),
          popName: data.popName,
          zhImageAndLinkInfos: data.zhImageAndLinkInfos,
          enImageAndLinkInfos: data.enImageAndLinkInfos,
          kmImageAndLinkInfos: data.kmImageAndLinkInfos,
          showType: data.showType,
          areaCodeList: data.areaCodeList,
          openOcacasion: data.openOcacasion,
          userLabelName: data.userLabelName,
          userLabelNo: data.userLabelNo,
          picShowRule: data.picShowRule,
          clientType: this.clientType,
          popTimeType: data.popTimeType,
          popStartTime: data.popTimeType == 10 ? '' : data.popStartTime,
          popEndTime: data.popTimeType == 10 ? '' : data.popEndTime
        }
        let Api = configPopAdsGetPopAdsAdd
        if (this.operateType === 'edit') {
          Api = configPopAdsGetPopAdsUpdate
          params.popNo = data.popNo
        }
        console.log(params)
        Api(params).then(res => {
          this.loading = false
          if (res.rspCd === '00000') {
            this.$Message.success(this.$t('v2_1_1.successfulOperation'))
            this.$emit('handleSearch')
            this.isShow = false
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .form-content-drawer-header {
    position: relative;
  }
  .form-content-drawer-title {
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(0%, -50%);
    display: inline-block;
    font-size: 18px;
    color: #17233d;
    font-weight: bold;
  }
  .copy-txt-class {
    cursor: pointer;
    transition: all .3s;
  }
  .copy-txt-class:hover {
    color: blue;
  }
</style>
<style lang="stylus">
  .popup-detail {
    .ivu-btn {
      margin: 0 5px 0 0;
    }
    .ivu-form-item {
      margin-bottom: 6px;
      transition: all .3s;
    }
    .ivu-form-item-error {
      margin-bottom: 24px !important;
      .component-slot {
        border: 0.5px solid #ed4014;
        min-width: 100%;
        min-height: 32px;
      }
    }
  }
</style>
