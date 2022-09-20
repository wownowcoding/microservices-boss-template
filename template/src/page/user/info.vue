<!--
 * @Description:
 * @Author: Rico.刘一飞
 * @Date: 2019-10-30 14:46:33
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-11-05 17:52:24
 -->
<style lang="stylus" scoped>
    .page_table
        margin-top 15px
</style>
<template>
    <div class="user-info">
        <md-dialog class="dialogWidth" :md-active.sync="showIsFake">
            <md-dialog-title>{{$t('utils.tip')}}</md-dialog-title>
            <div class="dialog_content">
                <!-- 是否标记该用户的实名信息为虚假信息？ -->
                <div>{{$t("user.dialog_mark_fake")}}</div>
                <div>{{$t("utils.remarks")}}：</div>
                <md-field>
                    <!-- 请输入原因 -->
                    <label>{{$t("tips.pleace_enter_reason")}}</label>
                    <md-input v-model="remark_desc"></md-input>
                </md-field>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showIsFake = false">{{$t("utils.cancel")}}</md-button>
                <md-button class="md-primary" @click="markFake">{{$t("utils.confirm")}}</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-dialog class="dialogWidth" :md-active.sync="showIsFakeCancel">
            <md-dialog-title>{{$t('utils.tip')}}</md-dialog-title>
            <div class="dialog_content">
                <!-- 是否取消标记该用户的实名信息为虚假信息？ -->
                <div>{{$t("user.dialog_mark_fake_cancel")}}</div>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showIsFakeCancel = false">{{$t("utils.cancel")}}</md-button>
                <md-button class="md-primary" @click="markFake_cancel">{{$t("utils.confirm")}}</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-dialog class="dialogWidth" :md-active.sync="showReset">
            <md-dialog-title>{{$t('utils.tip')}}</md-dialog-title>
            <div class="dialog_content">
                <!-- 是否重置该用户支付密码？ -->
                <div>{{$t("user.dialog_restart_password")}}</div>
                <div>{{$t("utils.remarks")}}：</div>
                <md-field>
                    <!-- 请输入原因 -->
                    <label>{{$t("tips.pleace_enter_reason")}}</label>
                    <md-input v-model="reset_desc"></md-input>
                </md-field>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showReset = false">{{$t("utils.cancel")}}</md-button>
                <md-button class="md-primary" @click="reset">{{$t("utils.confirm")}}</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-dialog class="dialogWidth" :md-active.sync="showBlackList">
            <md-dialog-title>{{$t('utils.tip')}}</md-dialog-title>
            <div class="dialog_content">
                <!-- 是否将该用户的纳入黑名单？ -->
                <div>{{$t("user.dialog_join_backlist")}}</div>
                <div>{{$t("utils.remarks")}}：</div>
                <md-field>
                    <!-- 请输入原因 -->
                    <label>{{$t("tips.pleace_enter_reason")}}</label>
                    <md-input v-model="black_desc"></md-input>
                </md-field>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showBlackList = false">{{$t("utils.cancel")}}</md-button>
                <md-button class="md-primary" @click="inBlack">{{$t("utils.confirm")}}</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-dialog class="dialogWidth" :md-active.sync="showBlackListCancel">
            <md-dialog-title>{{$t('utils.tip')}}</md-dialog-title>
            <div class="dialog_content">
                <!-- 是否将该用户移出黑名单？ -->
                <div>{{$t("user.dialog_remove_backlist")}}</div>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showBlackListCancel = false">{{$t("utils.cancel")}}</md-button>
                <md-button class="md-primary" @click="outBlack">{{$t("utils.confirm")}}</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-dialog class="dialogWidth" :md-active.sync="showFreeze">
            <md-dialog-title>{{$t('utils.tip')}}</md-dialog-title>
            <div class="dialog_content">
                <!-- 是否冻结该用户的美元和瑞尔帐户？ -->
                <div>{{$t("user.dialog_freeze")}}</div>
                <div>{{$t("utils.remarks")}}：</div>
                <md-field>
                    <!-- 请输入原因 -->
                    <label>{{$t("tips.pleace_enter_reason")}}</label>
                    <md-input v-model="freeze_desc"></md-input>
                </md-field>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showFreeze = false">{{$t("utils.cancel")}}</md-button>
                <md-button class="md-primary" @click="freeze">{{$t("utils.confirm")}}</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-dialog class="dialogWidth" :md-active.sync="showFreezeCancel">
            <md-dialog-title>{{$t('utils.tip')}}</md-dialog-title>
            <div class="dialog_content">
                <!-- 是否将该用户解冻？ -->
                <div>{{$t("user.resume_account")}}</div>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showFreezeCancel = false">{{$t("utils.cancel")}}</md-button>
                <md-button class="md-primary" @click="freezeCancel">{{$t("utils.confirm")}}</md-button>
            </md-dialog-actions>
        </md-dialog>

        <div class="page">
            <div class="title">{{$t("utils.query")}}</div>
            <div class="form_main">
                <div class="iview-form">
                    <div class="input-block">
                        <div class="input-title">{{$t("user.registration_date")}}</div>
                        <DatePicker :options="options_time" v-model="time" type="datetimerange"
                                    :start-date="new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDay())"
                                    format="yyyy-MM-dd HH:mm:ss" split-panels style="width: 290px"></DatePicker>
                    </div>
                    <div class="input-block">
                        <div class="input-title">{{$t("user.name")}}</div>
                        <VInput clearable v-model="params.name" style="width: 200px"></VInput>
                    </div>
                    <div class="input-block">
                        <div class="input-title">{{$t("user.customer_account")}}</div>
                        <!-- 用户账号 -->
                        <VInput clearable v-model="params.phoneNo" style="width: 200px"></VInput>
                    </div>


                    <div class="input-block">
                        <div class="input-title">{{$t("user.customer_state")}}</div>
                        <!-- 账户状态 -->
                        <Select clearable placeholder="" v-model="params.status" style="width:200px"
                                :placeholder="$t('utils.all')">
                            <!-- 正常 -->
                            <Option :value="11">{{$t("user.normal")}}</Option>
                            <!-- 黑名单 -->
                            <Option :value="12">{{$t("user.blacklist")}}</Option>
                            <!-- 冻结 -->
                            <Option :value="10">{{$t("user.freeze")}}</Option>
                        </Select>
                    </div>
                    <div class="input-block">
                        <!-- 用户活跃类型 -->
                        <div class="input-title">{{$t("user.customer_level")}}</div>
                        <Select clearable v-model="params.activeType" style="width:200px"
                                :placeholder="$t('utils.all')">
                            <!-- <Option v-for="item in Local.user_rank" :value="item.code" :key="item.code">{{ item.name }}</Option> -->
                            <!-- 优质 -->
                            <Option :value="14">{{$t("user.highquality")}}</Option>
                            <!-- 活跃 -->
                            <Option :value="15">{{$t("user.active")}}</Option>
                            <!-- 沉默 -->
                            <Option :value="16">{{$t("user.slient")}}</Option>
                            <!-- 流失 -->
                            <Option :value="17">{{$t("user.lost")}}</Option>
                        </Select>
                    </div>

                    <div class="input-block">
                        <div class="input-title">{{$t("v1.certificatesNumber")}}</div>
                        <!-- 证件号 -->
                        <VInput v-model="params.cardNum" style="width: 200px"></VInput>
                    </div>

                    <div class="input-block">
                        <div class="input-title">{{$t("part_second.account_grade")}}</div>
                        <!-- 账户等级 -->
                        <Select clearable placeholder="" v-model="params.accountLevel" style="width:200px"
                                :placeholder="$t('utils.all')">
                            <Option v-for="(item,index) in accountLevel" :key="index" :value="item.code">
                                {{item.message}}
                            </Option>
                        </Select>
                    </div>
                </div>
                <div class="buttons_wrap">
                    <!-- 查询 -->
                    <Button v-show="rolePart.user_info_query" type="primary" @click="fetchData">{{$t("btn.query")}}
                    </Button>
                </div>
            </div>
            <div class="page_table">
                <Table :height="600" border :loading="loading" :columns="columns" :data="formData"></Table>
                <div class="page-divited">
                    <Page @on-change="pageChange" :current="page.current" :page-size="page.pageSize" :total="page.total"
                        show-total show-elevator></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api_func } from '@/api'
import VInput from '@/components/VInput'
const { mapState } = Vuex;

export default {
    name: 'user-info',
    components: { VInput },
    created() {
        this.fetchData()
    },
    computed: {
        ...mapState({
            rolePart: state => state.rolePart.rolePart,
            userKey: state => state.app.enumByKeys.usercenter,
        }),
        accountLevel() {
            if (this.userKey) {
                return this.userKey.accountLevel
            } else {
                return []
            }
        }
    },
    methods: {
        pageChange(page) {
            this.fetchData({ page });
        },
        // 重置支付密码
        async reset() {
            let reset_desc = this.reset_desc;
            if (!reset_desc) {
                // 请输入原因
                this.$Message.warning(this.$t('tips.pleace_enter_reason'))
                return
            }
            let params = {
                // 操作备注信息 ,
                remark: reset_desc,
                // 被处理用户Id
                accountNo: this.user_data.accountNo,
                loginName: this.user_data.phoneNo,
                userNo: this.user_data.userNo
            }
            let res = await api_func(params, 'user_reset')
            if (res.rspCd === '00000') {
                // 操作成功~
                this.$Message.success(this.$t('tips.successful_operation'));
                this.reset_desc = '';
                this.showReset = false;
                this.fetchData()
            }
        },
        // 标记虚假实名信息
        async markFake() {
            let remark_desc = this.remark_desc;
            if (!remark_desc) {
                // 请输入原因
                this.$Message.warning(this.$t('tips.pleace_enter_reason'))
                return
            }
            let params = {
                remark: remark_desc,
                userNo: this.user_data.userNo
            }
            let res = await api_func(params, 'user_cert')
            if (res.rspCd === '00000') {
                // 操作成功~
                this.$Message.success(this.$t('tips.successful_operation'));
                this.remark_desc = '';
                this.showIsFake = false;
                this.fetchData()
            }
        },
        // 取消标记虚假实名信息
        async markFake_cancel() {
            let params = {
                userNo: this.user_data.userNo
            }
            let res = await api_func(params, 'user_uncert')
            if (res.rspCd === '00000') {
                // 操作成功~
                this.$Message.success(this.$t('tips.successful_operation'));
                this.fetchData()
            }
            this.showIsFakeCancel = false;
        },
        async fetchData(pageParam = {}) {
            let time = this.time;
            if (time) {
                this.params.beginTime = time[0] && this.moment(time[0]).format('YYYY-MM-DD HH:mm:ss');
                this.params.endTime = time[1] && this.moment(time[1]).format('YYYY-MM-DD HH:mm:ss');
            }

            let data = this.Util.screenOut(this.params);
            data.pageSize = this.page.pageSize;
            data.pageNo = pageParam.page || 1;
            this.loading = true
            let res = await api_func(data, 'user_list')
            if (res.rspCd === "00000") {
                let { total, list } = res.data;

                this.page = {
                    total,
                    current: data.pageNo,
                    pageSize: 10
                }
                this.formData = list;
            }
            this.loading = false
        },

        // 拉进黑名单
        async inBlack() {
            let black_desc = this.black_desc;
            if (!black_desc) {
                // 请输入原因
                this.$Message.warning(this.$t('tips.pleace_enter_reason'))
                return
            }
            let params = {
                // 操作备注信息 ,
                remark: black_desc,
                // 被处理用户Id
                userNo: this.user_data.userNo
            }
            let res = await api_func(params, 'user_blacklist')
            if (res.rspCd === '00000') {
                // 操作成功
                this.$Message.success(this.$t('tips.successful_operation'));
                this.black_desc = '';
                this.showBlackList = false;
                this.fetchData()
            }
        },

        // 移出黑名单
        async outBlack() {
            let params = {
                userNo: this.user_data.userNo
            }
            let res = await api_func(params, 'user_remove_blacklist')
            if (res.rspCd === '00000') {
                // 操作成功
                this.$Message.success(this.$t('tips.successful_operation'));
                this.showBlackListCancel = false;
                this.fetchData()
            }
        },

        // 冻结
        async freeze() {
            let freeze_desc = this.freeze_desc;
            if (!freeze_desc) {
                // 请输入原因
                this.$Message.warning(this.$t("tips.pleace_enter_reason"))
                return
            }
            let params = {
                // 操作备注信息 ,
                remark: freeze_desc,
                userNo: this.user_data.userNo
            }
            let res = await api_func(params, 'user_freeze')
            if (res.rspCd === '00000') {
                // 操作成功
                this.$Message.success(this.$t('tips.successful_operation'));
                this.freeze_desc = '';
                this.showFreeze = false;
                this.fetchData()
            }
        },

        // 解冻
        async freezeCancel() {
            let params = {
                userNo: this.user_data.userNo
            }
            let res = await api_func(params, 'user_unfreeze')
            if (res.rspCd === '00000') {
                // 操作成功
                this.$Message.success(this.$t('tips.successful_operation'));
                this.showFreezeCancel = false;
                this.fetchData()
            }
        },
    },
    data() {
        return {
            options_time: {
                disabledDate(date) {
                    return date.valueOf() > Date.now()
                }
            },

            remark_desc: '',
            reset_desc: '',
            black_desc: '',
            freeze_desc: '',
            // 正在处理的记录
            user_data: {},

            showIsFake: false,
            showIsFakeCancel: false,
            showBlackList: false,
            showBlackListCancel: false,
            showFreeze: false,
            showFreezeCancel: false,
            showReset: false,

            time: null,
            loading: false,
            page: {
                total: 0,
                pageSize: 10,
                current: 1
            },
            params: {
                phoneNo: '',
                activeType: '',
                beginTime: '',
                cert: '',
                endTime: '',
                status: '',
                name: '',
                accountLevel: null,
                cardNum: ''
            },
            columns: [
                {
                    // '姓名'
                    title: this.$t("user.name"),
                    width: 150,
                    render: (h, params) => {
                        if (params.row.surname && params.row.name) {
                            let show = params.row.surname + ' ' + params.row.name
                            return h('div', show)
                        }
                    }
                },
                {
                    // 用户账号
                    title: this.$t("user.customer_account"),
                    width: 150,
                    key: 'phoneNo',
                },
                {
                    // 证件号
                    title: this.$t("v1.certificatesNumber"),
                    width: 150,
                    key: 'cardNum',
                },
                {
                    // 用户编号
                    title: this.$t("user.user_no"),
                    width: 200,
                    key: 'userNo',
                },
                {
                    // 性别
                    title: this.$t("user.sex"),
                    width: 150,
                    render: (h, params) => {
                        let show = params.row.sex && params.row.sex.message || ''
                        return h('div', show)
                    }
                },
                {
                    // 用户活跃类型
                    title: this.$t("user.customer_level"),
                    key: 'activeType',
                    width: 150,
                    render: (h, params) => {
                        let show = params.row.activeType && params.row.activeType.message || ''
                        return h('div', show)
                    }
                },

                {
                    // 注册时间
                    title: this.$t("user.registration_date"),
                    key: 'registerDatetime',
                    width: 200,
                },
                {
                    // 用户状态
                    title: this.$t("user.customer_state"),
                    key: 'status',
                    width: 150,
                    render: (h, params) => {
                        let show = params.row.status && params.row.status.message || ''
                        return h('div', show)
                    }
                },

                {
                    // 账号等级
                    title: this.$t("part_second.account_grade"),
                    key: 'accountLevelEnum',
                    width: 150,
                    render: (h, params) => {
                        let show = params.row.accountLevelEnum && params.row.accountLevelEnum.message || ''
                        return h('div', show)
                    }
                },

                // {
                //     // 是否实名
                //     title: this.$t("user.real_name"),
                //     width: 180,
                //     render: (h,params)=> {
                //         // 12表示没有实名认证 13表示已经实名认证 ,
                //         let show = params.row.cert && params.row.cert.message  || ''
                //         return h('div',show)
                //     }
                // },
                {
                    // 查看
                    title: this.$t("operation.look_up"),
                    width: 250,
                    fixed: 'right',
                    render: (h, params) => {
                        let { userNo, name, phoneNo, status, activeType } = params.row;

                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    display: this.rolePart.user_info_detail ? '' : 'none'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push(`/user/user-query/detail?userNo=${userNo}`)
                                    }
                                }
                                // 用户详情
                            }, this.$t('user.user_detail')),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft: '8px',
                                    display: this.rolePart.user_info_querySerial ? '' : 'none'
                                },
                                on: {
                                    click: () => {
                                        let status_message = status.message
                                        let activeType_message = activeType.message
                                        this.$router.push(`/user/user-serials?name=${name}&phoneNo=${phoneNo}&status=${status_message}&activeType=${activeType_message}&userNo=${userNo}`)
                                    }
                                }
                                // 用户流水记录
                            }, this.$t('user.user_serial')),
                        ])
                    },
                },
                {
                    // 操作
                    title: this.$t("utils.operate"),
                    width: 320,
                    fixed: 'right',
                    render: (h, params) => {
                        let { certMark, status } = params.row;
                        // certMark : 标记虚假实名信息： 10表示真实实名信息 11虚假实名信息
                        // status (string, optional): 用户状态: 10表示账户冻结 11表示正常 12表示黑名单

                        return h('div', {
                            style: {
                                padding: '10px'
                            },
                        }, [
                            h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '15px',
                                        marginBottom: '8px',
                                        // 未实名不能标记虚假实名
                                        display: params.row.cert.code === 12 || !this.rolePart.user_info_updateFakeName ? 'none' : ''
                                    },
                                    on: {
                                        click: () => {
                                            this.user_data = params.row
                                            // 标记
                                            if (certMark.code === 10) {
                                                this.showIsFake = true
                                            }
                                            // 取消标记
                                            else {
                                                this.showIsFakeCancel = true
                                            }
                                        }
                                    }
                                    // 标记虚假实名信息  取消标记虚假实名信息
                                }, certMark.code === 10 ? this.$t('user.mark_false') : this.$t('user.cancel_mark_false')),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginBottom: '8px',
                                        // 未实名不能重置支付密码
                                        display: params.row.cert.code === 12 && this.rolePart.user_info_resetPayPwd ? 'none' : ''
                                    },
                                    on: {
                                        click: () => {
                                            this.user_data = params.row
                                            this.showReset = true
                                        }
                                    }
                                    // 重置支付密码
                                }, this.$t('user.restart_pay_pass')),
                            ]),
                            h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '8px',
                                        display: this.rolePart.user_info_updateBlacklist ? '' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.user_data = params.row
                                            // 取消黑名单
                                            if (status.code === 12) {
                                                this.showBlackListCancel = true
                                            }
                                            // 加入黑名单
                                            else {
                                                this.showBlackList = true
                                            }
                                        }
                                    }
                                    // 取消黑名单 加入黑名单
                                }, status.code === 12 ? this.$t('user.remove_blacklist') : this.$t('user.join_blacklist')),

                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        // 黑名单不显示冻结
                                        display: params.row.status.code === 12 || !this.rolePart.user_info_updateFreeze ? 'none' : ''
                                    },
                                    on: {
                                        click: () => {
                                            this.user_data = params.row
                                            // 解冻账户
                                            if (status.code === 10) {
                                                this.showFreezeCancel = true;
                                            }
                                            // 冻结账户
                                            else {
                                                this.showFreeze = true;
                                            }
                                        }
                                    }
                                    // 解冻账号 冻结账号
                                }, status.code === 10 ? this.$t('user.resume_account') : this.$t('user.freeze_account')),
                            ])


                        ])
                    },
                }
            ],
            formData: []
        }
    }
};
</script>



