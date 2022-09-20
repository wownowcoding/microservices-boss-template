<!--
 * @Description:
 * @Author:
 * @Date: 2018-10-08 14:35:06
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-09-10 11:25:44
 -->
<template>
    <div class="info-detail">
        <Modal :title="$t('utils.preview_pic')" v-model="visible">
            <img :src="imgUrl" v-if="visible" style="width: 100%">
        </Modal>
        <div class="page">
            <Form :label-width="150">
                <Card class="card-margin-bottom">
                    <div class="title" slot="title">{{$t("user.base_info")}}</div>
                    <Row :gutter="16">
                        <!-- 昵称 -->
                        <Col :span="8">
                            <FormItem :label="$t('user.nick_name')">{{user_data.nickName}}</FormItem>
                        </Col>
                        <!-- 用户账号： -->
                        <Col :span="8">
                            <FormItem :label="$t('user.customer_account')">{{user_data.phoneNumber}}</FormItem>
                        </Col>
                        <!-- 用户编号： -->
                        <Col :span="8">
                            <FormItem :label="$t('user.user_no')">{{user_data.userNo}}</FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col :span="8">
                            <!-- 注册时间 -->
                            <FormItem
                                :label="$t('user.registration_date')"
                            >{{user_data.registerDatetime}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 用户状态 -->
                            <FormItem
                                :label="$t('user.customer_state')"
                            >{{user_data.status && user_data.status.message}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 账号等级 -->
                            <FormItem
                                :label="$t('part_second.account_grade')"
                            >{{user_data.accountLevelEnum && user_data.accountLevelEnum.message}}</FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col :span="8">
                            <!-- 联系方式 -->
                            <FormItem :label="$t('user.net_way')">{{user_data.phoneNumber}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 联系方式 -->
                            <FormItem :label="$t('user.postbox')">{{user_data.billEmail}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 用户活跃类型 -->
                            <FormItem
                                :label="$t('user.customer_level')"
                            >{{user_data.activeType && user_data.activeType.message}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 上次登录时间 -->
                            <FormItem
                                :label="$t('user.last_login_time')"
                            >{{user_data.lastLoginDatetime}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem
                                :label="$t('v1.personalInvitationCode')"
                            >{{user_data.myInvitationCode}}</FormItem>
                        </Col>
                    </Row>
                </Card>
                <Card class="card-margin-bottom">
                    <!-- 实名信息 -->
                    <div class="title" slot="title">{{$t("user.real_name_info")}}</div>
                    <Row :gutter="16">
                        <Col :span="8">
                            <!-- 国籍 -->
                            <FormItem :label="$t('system.country1')">{{contry}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 名字 -->
                            <FormItem :label="$t('user.first_name')">{{user_data.name}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 姓 -->
                            <FormItem :label="$t('user.second_name')">{{user_data.surname}}</FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col :span="8">
                            <!-- 性别 -->
                            <FormItem
                                :label="$t('user.sex')"
                            >{{user_data.sex && user_data.sex.message}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 证件类型 -->
                            <FormItem
                                :label="$t('user.cardType')"
                            >{{user_data.cardType && user_data.cardType.message}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 证件号码 -->
                            <FormItem :label="$t('user.cardNum')">{{user_data.cardNum}}</FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col :span="8">
                            <!-- 出生日期 -->
                            <FormItem :label="$t('part_second.born_data')">{{birthday}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 证件有效期 -->
                            <FormItem
                                :label="$t('part_second.certificate_validity_period')"
                            >{{expirationTime}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 证件照正面 -->
                            <FormItem :label="$t('part_second.document_photo')">
                                <PrevImg :src="user_data.idCardFrontUrl"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <div
                            v-show="user_data.cardType && user_data.cardType.code != 13"
                            class="block"
                        >
                            <!-- 证件照反面 -->
                            <FormItem :label="$t('part_second.document_photo_back')">
                                <PrevImg :src="user_data.idCardBackUrl"/>
                            </FormItem>
                        </div>
                        <Col :span="8">
                            <!-- 手持证件照 -->
                            <FormItem :label="$t('part_second.hand_held_certificate')">
                                <PrevImg :src="user_data.cardHandUrl"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Card>
                <!-- 注册来源信息 -->
                <Card class="card-margin-bottom" :title="$t('v1.registrationSourceInformation')">
                    <Row :gutter="16">
                        <Col :span="8">
                            <FormItem :label="$t('v1.typeOfInvitationSource')">
                                {{invitationSourceEnum(user_data.invitationSource)}}
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem :label="$t('v1.inviterAccount')">
                                {{user_data.invitationAccount}}
                            </FormItem>
                        </Col>
                    </Row>
                </Card>
                <Card v-for="(item, index) in outerAuths" :key="index" class="card-margin-bottom">
                    <!-- 第三方授权信息 -->
                    <div class="title" slot="title">{{$t("v1.thirdPartyAuthorizationInformation")}}</div>
                    <Row :gutter="16">
                        <Col :span="8">
                            <!-- 第三方授权渠道 -->
                            <FormItem
                                :label="$t('v1.thirdPartyAuthorizationChannel')"
                            >{{item.channel ? item.channel.message: '-'}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 邮箱 -->
                            <FormItem :label="$t('v1.Email')">{{item.email}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 昵称 -->
                            <FormItem :label="$t('v1.nickname')">{{item.nickName}}</FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col :span="8">
                            <!-- 姓 -->
                            <FormItem :label="$t('v1.surname')">{{item.lastName}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 名 -->
                            <FormItem :label="$t('v1.name')">{{item.firstName}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 头像 -->
                            <FormItem :label="$t('v1.avatar')">
                                <PrevImg :src="item.profilePic"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col :span="8">
                            <!-- 性别 -->
                            <FormItem :label="$t('v1.gender')">{{!!item.sex?sexEnum(item.sex): '-' }}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 地区 -->
                            <FormItem :label="$t('v1.region')">{{item.local}}</FormItem>
                        </Col>
                        <Col :span="8">
                            <!-- 主页链接 -->
                            <FormItem :label="$t('v1.homePageLink')">
                                <a :href="item.linkUri" target="_blank">{{item.linkUri}}</a>
                            </FormItem>
                        </Col>
                    </Row>
                </Card>
            </Form>

            <Card class="card-margin-bottom">
                <!-- 操作记录 -->
                <div class="title" slot="title">{{$t("utils.record")}}</div>
                <Table :loading="loading" :columns="columns" :data="formData"></Table>
                <div class="page-divited">
                    <Page
                        @on-change="pageChange"
                        :current="page.current"
                        :page-size="page.pageSize"
                        :total="page.total"
                        show-elevator
                    ></Page>
                </div>
            </Card>
            <div class="buttons_wrap">
                <Button @click="back" type="primary">{{$t('btn.back')}}</Button>
            </div>
        </div>
    </div>
</template>

<script>
import { api_func } from '@/api'
import PrevImg from '@/components/PrevImg/';
const { mapState } = Vuex;

export default {
    name: 'info-detail',
    data() {
        return {
            loading: false,
            page: {
                total: 0,
                pageSize: 10,
                current: 1
            },
            user_data: {},
            outerAuths: [],//第三方验证信息
            // 预览图片
            imgUrl: '',
            visible: false,
            columns: [
                {
                    // 操作员
                    title: this.$t('utils.user'),
                    key: 'loginName',
                },
                {
                    // 操作结果
                    title: this.$t('utils.result'),
                    key: 'content',
                },
                {
                    // 备注说明
                    title: this.$t('utils.remarks'),
                    key: 'remark',
                    render: (h, params) => {
                        if (params.row.remark) {
                            let show = params.row.remark
                            return h('div', show)
                        }
                    }
                },
                {
                    // 操作时间
                    title: this.$t('system.operat_time'),
                    key: 'reqTime'
                }
            ],
            formData: []
        }
    },
    created() {
        this.getDetail()
        // 获取用户第三方认证信息
        this.getOuterAuth()
        this.getRecord()
    },
    computed: {
        ...mapState({
            rolePart: state => state.rolePart.rolePart
        }),
        sexEnum() {
            return this.$store.getters.enumGetter('usercenter', 'userCert')
        },
        invitationSourceEnum() {
            return this.$store.getters.enumGetter('usercenter', 'invitationSource')
        },
        contry() {
            if (this.user_data.countryCode) {
                return this.Util.country_show(this.user_data.countryCode)
            }
        },
        expirationTime() {
            if (this.user_data.expirationTime) {
                return this.moment(this.user_data.expirationTime).format('MM/DD/YYYY')
            }
        },
        birthday() {
            if (this.user_data.birthday) {
                return this.moment(this.user_data.birthday).format('MM/DD/YYYY')
            }
        },
    },
    methods: {
        back() {
            this.$router.back()
            let name = this.$route.name
        },
        pageChange(page) {
            this.getRecord({ page });
        },
        async getDetail() {
            let data = this.$route.query;
            let res = await api_func(data, 'user_query')

            if (res.rspCd === '00000') {
                this.user_data = res.data;
            }
        },
        // 第三方验证信息
        async getOuterAuth() {
            let { userNo } = this.$route.query;
            let res = await api_func({ operatorNo: userNo }, 'user_outer_auth')

            if (res.rspCd === '00000') {
                this.outerAuths = res.data;
            }
        },
        async getRecord(pageParam = {}) {
            let data = this.$route.query;
            data.pageSize = this.page.pageSize;
            data.pageNo = pageParam.page || 1;
            let res = await api_func(data, 'user_operationLog')
            if (res.rspCd === '00000') {
                let { total, list } = res.data;
                this.formData = list || []
                this.loading = false
                this.page = {
                    total,
                    current: data.pageNo,
                    pageSize: 10
                }
            }
        },

        // 预览图片
        showImg(target) {
            this.visible = true;
            this.imgUrl = target
        }
    },
    components: { PrevImg }
}
</script>

<style lang="stylus" scoped>
.info-detail
    .show
        display flex
        .part
            width 400px
        .block
            padding 5px 0
            display flex
    .key
        font-size 15px
    .value
        font-size 14px
        color #818181
        img
            width 220px
            border 10px solid #ccc
            margin-right 15px
            cursor pointer
    .list
        margin 15px
    .table
        margin-top 30px
    button.mark
        width 220px
button.unmark
    width 250px
button.removeb
    width 180px
button.joinb
    width 160px
button.feeze
    width 140px
button.unfreeze
    width 160px
.page_table
    margin-top 5px
</style>
