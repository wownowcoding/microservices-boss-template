
<style lang="stylus" scoped>
    .user-serials
        min-width: 1200px;
        .show
            display flex

            .part
                width 600px

            .block
                padding  5px 0
                display flex
        .key
            font-size 15px

        .value
            font-size 14px
            color #818181

            img
                max-width 400px
                border 10px solid #ccc

        .list
            margin 15px

        .table
            margin-top 30px

        .page_table
            margin-top 15px

        .info
            width 100%
            display flex

            .input-block
                margin-right 120px
</style>

<template>
    <div class="user-serials">
        <div class="page">
            <!-- 查询条件 -->
            <div class="title">{{$t("utils.query")}}</div>
            <div class="form_main">
                <div class="iview-form">
                    <div class="input-block">
                        <!-- 姓名 -->
                        <div class="input-title">{{$t("user.name")}}：</div>
                        <div class="value">{{getParams.name}}</div>
                    </div>
                    <div class="input-block">
                        <!-- 用户账号 -->
                        <div class="input-title">{{$t("user.customer_account")}}:</div>
                        <div class="value">{{getParams.phoneNo}}</div>
                    </div>
                    <div class="input-block">
                        <!-- 用户状态 -->
                        <div class="input-title">{{$t("user.customer_state")}}:</div>
                        <div class="value">{{getParams.status}}</div>
                    </div>
                    <div class="input-block">
                        <!-- 用户活跃类型 -->
                        <div class="input-title">{{$t("user.customer_level")}}:</div>
                        <div class="value">{{getParams.activeType}}</div>
                    </div>
                    <div class="input-block">
                        <!-- 交易时间 -->
                        <div class="input-title">{{$t("query.trade_time")}}</div>
                        <DatePicker v-model="time" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" split-panels style="width: 290px"></DatePicker>
                    </div>
                    <div class="input-block">
                        <!-- 账户类型 -->
                        <div class="input-title">{{$t("user.settle_currency_type")}}</div>
                        <Select clearable v-model="params.currency" style="width:200px" :placeholder="$t('utils.all')">
                            <!-- 美元账户 -->
                            <Option value="USD">{{$t("user.usd_account")}}</Option>
                            <!-- 瑞尔账户 -->
                            <Option value="KHR">{{$t("user.khr_account")}}</Option>
                        </Select>
                    </div>
                    <div v-show="params.currency==='USD'" class="input-block">
                        <!-- 美元账户 -->
                        <div class="input-title">{{$t("user.usd_account")}}:</div>
                        <div class="value">{{USD}}</div>
                    </div>
                    <div v-show="params.currency==='KHR'" class="input-block">
                        <!-- 瑞尔账户 -->
                        <div class="input-title">{{$t("user.khr_account")}}:</div>
                        <div class="value">{{KHR}}</div>
                    </div>
                    <div class="input-block">
                        <!-- 收款方类型 -->
                        <div class="input-title">{{$t("query.payeeType")}}</div>
                        <Select clearable v-model="params.payeeType" style="width:200px" :placeholder="$t('utils.all')">
                            <Option v-for="item in trade.payeeType" :value="item.code" :key="item.code">{{ item.message }}</Option>
                        </Select>
                    </div>
                    <div class="input-block">
                        <!-- 交易类型 -->
                        <div class="input-title">{{$t("query.orderType")}}</div>
                        <Select clearable v-model="params.tradeType" style="width:200px" :placeholder="$t('utils.all')">
                            <Option v-for="item in trade.tradeBusiType" :value="item.code" :key="item.code">{{ item.message }}</Option>
                        </Select>
                    </div>
                </div>
                <div class="buttons_wrap">
                    <!-- 查询 -->
                    <Button type="primary" @click="fetchData" >{{$t("btn.query")}}</Button>
                </div>
            </div>
            <div class="page_table">
                <Table border :loading="loading" :columns="columns" :data="formData"></Table>
                <div class="page-divited">
                    <Page  @on-change="pageChange" :current="page.current" :page-size="page.pageSize" :total="page.total" show-elevator></Page>
                </div>
                <div class="buttons_wrap">
                    <Button @click="back"  type="primary">{{$t('btn.back')}}</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api_func } from '@/api'
const { mapState } = Vuex;

export default {
    name: 'user-serials',
    computed: {
        ...mapState({
            trade: state => state.app.enumByKeys.trade,
        }),
    },
    methods: {
        pageChange(page) {
            this.fetchData({page});
        },
        back() {
            this.$router.back()
            let name = this.$route.name
                    },
        async fetchData(pageParam={}) {
            let getParams = this.$route.query;
            this.getParams = getParams

            let { userNo } = getParams;
            let { tradeType, payeeType, currency } = this.params;
            let params = {
                tradeType,
                usrNo: userNo,
                payeeType,
                currency
            }
            let time = this.time;
            if(time) {
                params.startDate = time[0] && this.moment(time[0]).format('YYYY-MM-DD HH:mm:ss');
                params.endDate = time[1] && this.moment(time[1]).format('YYYY-MM-DD HH:mm:ss');
            }
            let data = this.Util.screenOut(params);

            data.pageSize = this.page.pageSize;
            data.pageNum = pageParam.page || 1;
            this.loading = true

            let res = await api_func(data,'user_account')
            if(res.rspCd==="00000") {
                let { total, list } = res.data;
                this.loading = false
                this.page = {
                    total: total,
                    current: data.pageNum,
                    pageSize: 10
                }
                this.formData = list || [];
            }
        }
    },
    async created() {
        let getParams = this.$route.query;
        this.fetchData()

        // 获取账户余额
        let res = await api_func({userNo: getParams.userNo},'user_balance')
        if(res.rspCd==="00000" && res.data.length>0) {
            res.data.map(item=>{
                if(item.currency==='USD') {
                    this.USD = item.balance + ' ' + item.currency
                }
                if(item.currency==='KHR') {
                    this.KHR = item.balance + ' ' + item.currency
                }
            })
        }

    },
    data () {
        return {
            USD: 0,
            KHR: 0,
            time: null,
            loading: false,
            page: {
                total: 0,
                pageSize: 10,
                current: 1
            },
            params: {
                beginTime: '',
                endTime: '',
                usrName: '',
                usrAccount: '',
                currency: '',
                payeeType: '',
                tradeType: ''
            },
            columns: [
                {
                    // 流水号
                    title: this.$t("user.serialNo"),
                    key: 'cashierJrnNo'
                },
                {
                    // 付款方
                    title: this.$t("query.payer"),
                    key: 'payerUsrName',
                    align: 'center',
                    render: (h,params)=>  h('div',Vue.filter('Placeholder')(params.row.payerUsrName))
                },
                {
                    // 收款方
                    title: this.$t("query.payee"),
                    key: 'payeeUsrName',
                    align: 'center',
                    render: (h,params)=>  h('div',Vue.filter('Placeholder')(params.row.payeeUsrName))
                },
                {
                    // 收款方类型
                    title: this.$t("query.payeeType"),
                    key: 'payeeType',
                    render: (h,params)=>  {
                        let show = params.row.payeeType.message
                        return h('div',show)
                    }
                },
                {
                    // 交易类型
                    title: this.$t("query.orderType"),
                    render: (h,params)=>  {
                        let show = params.row.tradeType && params.row.tradeType.message || ''
                        return h('div',show)
                    }
                },
                 {
                    // 备注
                    title: this.$t("utils.remarks"),
                    key: 'remark',
                },
                {
                    // 账户类型
                    title: this.$t("user.settle_currency_type"),
                    key: 'currency',
                },
                {
                    // 交易金额
                    title: this.$t("query.trade_totalAmt"),
                    key: 'totalAmt',
                    render: (h,params)=>  h('div',Vue.filter('AmtThousandsFmt')(params.row.totalAmt))
                },
                {
                    // 折扣金额
                    title: this.$t("query.discountAmt"),
                    key: 'discountAmt',
                    render: (h,params)=>  h('div',Vue.filter('AmtThousandsFmt')(params.row.discountAmt))
                },
                {
                    // 实际金额
                    title: this.$t("query.realAmt"),
                    key: 'realAmt',
                    render: (h,params)=>  h('div',Vue.filter('AmtThousandsFmt')(params.row.realAmt))
                },
                {
                    // 手续费
                    title: this.$t("query.serviceAmt"),
                    key: 'serviceAmt',
                    render: (h,params)=>  h('div',Vue.filter('AmtThousandsFmt')(params.row.serviceAmt))
                },
                {
                    // 交易时间
                    title: this.$t("query.tmFinished"),
                    key: 'tmFinished',
                }
            ],
            formData: []
        }
    },
}
</script>
