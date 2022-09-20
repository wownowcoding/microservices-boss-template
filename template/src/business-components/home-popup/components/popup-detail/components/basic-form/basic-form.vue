<template>
  <div class="basic-form">
    <Form ref="basicForm" :label-width="160" :model="popupData" :rules="popupDataRules" inline>
      <!-- 基础信息 -->
      <VCard style="margin-bottom: 10px" :title="$t('user.base_info')">
        <!-- 弹框名称 -->
        <FormItem prop="popName" class="current-basic-form-item" :label="getLabel($t('v3_1_1.adHeadline'))">
          <Input class="current-basic-form-input" type="text" v-model="popupData.popName" />
        </FormItem>
        <!-- 计划投放时间 -->
        <FormItem class="current-basic-form-item" prop="beginTime" :label="getLabel($t('v2_1_1.scheduledTime'))">
          <div>
            <DatePicker
              :options="fromOptions"
              clearable
              split-panels
              style="width: 280px"
              type="datetimerange"
              format="yyyy/MM/dd HH:mm"
              @on-change="
                value => {
                  handleSetValue(value)
                }
              "
              v-model="adTime"
            />
            <div style="font-size: 12px; color: #ff3300;line-height: 22px;">（{{ $t('scriptv2.bf01c50071763a590755b279c5b8c5eba') }}）</div>
            <div style="font-size: 12px; color: #ff3300;line-height: 22px;">（{{ $t('scriptv2.a83f2155bab3820dc5c00fc2c50d76fd6') }}）</div>
          </div>
        </FormItem>
      </VCard>

      <!-- 弹框规则 -->
      <VCard style="margin-bottom: 10px" :title="$t('v4_1_1.bulletRules')">
        <!-- 触发时机 -->
        <FormItem :label="getLabel($t('v4_1_1.triggerTiming'))" class="current-basic-form-item" prop="openOcacasion">
          <RadioGroup v-model="popupData.openOcacasion">
            <Radio v-for="item in popOpenOccasion" :label="item.code" :key="item.code">
              <span>{{ item.message }}</span>
            </Radio>
          </RadioGroup>
        </FormItem>

        <!-- 弹窗时间 -->
        <FormItem :label="getLabel($t('v9_2_1.popupTime'))" class="current-basic-form-item" prop="popTimeType">
          <RadioGroup v-model="popupData.popTimeType">
            <Radio v-for="item in popTimeType" :label="item.code" :key="item.code">
              <span>{{ item.message }}</span>
            </Radio>
          </RadioGroup>
          <div v-if="popupData.popTimeType == 11">
            <TimePicker style="width: 150px" :value="popupTime" type="timerange" :format="'HH:mm'" confirm @on-change="onTimerPickerChange" />
          </div>
        </FormItem>

        <!-- 选择分群 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('v4_1_1.selectGroup'))" prop="userLabelNo" v-if="isSelectOpenOcacasion">
          <user-group-select v-model="group" />
        </FormItem>

        <!-- 展示频率 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('v2_1_1.showFrequency'))" prop="showType">
          <RadioGroup v-model="popupData.showType">
            <Radio v-for="week in popShowType" :label="week.code" :key="week.code">
              <span>{{ week.message }}</span>
            </Radio>
            <ul style="color: #999; font-size: 12px;">
              <li>{{ this.$t('scriptv2.a3c65adced46dd7b98dce607a32761cf0') }}</li>
              <li>{{ this.$t('scriptv2.c7374629a6dfe1121521a185d81166482') }}</li>
            </ul>
          </RadioGroup>
        </FormItem>

        <!-- 图片展示规则 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('v4_1_1.pictureDisplayRules'))" prop="picShowRule">
          <RadioGroup v-model="popupData.picShowRule">
            <Radio v-for="popPic in popPicShowRule" :label="popPic.code" :key="popPic.code">
              <span>{{ popPic.message }}</span>
            </Radio>
          </RadioGroup>
        </FormItem>

        <!-- 投放地区 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('v2_1_1.deliveryArea'))" prop="areaCodeList">
          <Select v-model="areaCodeList" style="width: 200px">
            <Option v-for="opt in adsZoneAll" style="text-transform: capitalize" :label="opt.message" :value="opt.code" :key="opt.code"></Option>
          </Select>
        </FormItem>
      </VCard>

      <!-- 内容配置 -->
      <VCard style="margin-bottom: 10px" :title="$t('v4_1_1.contentConfiguration')">
        <!-- 中文图片 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('system.chinese'))" prop="zhImageAndLinkInfos">
          <div v-for="(e, i) in popupData.zhImageAndLinkInfos" :key="'zh-image-url-list-' + (i + 1)">
            <upload-preview-image ref="zhImageAndLinkInfos" :format="imgOption.format" group="app" v-model="popupData.zhImageAndLinkInfos[i]" :maxSize="imgOption.maxSize" :autoCropWidth="imgOption.autoCropWidth" :autoCropHeight="imgOption.autoCropHeight" :limit="1" uploadType="drag" :imagesLength="popupData.zhImageAndLinkInfos.length" @remove-image="removeImage('zhImageAndLinkInfos', i)" />
          </div>
          <div class="add-image" v-if="popupData.zhImageAndLinkInfos.length < 5" @click="addImage('zhImageAndLinkInfos')" />
        </FormItem>
        <!-- 英文图片 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('v3_1_1.english'))" prop="enImageAndLinkInfos">
          <div v-for="(e, i) in popupData.enImageAndLinkInfos" :key="'en-image-url-list-' + (i + 1)">
            <upload-preview-image ref="enImageAndLinkInfos" :format="imgOption.format" group="app" v-model="popupData.enImageAndLinkInfos[i]" :maxSize="imgOption.maxSize" :autoCropWidth="imgOption.autoCropWidth" :autoCropHeight="imgOption.autoCropHeight" :limit="1" uploadType="drag" :imagesLength="popupData.enImageAndLinkInfos.length" @remove-image="removeImage('enImageAndLinkInfos', i)" />
          </div>
          <div class="add-image" v-if="popupData.enImageAndLinkInfos.length < 5" @click="addImage('enImageAndLinkInfos')" />
        </FormItem>
        <!-- 柬文图片 -->
        <FormItem class="current-basic-form-item" :label="getLabel($t('v2_1_1.khmer'))" prop="kmImageAndLinkInfos">
          <div v-for="(e, i) in popupData.kmImageAndLinkInfos" :key="'km-image-url-list-' + (i + 1)">
            <upload-preview-image ref="kmImageAndLinkInfos" :format="imgOption.format" group="app" v-model="popupData.kmImageAndLinkInfos[i]" :maxSize="imgOption.maxSize" :autoCropWidth="imgOption.autoCropWidth" :autoCropHeight="imgOption.autoCropHeight" :limit="1" uploadType="drag" :imagesLength="popupData.kmImageAndLinkInfos.length" @remove-image="removeImage('kmImageAndLinkInfos', i)" />
          </div>
          <div class="add-image" v-if="popupData.kmImageAndLinkInfos.length < 5" @click="addImage('kmImageAndLinkInfos')" />
        </FormItem>
      </VCard>
      <!-- <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      </FormItem> -->
    </Form>
  </div>
</template>

<script>
import { validRequired, validateTimeRange, validListRequired } from '@/utils/validator';
import UserGroupSelect from '@/business-components/user-group-select'
import WownowSelect from '@/business-components/content-drawer/basic-form-component/components/wownow-select';
import UploadPreviewImage from './upload-preview-image';
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
      // 弹窗时间类型
      popTimeType: '',
      popStartTime: '',
      popEndTime: '',
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
      popTipVisible: ''
    });
    return {
      operateType: 'add',
      popupDataStr,
      popupData: JSON.parse(popupDataStr),
      isShowForm: false,
      popupTime: [],
      imgOption: {
        autoCropWidth: 570,
        autoCropHeight: 760,
        maxSize: 500,
        format: ['jpg', 'jpeg', 'png', 'gif']
      }
    };
  },
  computed: {
    adTime() {
      if (this.popupData.beginTime && this.popupData.endTime) {
        return [this.popupData.beginTime, this.popupData.endTime]
      }
      return []
    },
    fromOptions: {
      disabledDate(date) {
        return date && date.valueOf() < Date.now() - 86400000;
      }
    },
    areaCodeList: {
      get() {
        if (this.popupData.areaCodeList && this.popupData.areaCodeList.length) {
          return this.popupData.areaCodeList[0]
        }
        return ''
      },
      set(val) {
        this.popupData.areaCodeList = [val]
      }
    },
    group: {
      get() {
        return {
          userLabelNo: this.popupData.userLabelNo || '',
          userLabelName: this.popupData.userLabelName || ''
        }
      },
      set(val) {
        this.popupData.userLabelNo = val.userLabelNo
        this.popupData.userLabelName = val.userLabelName
      }
    },
    disabled() {
      return this.disabled
    },
    adsZoneAll() {
      return [{ code: 'all', message: this.$t('v4_1_1.all') }, ...this.adsZone]
    },
    popTimeType() {
      return [
        { code: 10, message: this.$t('v9_2_1.anyTimeOfDay') },
        { code: 11, message: this.$t('v9_2_1.fixedTimePeriodEveryDay') },
      ]
    },
    ...Vuex.mapState({
      __popOpenOccasion: (state, getter) => getter.enumStateArr('config', 'popOpenOccasion'),
      popShowType: (state, getter) => getter.enumStateArr('config', 'popShowType'),
      businessLine: (state, getter) => getter.enumStateArr('basic-common', 'businessLine'),
      popPicShowRule: (state, getter) => getter.enumStateArr('config', 'popPicShowRule'),
    }),
    //  选择那些触发条件需要选择用户群判断
    isSelectOpenOcacasion() {
      return [13, 15, 17].indexOf(this.popupData.openOcacasion - 0) !== -1;
    },
    //  不同业务方对应不同的触发时机
    popOpenOccasion() {
      if (this.clientType === 'SuperApp') {
        const filterMap = { '10': 1, '11': 1, '12': 1, '13': 1, '18': 1 };
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
    //  数据校验规则
    popupDataRules() {
      const self = this
      return {
        popName: [{ required: true, validator: validRequired, trigger: 'blur' }],
        currentTimes: [{ required: true, validator: (rule, value, callback) => validateTimeRange(value, callback), trigger: 'blur' }],
        openOcacasion: [{ required: true, validator: validRequired, trigger: 'blur' }],
        userLabelNo: [{
          required: true, validator: (...args) => {
            if (this.isSelectOpenOcacasion) {
              return validRequired(...args);
            } else {
              for (const e of args) {
                if (typeof e === 'function') {
                  return e();
                }
              }
            }
          }, trigger: 'blur'
        }],
        popTimeType: [{
          required: true, validator: validRequired, trigger: 'blur'
        }, {
          validator: (rules, value, cb) => {
            const { popStartTime, popEndTime, popTimeType } = this.popupData
            if (popTimeType == 11 && (!popStartTime || !popEndTime)) {
              return cb(new Error(this.$t('tips.required')))
            }
            cb()
          }
        }],
        showType: [{ required: true, validator: validRequired, trigger: 'blur' }],
        picShowRule: [{ required: true, validator: validRequired, trigger: 'blur' }],
        areaCodeList: [{ required: true, validator: validListRequired, trigger: 'blur' }],
        beginTime: [{
          required: true,
          validator: (...params) => {
            const [rule, value, callback] = params;
            const _value = [self.popupData.beginTime, self.popupData.endTime]
            if (_value[0] && _value[1]) {
              let startTime = _value[0]
              let endTime = _value[1]
              let nowTime = new Date()
              nowTime.setHours(0)
              nowTime.setMinutes(0)
              nowTime.setMilliseconds(0)
              nowTime.setSeconds(0)
              if (startTime - nowTime < 0) {
                return callback(new Error(self.$t('v2_1_1.theEarliestStartDateCanOnlyBeTheDateOfTheDay')))
              }
              if (startTime - endTime > 0) {
                return callback(new Error(self.$t('v2_1.time_tip')))
              }
              if (nowTime - endTime > 0) {
                return callback(new Error(self.$t('v2_1.time_now_tip')))
              }
            } else {
              return validRequired(rule, '', callback);
            }
            return callback()
          },
          trigger: 'blur'
        }],
        zhImageAndLinkInfos: [{ required: true, validator: validListRequired, trigger: 'blur' }],
        enImageAndLinkInfos: [{ required: true, validator: validListRequired, trigger: 'blur' }],
        kmImageAndLinkInfos: [{ required: true, validator: validListRequired, trigger: 'blur' }]
      };
    }
  },
  methods: {
    async validate() {
      // console.log('basicFormValidateRes: ', basicFormValidateRes);
      // const zhImageAndLinkInfosValidateRes = !!((this?.zhImageAndLinkInfos?.length && (await Promise.all(this.zhImageAndLinkInfos.map((e, i) => this.$refs.zhImageAndLinkInfos[i].validate()))) || [false]).filter(e => !!e).length);
      // console.log('zhImageAndLinkInfosValidateRes: ', zhImageAndLinkInfosValidateRes);
      const validate = []
      validate.push(this.$refs.basicForm.validate())
      this.$refs.zhImageAndLinkInfos.forEach(item => validate.push(item.validate()))
      this.$refs.enImageAndLinkInfos.forEach(item => validate.push(item.validate()))
      this.$refs.kmImageAndLinkInfos.forEach(item => validate.push(item.validate()))
      return new Promise((req, rej) => {
        Promise.all(validate).then(res => {
          for (const item of res) {
            if (item === false) {
              rej()
            }
          }
          req()
        })
      })
    },
    onTimerPickerChange(val) {
      if (val && val.length) {
        this.popupTime = val
        this.$set(this.popupData, 'popStartTime', val[0])
        this.$set(this.popupData, 'popEndTime', val[1])
      } else {
        this.popupTime = []
        this.$set(this.popupData, 'popStartTime', null)
        this.$set(this.popupData, 'popEndTime', null)
      }
    },
    getLabel(msg) {
      return `${msg}${this.$i18n.locale === 'zh' && '：' || ':'}`;
    },
    removeImage(name, imgIndex) {
      this.popupData[name].splice(imgIndex, 1);
    },
    addImage(name) {
      this.popupData[name].push({
        popImage: '',
        jumpLink: ''
      });
    },
    submitClick() {
      return this.validate()
    },
    setData(data, operateType) {
      const { popStartTime, popEndTime } = data
      if (popStartTime && popEndTime) {
        this.popupTime = [popStartTime, popEndTime]
      }
      this.popupData = { ...data }
      this.operateType = operateType
    },
    // 设置日期的值
    handleSetValue(value) {
      if (value[0]) {
        this.popupData.beginTime = `${value[0]}:00`
        this.popupData.endTime = `${value[1]}:59`
        const s = new Date(this.popupData.beginTime)
        const e = new Date(this.popupData.endTime)
        if (s.toString().indexOf('GMT+0800') > -1) {
          s.setHours(s.getHours() + 1)
          e.setHours(e.getHours() + 1)
        }
        this.$set(this.popupData, 'beginTime', s.getTime())
        this.$set(this.popupData, 'endTime', e.getTime())
      } else {
        this.popupData.beginTime = ''
        this.popupData.endTime = ''
      }
    },
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
