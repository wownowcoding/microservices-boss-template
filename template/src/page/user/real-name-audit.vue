<style lang="stylus" scoped>
    .page_table
        margin-top 15px
</style>
<template>
    <div class="real-name-auth">

        <div class="page">
            <div class="title">{{$t("utils.query")}}</div>
            <div class="form_main">
                <div class="iview-form">
                    <div class="input-block">
                        <div class="input-title">{{$t("user.customer_account")}}</div>
                        <!-- 用户账号 -->
                        <Input clearable v-model="params.loginName" style="width: 200px"></Input>
                    </div>
                    <div class="input-block">
                        <div class="input-title">{{$t("user.name")}}</div>
                        <Input clearable v-model="params.name" style="width: 200px"></Input>
                    </div>
                </div>
                <div class="buttons_wrap">
                    <!-- 查询 -->
                    <Button v-show="rolePart.user_audit_queryApplyingList"  type="primary" @click="fetchData">{{$t("btn.query")}}</Button>
                </div>
            </div>
            <div class="page_table">
                <Table border :loading="loading" :columns="columns" :data="formData"></Table>
                <div class="page-divited">
                    <Page  @on-change="pageChange" :current="page.current" :page-size="page.pageSize" :total="page.total" show-elevator></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api_func } from '@/api'
const { mapState } = Vuex;

export default {
    name: 'real-name-audit',
    requeryFn: 'fetchData',
    created() {
        this.fetchData()
    },
    computed: {
        ...mapState({
            rolePart: state => state.rolePart.rolePart
        })
    },
    methods: {
        pageChange(page) {
            this.fetchData({page});
        },

        async fetchData(pageParam={}) {
            let data = this.Util.screenOut(this.params);
            data.pageSize = this.page.pageSize;
            data.pageNo = pageParam.page || 1;
            this.loading = true
            let res = await api_func(data,'applyList')
            if(res.rspCd==="00000") {
                let { total, list } = res.data
                this.loading = false
                this.page = {
                    total,
                    current: data.pageNo,
                    pageSize: 10
                }
                this.formData = list || []
            }
        },
    },
    data() {
        return {
            loading: false,
            page: {
                total: 0,
                pageSize: 10,
                current: 1
            },
            params: {
                loginName: null,
                name: null
            },
            columns: [
                {
                    // '提交时间'
                    title: this.$t("part_second.submission_time"),
                    key: 'applyTime',
                    render: (h,params)=> {
                        let show = this.moment(params.row.applyTime).format('DD/MM/YYYY HH:mm:ss');
                        return h('div',show)
                    }
                },
                {
                    // 用户账号
                    title: this.$t("user.customer_account"),
                    key: 'loginName',
                },
                {
                    // 姓名
                    title: this.$t("user.name"),
                    render: (h,params)=> {
                        let show = params.row.surname + ' ' + params.row.name
                        return h('div',show)
                    }
                },
                {
                    // 性别
                    title: this.$t("user.sex"),
                    render: (h,params)=> {
                        let show = params.row.sex && params.row.sex.message || ''
                        return h('div',show)
                    }
                },
                {
                    // 国籍
                    title: this.$t("system.country1"),
                    key: 'country',
                    render: (h,params)=> {
                        if(params.row.country) {
                            let show = this.Util.country_show(params.row.country)
                            return h('div',show)
                        }

                    }
                },

                {
                    // 证件类型
                    title: this.$t("user.cardType"),
                    key: 'cardType',
                    render: (h,params)=> {
                        let show = params.row.cardType && params.row.cardType.message || ''
                        return h('div',show)
                    }
                },
                {
                    // 证件号码
                    title: this.$t("user.cardNum"),
                    key: 'cardNum',
                },
                {
                    // 操作
                    title: this.$t("utils.operate"),
                    fixed: 'right',
                    render: (h,params)=> {
                        let applyNo = params.row.applyNo
                        return this.rolePart.user_audit_queryApplyDetail ? h('Button', {
                            props: {
                                type:'primary',
                                size:'small'
                            },
                            style: {
                                marginLeft:'8px',
                                // display: this.rolePart.user_info_querySerial ? '' : 'none'
                            },
                            on:{
                                click:()=>{
                                    this.$router.push(`/user/real-name-audit/detail?applyNo=${applyNo}`)
                                }
                            }
                            // 审核
                        }, this.$t('operation.audit')): ''
                    }
                }
            ],
            formData: []
        }
    }
};
</script>



