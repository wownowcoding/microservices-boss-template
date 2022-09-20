<template>
  <div class="basic-form">
    <Form ref="basicForm" :label-width="160" :model="popupData" inline>
      <!-- 基础信息 -->
      <VCard style="margin-bottom: 10px" :title="$t('user.base_info')">
        <!-- 弹框名称 -->
        <FormItem prop="popName" class="current-basic-form-item" :label="getLabel($t('v3_1_1.adHeadline'))">
          {{ popupData.popName }}
        </FormItem>
        <!-- 计划投放时间 -->
        <FormItem class="current-basic-form-item" prop="beginTime" :label="getLabel($t('v2_1_1.scheduledTime'))">
          {{ dateFormat(popupData.beginTime) }}
          <span style="padding: 0 5px">{{ $t('utils.to') }}</span>
          {{ dateFormat(popupData.endTime) }}
        </FormItem>
      </VCard>

      <!-- 弹框规则 -->
      <VCard style="margin-bottom: 10px" :title="$t('v4_1_1.bulletRules')">
        <!-- 触发时机 -->
        <FormItem :label="getLabel($t('v4_1_1.triggerTiming'))" class="current-basic-form-item" prop="openOcacasion">
          {{ popOpenOccasionEnum(popupData.openOcacasion) }}
        </FormItem>

        <!-- 选择分群 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('v4_1_1.selectGroup'))" prop="userLabelNo" v-if="popupData.userLabelName">
          {{ popupData.userLabelName }}
        </FormItem>

        <!-- 弹窗时间 -->
        <FormItem :label="getLabel($t('v9_2_1.popupTime'))" class="current-basic-form-item" prop="popTimeType">
          <div v-if="popupData.popTimeType == 10">{{ $t('v9_2_1.anyTimeOfDay') }}</div>
          <div v-if="popupData.popTimeType == 11">{{ $t('v9_2_1.fixedTimePeriodEveryDay') }}
            : {{ popupData.popStartTime}} - {{popupData.popEndTime}}
          </div>
        </FormItem>

        <!-- 展示频率 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('v2_1_1.showFrequency'))" prop="showType">
          <div>
            <div>{{ popShowTypeEnum(popupData.showType) }}</div>
            <ul style="color: #999; font-size: 12px;">
              <li>{{ this.$t('scriptv2.a3c65adced46dd7b98dce607a32761cf0') }}</li>
              <li>{{ this.$t('scriptv2.c7374629a6dfe1121521a185d81166482') }}</li>
            </ul>
          </div>
        </FormItem>

        <!-- 图片展示规则 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('v4_1_1.pictureDisplayRules'))" prop="picShowRule">
          {{ popPicShowRuleEnum(popupData.picShowRule) }}
        </FormItem>

        <!-- 投放地区 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('v2_1_1.deliveryArea'))" prop="areaCodeList">
          {{ adsZoneAllEnum(popupData.areaCodeList) }}
        </FormItem>
      </VCard>

      <!-- 内容配置 -->
      <VCard style="margin-bottom: 10px" :title="$t('v4_1_1.contentConfiguration')">
        <!-- 中文图片 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('system.chinese'))" prop="zhImageAndLinkInfos">
          <div v-for="(e, i) in popupData.zhImageAndLinkInfos" :key="'en-image-url-list-' + (i + 1)">
            <upload-preview-image disabled ref="zhImageAndLinkInfos" :format="imgOption.format" group="app" v-model="popupData.zhImageAndLinkInfos[i]" :maxSize="imgOption.maxSize" :autoCropWidth="imgOption.autoCropWidth" :autoCropHeight="imgOption.autoCropHeight" :limit="1" uploadType="drag" :imagesLength="popupData.zhImageAndLinkInfos.length" />
          </div>
        </FormItem>
        <!-- 英文图片 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('v3_1_1.english'))" prop="enImageAndLinkInfos">
          <div v-for="(e, i) in popupData.enImageAndLinkInfos" :key="'en-image-url-list-' + (i + 1)">
            <upload-preview-image disabled ref="enImageAndLinkInfos" :format="imgOption.format" group="app" v-model="popupData.enImageAndLinkInfos[i]" :maxSize="imgOption.maxSize" :autoCropWidth="imgOption.autoCropWidth" :autoCropHeight="imgOption.autoCropHeight" :limit="1" uploadType="drag" :imagesLength="popupData.enImageAndLinkInfos.length" />
          </div>
        </FormItem>
        <!-- 柬文图片 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('v2_1_1.khmer'))" prop="kmImageAndLinkInfos">
          <div v-for="(e, i) in popupData.kmImageAndLinkInfos" :key="'en-image-url-list-' + (i + 1)">
            <upload-preview-image disabled ref="kmImageAndLinkInfos" :format="imgOption.format" group="app" v-model="popupData.kmImageAndLinkInfos[i]" :maxSize="imgOption.maxSize" :autoCropWidth="imgOption.autoCropWidth" :autoCropHeight="imgOption.autoCropHeight" :limit="1" uploadType="drag" :imagesLength="popupData.kmImageAndLinkInfos.length" />
          </div>
        </FormItem>
      </VCard>
    </Form>
  </div>
</template>

<script>
import { validRequired, validateTimeRange, validListRequired } from '@/utils/validator';
import UserGroupSelect from '@/business-components/user-group-select'
import WownowSelect from '@/business-components/content-drawer/basic-form-component/components/wownow-select';
import UploadPreviewImage from '../basic-form/upload-preview-image'
import AdsZoneMixin from '@/business-components/home-popup/mixins/adsZone';

export default {
  mixins: [AdsZoneMixin],
  props: {
    clientType: {
      type: String,
      default: () => ''
    }
  },
  components: { [UserGroupSelect.name]: UserGroupSelect, [WownowSelect.name]: WownowSelect, [UploadPreviewImage.name]: UploadPreviewImage },
  data() {
    const popupDataStr = JSON.stringify({
      //  弹窗名称
      popName: '',
      //  开始时间
      beginTime: '',
      //  结束时间
      endTime: '',
      //  客户端类型
      clientType: '',
      //  中文图片-链接配置
      zhImageAndLinkInfos: [{
        //  弹窗图片
        popImage: '',
        //  跳转链接
        jumpLink: ''
      }],
      //  英文图片-链接配置
      enImageAndLinkInfos: [{ popImage: '', jumpLink: '' }],
      //  柬文图片-链接配置
      kmImageAndLinkInfos: [{ popImage: '', jumpLink: '' }],
      //  弹窗编号
      popNo: '',
      //  展示方式: 每天一次/每次
      showType: '',
      //  地区
      areaCodeList: [],
      //  展示时机: 登录/打开 APP
      openOcacasion: '',
      //  图片展示规则，10-随机，11-轮询
      picShowRule: 10,
      //  分组名称（虽然名称像标签，但前端传的是分组名称）
      userLabelNo: '',
      //  群编号（虽然名称像标签，但前端传的是分组编号）
      userLabelName: '',
      //  为控件定义时间对象
      //  以下对象提交后需要 delete, 因为是根据组件封装
      currentTimes: [],
      popTipVisible: '',
    });
    return {
      operateType: 'add',
      popupDataStr,
      popupData: JSON.parse(popupDataStr),
      isShowForm: false,
      imgOption: {
        autoCropWidth: 570,
        autoCropHeight: 760,
        maxSize: 500,
        format: ['jpg', 'jpeg', 'png', 'gif']
      }
    };
  },
  computed: {
    disabled() {
      return this.disabled
    },
    ...Vuex.mapState({
      __popOpenOccasion: (state, getter) => getter.enumStateArr('config', 'popOpenOccasion'),
      popShowType: (state, getter) => getter.enumStateArr('config', 'popShowType'),
      businessLine: (state, getter) => getter.enumStateArr('basic-common', 'businessLine'),
      popPicShowRule: (state, getter) => getter.enumStateArr('config', 'popPicShowRule'),
      popOpenOccasionEnum: (state, getter) => getter.enumGetter('config', 'popOpenOccasion'),
      popShowTypeEnum: (state, getter) => getter.enumGetter('config', 'popShowType'),
      popPicShowRuleEnum: (state, getter) => getter.enumGetter('config', 'popPicShowRule'),
    }),
    //  选择那些触发条件需要选择用户群判断
    isSelectOpenOcacasion() {
      return [13, 15, 17].indexOf(this.popupData.openOcacasion - 0) !== -1;
    },
    //  不同业务方对应不同的触发时机
    popOpenOccasion() {
      if (this.clientType === 'SuperApp') {
        const filterMap = { '10': 1, '11': 1, '12': 1, '13': 1 };
        return this.__popOpenOccasion.filter(e => !!filterMap[`${e.code}`]);
      }
      if (this.clientType === 'YumNow') {
        const filterMap = { '16': 1, '17': 1 };
        return this.__popOpenOccasion.filter(e => !!filterMap[`${e.code}`]);
      }
      if (this.clientType === 'TinhNow') {
        const filterMap = { '14': 1, '15': 1 };
        return this.__popOpenOccasion.filter(e => !!filterMap[`${e.code}`]);
      }
      return this.__popOpenOccasion;
    },
  },
  methods: {
    adsZoneAllEnum(areaCodeList) {
      if (areaCodeList && areaCodeList.length) {
        return areaCodeList.map(e => {
          if (e == 'all') return this.$t('v4_1_1.all')
          return this.adsZoneEnum(e)
        }).join('、')
      }
      return this.$t('v4_1_1.all')
    },
    getLabel(msg) {
      return `${msg}${this.$i18n.locale === 'zh' && '：' || ':'}`;
    },
    dateFormat(v) {
      return Vue.filter('DateFormat')(v, 'DD/MM/YYYY HH:mm')
    },
    setData(data, operateType) {
      this.popupData = { ...data }
    }
  }
}
</script>

<style lang="stylus" scoped>
.current-basic-form-item {
  width: 100%;
}

.current-basic-form-input {
  width: 200px;
}

.add-image {
  width: 12px;
  height: 192px;
  border: 1px dashed #f39322;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  color: #f39322;
}

.add-image:hover {
  border: 0 none !important;
  background-color: #f39322;
  color: #fff;
}

.add-image::before {
  content: '+';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
}
</style>
