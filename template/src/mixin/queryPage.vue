<template>
    <div>
        <Card class="form-card">
            <p slot="title">{{$t("scriptv1.appquery")}}</p>
            <Form inline :model="form">
                <!-- 表单元素 -->
            </Form>
            <div class="form-btn-wrapper">
                <Button @click="_fetchData"  type="primary">{{$t("btn.query")}}</Button>
            </div>
        </Card>
        <Card class="table-card" :padding="0">
            <div class="table-card-title" slot="title">
                <div>{{$t("scriptv1.appqueryResult")}}</div>
            </div>
            <Table
                ref="table"
                :width="table.width"
                :height="table.height"
                :loading="table.loading"
                border
                :columns="table.cols"
                :data="table.data"
                @on-selection-change="onChangeSelection"
                @on-select-cancel="onCancelSelection"
            ></Table>
            <Page
                ref="page"
                size="small"
                @on-change="onPageChange"
                @on-page-size-change="onPageSizeChange"
                show-sizer show-total
                :current="page.pageNum"
                :page-size="page.pageSize"
                :total="page.total"
                show-elevator
                :page-size-opts="pageSizeOpts"
            ></Page>
        </Card>
    </div>
</template>
<script>
const { mapState } = Vuex;
export default {
    name: "queryPage",
    data() {
        const pageSizeOpts = [10, 50, 100]
        return {
            form: {},
            table: {
                data: [],
                cols: [],
                height: 600,
                width: 0,
                loading: false
            },
            page: {
                total: 0,
                pageSize: pageSizeOpts[0],
                pageNum: 1
            },
            pageSizeOpts,
            fetchApi: () => { },
            // 开启多选需要配置项:
            // { type: 'selection', width: 60, align: 'center' },
            // @on-selection-change="onChangeSelection"
            // @on-select-cancel="onCancelSelection"
            // :data="selectionTableData"
            // isSelection: true
            // selectionKey
            isSelection: false,//是否开启多行选择
            selection: [],// 已选结果
            selectionKey: '',// 唯一标识
            isAutoFetch: true,// 初次进入页面时是否自动请求数据
            // tableMinHeight: 600, // 表格的最小高度值,11条数据的高度
        };
    },
    created() {
        this.mergeRouterParamsToForm()
        if (this.isAutoFetch) {
            this._fetchData();
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getTableHeight();
        });
    },
    methods: {
        onFetchDataSuccess() { },
        onFetchDataFail() { },
        mergeRouterParamsToForm() {
            this.form = Object.assign(this.form, this.$route.query)
        },
        // 多选功能
        resetSelection() {
            this.selection = []
        },
        onCancelSelection(selection, row) {// 取消选中需清除已选id
            if (!this.isSelection) return false //没开启开关不执行逻辑
            const id = row[this.selectionKey]
            if (!!id) {
                let cancelSelectionIdx = this.selection.findIndex(_id => _id == id)
                if (cancelSelectionIdx > -1) {
                    this.selection.splice(cancelSelectionIdx, 1)
                }
            } else {
                console.log('no selectionKey')
            }
        },
        onChangeSelection(selection) {// 遍历并且塞入新选择的项
            if (!this.isSelection) return false //没开启开关不执行逻辑
            let newSelection = selection.map(item => item[this.selectionKey])
            newSelection.forEach(id => {
                if (!(this.selection.findIndex(_id => _id == id) > -1)) {
                    this.selection.push(id)
                }
            })
        },
        /**
         * @description 自动更新表格高度
         */
        getTableHeight() {
            // if (!this || !this.$el || !this.$el.hasChildNodes() || !this.$el.parentNode) return
            // // 计算当前表格顶部离屏幕底部的距离,计算规则: 视图的视图高度 - 表格的据顶高度 - 底部边框高度 - 底部padding高度 - 分页组件的高度
            // // TODO 权限会在计算高度后才更新,导致渲染按钮让表格下顶,出现多重滚动条
            // let pageBottomDistance = this.$el.parentNode.offsetHeight - this.$refs.table.$el.offsetTop - 1 - 15 - this.$refs.page.$el.offsetHeight;
            // // 取表格最小高度和计算高度的最大值,避免小屏幕仲向高度引起表格高度过低问题
            // this.table.height = Math.max(this.tableMinHeight, pageBottomDistance)
        },
        fetchData() {// 外部调用的更新数据,默认页面要回归到第一页
            this.page.pageNum = 1;
            if (this.isSelection) this.resetSelection()
            this._fetchData();
        },
        async _fetchData() {
            this.table.loading = true;
            let res = await this.fetchApi(this.getFormatParams());
            this.$nextTick(() => {
                this.table.loading = false;
            });
            if (res.rspCd === "00000") {
                let { total, pageSize, list } = res.data;
                this.page.total = total;
                this.table.data = list;
                this.onFetchDataSuccess(res)
            } else {
                this.onFetchDataFail(res)
            }
        },
        getFormatParams() {
            return Object.assign({}, this.form, {
                pageSize: this.page.pageSize,
                pageNum: this.page.pageNum || 1
            });
        },
        onPageChange(pageNum) {
            this.page.pageNum = pageNum;
            this._fetchData();
        },
        onPageSizeChange(pageSize) {
            this.page.pageSize = pageSize;
            this._fetchData();
        }
    },
    computed: {
        ...mapState({
            rolePart: state => state.rolePart.rolePart,
            winHeight: state => state.app.winHeight,
        }),
        tableData() {// 把数据转换成回选的数据结构
            if (!this.isSelection) {
                return this.table.data
            } else {
                let list = this.table.data.map(item => {
                    let flag = false
                    flag = this.selection.findIndex(_id => _id == item[this.selectionKey]) > -1
                    return Object.assign(item, { _checked: flag })
                })
                return list
            }
        },
    },
    watch: {
        winHeight() {
            this.getTableHeight();
        },
    }
};
</script>
