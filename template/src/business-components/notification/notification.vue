<template>
  <div>
    <Form ref="form" :label-width="180" :model="form" :rules="ruleCustom">
      <Card class="announcement-wrapper" :title="title">
        <FormItem :label="getLabel(`${$t('v1_6.notificationNumber')}`)" v-if="form.messageNo">
          {{ form.messageNo }}
        </FormItem>
        <FormItem :label="getLabel(`${$t('v1.messageType')}`)" prop="messageType" ref="messageType">
          <span v-if="disabled">{{ messageTypeEnum(form.messageType) }}</span>
          <ButtonRadio v-else v-model="form.messageType" @change="messageTypeChange" :options="messageType"></ButtonRadio>
        </FormItem>
        <FormItem :label="getLabel(`${$t('v3_1_1.pushBusinessLine')}`)">
          <span v-if="disabled">{{ businessLineEnum(form.businessLine) }}</span>
          <ButtonRadio v-else v-model="form.businessLine" :options="businessLineFilter"></ButtonRadio>
        </FormItem>
        <FormItem :label="getLabel(`${$t('v1.sendObject')}`)" prop="messageRecipientType" ref="messageRecipientType">
          <Radio-group v-model="form.messageRecipientType" @on-change="messageRecipientTypeChange">
            <Radio :disabled="disabled" :label="item.code" v-for="item in messageRecipientType" :key="item.code">{{ item.message }}</Radio>
          </Radio-group>
          <Poptip v-if="form.messageRecipientType == 12 && !disabled" v-model="popTipVisible" placement="right-start">
            <User-Group-Select
              slot="content"
              :businessLineOps="businessLineFilter"
              :userLabelNo="form.userLabelNo"
              @change="updateGroupValue"
            />

            <Input v-model="form.userLabelName" style="width: 200px; display:inline-block;" readonly :placeholder="$t('v3_1_1.pleaseSelectUserGroup')" />
          </Poptip>
          <Input v-if="form.messageRecipientType == 12 && disabled" v-model="form.userLabelName" :disabled="disabled" style="width: 200px; display:inline-block;" readonly :placeholder="$t('v3_1_1.pleaseSelectUserGroup')" />
        </FormItem>
        <FormItem :label="getLabel(`${$t('v3_1_1.chooseClient')}`)" prop="recipientType" v-if="form.messageRecipientType == 10">
          <CheckboxGroup v-model="form.recipientType">
            <Checkbox v-for="item in recipientType" :key="item.code" :label="item.code" :disabled="disabled">{{ item.message }}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <!-- <FormItem :label="getLabel(`${$t('v3_1_1.userLabel')}`)" prop="userLabelNo" v-else>
          <Radio-group v-model="form.userLabelNo" @on-change="userLabelNoChange">
            <Radio :disabled="disabled" :label="item.code" v-for="item in userType" :key="item.code">{{ item.message }}</Radio>
          </Radio-group>
        </FormItem> -->
        <FormItem :label="`${$t('v1_6.sendStatus')}：`" v-if="form.messageNo">
          {{ stateFormat(form.state) }}
        </FormItem>
        <FormItem :label="getLabel(`${$t('v1_6.sendTime')}`)" prop="sendType" ref="sendType" v-if="this.$route.query.type !== 'view'">
          <Radio-group v-model="form.sendType" @on-change="() => this.$refs.sendType.onFieldBlur()">
            <Radio :label="10" :disabled="disabled">{{ $t('v1_6.sendImmediately') }}</Radio>
            <Radio :label="11" :disabled="disabled">{{ $t('v1_6.timedSending') }}</Radio>
          </Radio-group>

          <DatePicker :disabled="disabled" v-if="form.sendType === 11" type="datetime" :placeholder="$t('v1_6.pleaseChooseDateTime')" v-model="form.sendTime" :format="'yyyy-MM-dd HH:mm:ss'"></DatePicker>
        </FormItem>
      </Card>

      <Card style="margin-top: 10px" :title="$t('v3_1_1.notificationContent')">
        <template v-if="form.messageType.toLocaleLowerCase().replace(/\s/g, '') === 'servicenotice' && !disabled">
          <FormItem :label="getLabel(`${$t('v3_1_1.messageContent')}`)">
            <Radio-group v-model="form.messageContentType">
              <Radio :disabled="disabled" :label="item.code" v-for="item in messageContentTypeArr" :key="item.code">{{ item.message }}</Radio>
            </Radio-group>
          </FormItem>
        </template>
        <div style="margin: 10px 110px; position: relative">
          <Tabs v-model="language">
            <Tab-pane label="中文" name="zh"></Tab-pane>
            <Tab-pane label="English" name="en"></Tab-pane>
            <Tab-pane label="ខ្មែរ" name="cb"></Tab-pane>
          </Tabs>
        </div>
        <div style="display: flex">
          <div>
            <FormItem :label="getLabel(`${$t('v3_1_1.headFigure')}`)" :key="language + 'Picture'" v-if="form.messageContentType == '11'">
              <div>
                <div style="display: flex">
                  <ImagesBeforeUpload :fileTypeRegexp="/\.(jpg|png|jpeg|JPEG|JPG|PNG)/" :disabled="disabled" :maxSize="500" :value="this.form[language + 'Picture'] ? [{ url: this.form[language + 'Picture'] }] : []" @input="list => handleUpload(list, language + 'Picture')" :autoCropWidth="750" :autoCropHeight="500" :showList="false" />
                  <UploadFile @success="list => handleUploadVideoSuccess(list, language + 'Picture')" style="margin-left: 10px" :value="this.form[language + 'Picture'] ? [{ url: this.form[language + 'Picture'] }] : []" group="app" :format="['mp4']" :maxSize="8000" :disabled="disabled" :showUploadList="false" :hasShowVideo="false">
                    <Button :disabled="this.form[language + 'Picture'] || disabled" type="primary">{{ $t('v3_1_1.uploadVideo') }}</Button>
                  </UploadFile>
                </div>

                <div class="result-wrapper" v-if="form[language + 'Picture']">
                  <video v-if="form[language + 'Picture'].indexOf('.mp4') > -1" class="myVideo" width="300" :src="form[language + 'Picture']" controls></video>
                  <ImageGallery v-else :imgList="[form[language + 'Picture']]" />
                  <span v-if="!disabled" class="result-close" @click="removeImg([language + 'Picture'])">
                    <Icon size="20" type="ios-close-circle-outline" />
                  </span>
                </div>
              </div>
            </FormItem>
            <FormItem :label="getLabel(`${$t('v3_1_1.title')}`)" :prop="language + 'Name'">
              <Input :disabled="disabled" v-model="form[language + 'Name']" style="width: 320px" type="textarea" :autosize="autosize" :maxlength="256"></Input>
            </FormItem>
            <FormItem :label="getLabel(`${$t('v3_1_1.text')}`)" :prop="language + 'Content'">
              <Input :disabled="disabled" v-model="form[language + 'Content']" style="width: 320px" type="textarea" :autosize="autosize" :maxlength="512"></Input>
            </FormItem>
            <FormItem :label="getLabel(`${$t('v3_1_1.jumpWord')}`)" :prop="language + 'Link'" v-if="form.messageContentType == '11'">
              <div style="width: 100%; height: 100%;word-break: break-all;">
                <span v-if="disabled">
                  {{ showZdy(form[language + 'Link']) ? form[language + 'Link'] : links.find(item => item.code == form[language + 'Link']).message }}
                </span>
                <template v-else>
                  <ButtonRadio v-model="form[language + 'Link']" :options="links"></ButtonRadio>
                  <div>
                    <Button :type="showZdy(form[language + 'Link']) ? 'primary' : 'default'" @click="form[language + 'Link'] = ''">{{ $t('v3_1_1.customize') }}</Button>
                    <Input v-if="showZdy(form[language + 'Link'])" style="width: 180px; margin-left: 10px" :disabled="disabled" v-model="form[language + 'Link']"></Input>
                  </div>
                </template>
              </div>
            </FormItem>

            <template v-if="form.messageType === 'Service Notice'">
              <FormItem :label="getLabel(`${$t('v1_6.jumpPageName')}`)" prop="linkName">
                <Input v-model="form.linkName" :disabled="disabled" style="width: 220px"></Input>
              </FormItem>
              <FormItem :label="getLabel(`${$t('v1_6.jumpPageAddress')}`)" prop="linkAddress">
                <Input v-model="form.linkAddress" :disabled="disabled" style="width: 220px"></Input>
              </FormItem>
            </template>
          </div>
          <MsgPreview
            :businessLine="form.businessLine"
            :img="form.messageContentType == 11?form[language + 'Picture'] : ''"
            :title="form[language + 'Name']"
            :content="form[language + 'Content']"
            :buttonName="form[language + 'Link']"
          ></MsgPreview>
        </div>
      </Card>

      <!-- 变更原因 -->
      <Card class="msg_card" :title="$t('v1_6.changeReason')" v-if="operaType === 'edit'">
        <FormItem :label="`${$t('v1_6.changeReason')}：`" prop="reason">
          <Input v-model="form.reason" type="textarea" :autosize="autosize" />
        </FormItem>
      </Card>

      <!-- 操作记录 -->
      <Card class="msg_card" :title='$t("v1_6.operationRecord")' v-if="operaType === 'view'">
        <VipayTable ref='VipayTable' :table="table" @handleSearch="handleSearch" class="VipayTable">
        </VipayTable>
      </Card>
      <div class="pub_btns">
        <Button @click="goBack">{{ $t('btn.back') }}</Button>
        <Button v-if="$route.query.type === 'view'" type="primary" @click="resend">{{ $t('v2_1_1.resend') }}</Button>
        <Button v-else type="primary" :loading="saveLoading" @click="saveAction">{{ $t('btn.submit') }}</Button>
      </div>
    </Form>
  </div>
</template>

<script>
import tableList from './add/mixins/table'
import ButtonRadio from './child-item/button-radio'
import VipayTable from "@/components/VipayTable"
import MsgPreview from './child-item/msg-preview'
import UploadFile from '@/components/Upload/UploadFile.vue'
import ImagesBeforeUpload from '@/components/ImagesBeforeUpload/index'
import UserGroupSelect from './child-item/user-group-select.vue'
import {
  api,
  addStationLetter,
  editStationLetter,
  stationLetterDetail,
  operateRecord,
  hasUserType
} from "@/api/systemManagement/message";
import ImageGallery from '@/components/ImageGallery'
import linkMins from "./mixins/links"
import Store from '@/utils/store'

const getFormInit = () => ({
  cbName: '',
  enName: '',
  zhName: '',
  cbContent: '',
  enContent: '',
  zhContent: '',
  cbPicture: '',
  enPicture: '',
  zhPicture: '',
  cbLink: '',
  enLink: '',
  zhLink: '',
  messageRecipientType: 10,
  recipientType: [],
  userLabelNo: '',
  userLabelName: '',
  businessLine: '',
  messageType: 'Service Notice',
  messageContentType: 11,
  sendType: '',
  linkName: '',
  linkAddress: '',
  sendTime: '',
  reason: ''
})

export default {
  mixins: [linkMins, tableList],
  data() {
    return {
      disabled: false,
      form: getFormInit(),
      language: 'zh',
      operaType: 'add',
      saveLoading: false,
      popTipVisible: false,
      userType: [],
      langMaps: {
        'zh': 'zh-CN',
        'en': 'en-US',
        'km': 'cb'
      },
      autosize: {
        minRows: 4,
        maxRows: 5
      },
      extenForm: {}
    }
  },
  watch: {
    'form.messageRecipientType' (val) {
      if (val != 12) {
        this.popTipVisible = false
      }
    }
  },
  computed: {
    businessLineFilter() {
      let businessLineOrg = Store.loadObject('businessLine') || []
      const businessLine = []
      for (let i = 0; i < this.businessLine.length; i++) {
        if (businessLineOrg.includes(this.businessLine[i].code)) {
          businessLine.push(this.businessLine[i])
        }
      }
      return businessLine
    },
    ruleCustom() {
      const ruleCustoms = e => {
        const obj = {}
        e.forEach(key => {
          obj[key] = [{ required: true, message: this.$t('v1_6.canNotBeEmpty') }]
        })
        return obj
      }
      const keys = ['messageRecipientType', 'businessLine', 'recipientType', 'userLabelNo', 'linkAddress',
        'reason', 'cbName', 'enName', 'zhName', 'cbContent', 'enContent', 'zhContent',
        'cbPicture', 'enPicture', 'zhPicture', 'cbLink', 'enLink', 'zhLink', 'linkName']
      return {
        ...ruleCustoms(keys),
        sendType: [
          { required: true, message: this.$t('v1_6.canNotBeEmpty'), type: 'number' },
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.form.sendType === 11 && !this.form.sendTime) {
                return callback(this.$t('tips.required'))
              }
              return callback()
            },
            trigger: 'blur'
          }
        ],
        messageRecipientType: [
          { required: true, message: this.$t('v1_6.canNotBeEmpty') },
          { validator: (rule, value, cb) => {
            const { userLabelNo, userLabelName } = this.form
            if (value == 12 && (!userLabelNo || !userLabelName)) {
              return cb(new Error(this.$t('v3_1_1.pleaseSelectUserGroup')))
            }
            cb()
          }}
        ]
      }
    },
    title() {
      if (this.$route.query.type === 'view') {
        return this.$t('v3_1_1.notificationDetails')
      } else if (this.$route.query.type === 'edit') {
        return this.$t('v3_1_1.modificationNotice')
      }
      return this.$t('v3_1_1.newNotification')
    },
    ...Vuex.mapState({
      businessLineEnum: (state, getter) => getter.enumGetter('basic-common', 'businessLine'),
      businessLine: (state, getter) => getter.enumStateArr('basic-common', 'businessLine'),
      messageType: (state, getter) => getter.enumStateArr("message", "messageType"),
      messageTypeEnum: (state, getter) => getter.enumGetter("message", "messageType"),
      recipientType: (state, getter) => getter.enumStateArr("message", "recipientType"),
      messageRecipientType: (state, getter) => getter.enumStateArr("message", "messageRecipientType"),
      messageContentTypeArr: (state, getter) => getter.enumStateArr("message", "messageContentType").sort((a, b) => {
        return b.code - a.code
      }),
    }),
    stateFormat() {
      return this.$store.getters.enumGetter("message", "state");
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.id) {
        this.operaType = this.$route.query.type
        this.disabled = this.$route.query.type === 'view'
        try {
          this.getDetail(this.$route.query.id)
          this.operateRecord(this.$route.query.id)
        } catch(err) {}
      }
      if (this.$route.query.chaos) {
        const params = JSON.parse(decodeURIComponent(this.$route.query.chaos))
        this.setParamsUrl(params)
      }
      try {
        api({
          pageSize: 1000,
          pageNum: 1
        }, hasUserType).then(res => {
          const lang = this.$store.state.settings.lang
          this.userType = res.data.list.map(item => ({
            code: item.tagNo,
            message: item.tagName[this.langMaps[lang]]
          }))
        });
      } catch(errr) {}
    });
  },
  methods: {
    updateGroupValue(obj) {
      const { groupNo, groupName } = obj
      this.form.userLabelNo = groupNo
      this.form.userLabelName = groupName
    },
    handleSubmitBases() {
      return {
        messageRecipientType: this.form.messageRecipientType,
        businessLine: this.form.businessLine,
        messageType: this.form.messageType,
        recipientType: this.form.recipientType,
        sendType: this.form.sendType,
        linkName: this.form.linkName,
        linkAddress: this.form.linkAddress,
        reason: this.form.reason,
        userLabelNo: this.form.userLabelNo || '',
        userLabelName: this.form.userLabelName || '',
        messageContentType: this.form.messageContentType,
      }
    },
    handleSubmitParams() {
      return {
        messageHeadPicture: {
          'cb': this.form.cbPicture,
          'en-US': this.form.enPicture,
          'zh-CN': this.form.zhPicture,
        },
        messageName: {
          'cb': this.form.cbName,
          'en-US': this.form.enName,
          'zh-CN': this.form.zhName,
        },
        messageContent: {
          'cb': this.form.cbContent,
          'en-US': this.form.enContent,
          'zh-CN': this.form.zhContent,
        },
        jumpButtonName: {
          'cb': this.form.cbLink,
          'en-US': this.form.enLink,
          'zh-CN': this.form.zhLink,
        },
        sendTime: this.form.sendType === 11 ? new Date(this.form.sendTime).getTime() : '',
      }
    },
    setParamsUrl(params) {
      const languages = ['zh', 'en', 'cb']
      languages.forEach(key => {
        this.form[`${key}Name`] = params[`${key}Name`] || ''
        this.form[`${key}Picture`] = params[`${key}Picture`] || ''
        this.form[`${key}Link`] = params[`${key}Link`] || ''
      })
      if (params.language) this.language = params.language
      if (params.extenForm) {
        this.extenForm = params.extenForm
      }
      this.form.messageContentType = params.messageContentType
      this.form.linkName = params.linkName // 跳转页名称
      this.form.linkAddress = params.linkAddress // 跳转页地址
      this.form.businessLine = params.businessLine // 业务线
      this.backPath = params.backPath
    },
    saveAction() {
      const language = this.language
      this.validate(async () => {
        this.language = language
        this.saveLoading = true
        let Api = addStationLetter
        const params = {
          ...this.handleSubmitBases(),
          ...this.handleSubmitParams(),
          ...this.extenForm,
        }
        if (this.form.messageNo) {
          Api = editStationLetter
          params.messageNo = this.form.messageNo
        }
        this.$emit('saveAction', true)
        let { rspCd, data } = await api(params, Api);
        if (rspCd + '' === '00000') {
          this.saveLoading = false
          if (this.form.messageNo) {
            this.$Message.success(this.$t('v1.editSuccess'))
          } else {
            this.$Message.success(this.$t('v1.addSuccess'))
          }
          if (this.backPath) {
            this.$router.push(this.backPath)
          } else {
            this.$router.go(-1)
          }
        } else {
          this.saveLoading = false
        }
        this.$emit('saveAction', false)
      })
    },
    validate(cb, index = 0) {
      if (index === 0) {
        this.language = 'zh'
      } else if (index === 1) {
        this.language = 'en'
      } else if (index === 2) {
        this.language = 'cb'
      }
      this.$nextTick(() => {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            if (index === 2) {
              cb()
            } else {
              this.validate(cb, index + 1)
            }
          } else {
            this.$Message.error(this.$t('tips.valid_fail'))
          }
        })
      })
    },
    getLabel(val) {
      return `${val}${this.$t('v1.semicolon')}`
    },
    messageRecipientTypeChange() {
      this.form.recipientType = []
      this.form.userLabelNo = ''
      this.form.userLabelName = ''
      this.$refs.messageRecipientType.onFieldBlur()
    },
    userLabelNoChange(e) {
      const item = this.userType.find(item => item.code === e)
      this.form.userLabelNo = item.code
      this.form.userLabelName = item.message
    },
    // 详情
    async getDetail(messageNo) {
      let { rspCd, data } = await api({ messageNo }, stationLetterDetail);
      if (rspCd + '' === '00000') {
        this.form = { ...data, ...this.handleDetail(data) }
        if (this.$route.query.type === 'add') {
          this.form.messageNo = ''
        }
      }
    },
    // 操作记录
    async operateRecord(messageNo) {
      let { rspCd, data } = await api({
        messageNo,
        pageSize: 100,
        pageNum: 1
      }, operateRecord);
      if (rspCd + '' === '00000') {
        this.table.data = data.list
        this.table.page.total = data.total
      }
    },
    handleDetail(item) {
      if (!item.messageHeadPicture) item.messageHeadPicture = {}
      if (!item.messageContent) item.messageContent = {}
      if (!item.jumpButtonName) item.jumpButtonName = {}
      if (!item.messageName) item.messageName = {}
      return {
        messageType: item.messageType,
        recipientType: item.recipientType,
        enName: item.messageName['en-US'],
        cbName: item.messageName['cb'],
        zhName: item.messageName['zh-CN'],
        enContent: item.messageContent['en-US'],
        cbContent: item.messageContent['cb'],
        zhContent: item.messageContent['zh-CN'],
        cbPicture: item.messageHeadPicture['cb'],
        enPicture: item.messageHeadPicture['en-US'],
        zhPicture: item.messageHeadPicture['zh-CN'],
        cbLink: item.jumpButtonName['cb'],
        enLink: item.jumpButtonName['en-US'],
        zhLink: item.jumpButtonName['zh-CN'],
      }
    },
    resend() {
      this.operaType = 'add'
      this.disabled = false
      this.$router.replace({
        path: this.$route.path,
        query: {
          type: 'add',
          id: this.$route.query.id
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    handleUploadVideoSuccess(list, key) {
      this.form[key] = list[0].url
    },
    handleUpload(data, key) {
      this.form[key] = data[data.length - 1].url
    },
    showZdy(e) {
      const d = this.links.find(item => item.code === e)
      return !d
    },
    removeImg(key) {
      this.form[key] = ''
    },
    messageTypeChange() {
      this.form.linkName = ''
      this.form.linkAddress = ''
      this.form.messageContentType = 10
      this.$refs.messageType.onFieldBlur()
    },
    handleSearch (params = { form: {}, page: {} }) {
      this.pageForm = params.page
      this.operateRecord(this.$route.query.id)
    },
    hangdlePage () {
      this.$refs.VipayTable.handleSearch()
    },
  },
  components: {
    UserGroupSelect,
    ButtonRadio,
    UploadFile,
    ImagesBeforeUpload,
    ImageGallery,
    MsgPreview,
    VipayTable
  }
}
</script>

<style lang="stylus" scoped>
.pub_btns {
  padding: 10px 0;
  width: 100%;
  text-align: center;
}

.result-wrapper {
  display: flex;
  position: relative;
  max-width: 300px;
  width: auto;
  margin: 10px 0;

  .result-close {
    top: 0;
    cursor: pointer;
  }
}

.myVideo {
  margin-right: 10px;
}
</style>
