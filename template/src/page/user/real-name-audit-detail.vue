<template>
    <div class="real-name-audit-detail">
        <md-dialog class="dialogWidth" :md-active.sync="showRefuse">
            <md-dialog-title>{{$t('utils.tip')}}</md-dialog-title>
            <div class="dialog_content">
                <!-- 是否将该用户的实名信息判定为不通过？ -->
                <div>{{$t("part_second.dialog_mark_realname_refuse")}}</div>
                <!-- <div>{{$t("utils.remarks")}}：</div> -->
                <md-field>
                    <!-- 请输入原因 -->
                    <label>{{$t("tips.pleace_enter_reason")}}</label>
                    <md-textarea v-model="refuse_reason"></md-textarea>
                </md-field>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showRefuse = false">{{$t("utils.cancel")}}</md-button>
                <md-button class="md-primary" @click="refuse">{{$t("utils.confirm")}}</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-dialog class="dialogWidth" :md-active.sync="showPass">
            <md-dialog-title>{{$t('utils.tip')}}</md-dialog-title>
            <div class="dialog_content">
                <!-- 是否将该用户的实名信息判定为通过？ -->
                <div>{{$t("part_second.dialog_mark_realname_pass")}}</div>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showPass = false">{{$t("utils.cancel")}}</md-button>
                <md-button class="md-primary" @click="pass">{{$t("utils.confirm")}}</md-button>
            </md-dialog-actions>
        </md-dialog>

        <div class="page">
            <!-- 实名信息详情审核 -->
            <div class="title">{{$t('part_second.realname_details_review')}}</div>
            <div class="wrap">
                <div class="part">
                    <div class="block">
                        <!-- 注册时间 -->
                        <div class="key">{{$t("user.registration_date")}}：</div>
                        <div class="value">{{registerTime}}</div>
                    </div>
                    <div class="block">
                        <!-- 国籍 -->
                        <div class="key">{{$t("system.country1")}}：</div>
                        <div class="value">{{country}}</div>
                    </div>
                    <div class="block">
                        <!-- 姓 -->
                        <div class="key">{{$t("user.second_name")}}：</div>
                        <div class="value">{{user_data.surname}}</div>
                    </div>
                    <div class="block">
                        <!-- 名 -->
                        <div class="key">{{$t("user.first_name")}}：</div>
                        <div class="value">{{user_data.name}}</div>
                    </div>
                    <div class="block">
                        <!-- 性别 -->
                        <div class="key">{{$t("user.sex")}}：</div>
                        <div class="value">{{user_data.sex && user_data.sex.message}}</div>
                    </div>
                    <div class="block">
                        <!-- 证件类型 -->
                        <div class="key">{{$t("user.cardType")}}：</div>
                        <div class="value">{{user_data.cardType && user_data.cardType.message}}</div>
                    </div>
                    <div class="block">
                        <!-- 证件号 -->
                        <div class="key">{{$t("user.cardNum")}}：</div>
                        <div class="value">{{user_data.cardNum}}</div>
                    </div>
                    <div class="block">
                        <!-- 出生日期 -->
                        <div class="key">{{$t("part_second.born_data")}}：</div>
                        <div class="value">{{birthday}}</div>
                    </div>
                    <div class="block">
                        <!-- 证件有效期 -->
                        <div class="key">*{{$t("part_second.certificate_validity_period")}}：</div>
                        <div class="value">
                            <DatePicker
                                v-model="expirationTime"
                                type="date"
                                placeholder
                                style="width: 200px"
                            ></DatePicker>
                        </div>
                    </div>
                </div>
                <div class="part part_photo">
                    <div class="block">
                        <!-- 证件照正面 -->
                        <div class="key">{{$t("part_second.document_photo")}}：</div>
                        <div class="value">
                            <PrevImg :src="user_data.idCardFrontUrl"/>
                        </div>
                    </div>
                    <!-- 护照没反面 -->
                    <div v-show="user_data.cardType && user_data.cardType.code != 13 && !!user_data.idCardBackUrl" class="block">
                        <!-- 证件照反面 -->
                        <div class="key">{{$t("part_second.document_photo_back")}}：</div>
                        <div class="value">
                            <PrevImg :src="user_data.idCardBackUrl"/>
                        </div>
                    </div>
                    <div  v-show="!!user_data.cardHandUrl" class="block">
                        <!-- 手持证件照 -->
                        <div class="key">{{$t("part_second.hand_held_certificate")}}：</div>
                        <div class="value">
                            <PrevImg :src="user_data.cardHandUrl"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons_wrap">
                <Button @click="pass_before"  type="primary">{{$t('operation.pass')}}</Button>
                <Button
                    @click="refuse_before"

                    type="primary"
                >{{$t('operation.refuse')}}</Button>
            </div>
        </div>
    </div>
</template>

<script>
import { api_func } from '@/api'
import PrevImg from '@/components/PrevImg/';
const { mapState } = Vuex;
export default {
    name: 'real-name-audit-detail',
    created() {
        this.fetchDetail()
    },
    computed: {
        ...mapState({
            rolePart: state => state.rolePart.rolePart
        }),
        registerTime() {
            if (this.user_data.registerTime) {
                return this.moment(this.user_data.registerTime).format('DD/MM//YYYY HH:mm:ss')
            }
        },
        birthday() {
            if (this.user_data.birthday) {
                return this.moment(this.user_data.birthday).format('DD/MM//YYYY')
            }
        },
        country() {
            if (this.user_data.country) {
                return this.Util.country_show(this.user_data.country)
            }
        }
    },
    methods: {
        back() {
            this.$router.back()
            let name = this.$route.name
                    },
        async fetchDetail() {
            let data = this.$route.query;
            let res = await api_func(data, 'applyDetail')
            if (res.rspCd === '00000') {
                this.user_data = res.data;
            }
        },
        pass_before() {
            if (!this.expirationTime) {
                // 请填写证件有效期
                this.$Message.warning(this.$t('part_second.period_of_the_certificate'))
                return
            }
            this.expirationTime_handle = this.moment(this.expirationTime).format('YYYY-MM-DD HH:mm:ss');
            this.showPass = true
        },
        async pass() {
            let applyNo = this.$route.query.applyNo;
            let data = {
                applyNo,
                confirmStatus: 'SUCCESS',
                expirationTime: this.expirationTime_handle
            }
            let res = await api_func(data, 'confirmRealName')
            if (res.rspCd === '00000') {
                this.$Message.success(this.$t('tips.successful_operation'))
                this.back()
            }
            this.showPass = false
        },
        refuse_before() {
            // if (!this.expirationTime) {
            //     // 请填写证件有效期
            //     this.$Message.warning(this.$t('part_second.period_of_the_certificate'))
            //     return
            // }
            // this.expirationTime_handle = this.moment(this.expirationTime).format('YYYY-MM-DD HH:mm:ss');
            // 审核不通过不需要证件有效期
            this.expirationTime_handle = ""
            this.showRefuse = true
        },
        async refuse() {
            if (!this.refuse_reason) {
                // 请输入原因
                this.$Message.warning(this.$t('tips.pleace_enter_reason'))
                return
            }
            // 校验是否超过180个字符
            // 先把汉字换成三个字母(UTF-8下是3个字符)
            if (this.refuse_reason.replace(/[^\u0000-\u00ff]/g, "aaa").length > 180) {
                // 请输入原因
                this.$Message.warning(this.$t('tips.length_limit', { limit: 180 }))
                return
            }
            let applyNo = this.$route.query.applyNo;
            let data = {
                applyNo,
                confirmStatus: 'FAILURE',
                expirationTime: this.expirationTime_handle,
                failReason: this.refuse_reason
            }
            let res = await api_func(data, 'confirmRealName')
            if (res.rspCd === '00000') {
                this.$Message.success(this.$t('tips.successful_operation'))
                this.refuse_reason = null
                this.back()
            }
            this.showRefuse = false
        },
    },
    data() {
        return {
            options_time: {
                disabledDate(date) {
                    // return date && date.valueOf() < Date.now() - 86400000 || (date.valueOf() > Date.now() + 86400000)
                    return date.valueOf() < Date.now() - 86400000
                }
            },

            showRefuse: false,
            showPass: false,
            refuse_reason: null,
            expirationTime: null,
            expirationTime_handle: null,

            loading: false,
            page: {
                total: 0,
                pageSize: 10,
                current: 1
            },

            user_data: {},
        }
    },
    components: { PrevImg }
}
</script>

<style lang="stylus" scoped>
.real-name-audit-detail
    min-width 1200px
    .show
        display flex
    .wrap
        display flex
    .part
        width 600px
    .block
        align-items center
        padding 5px 0
        display flex
    .title
        margin-bottom 30px
    .part_photo .key
        width 200px
        text-align right
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
