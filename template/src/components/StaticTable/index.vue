<template>
    <div>
        <div :id="randomId" style="position: relative">
            <Table ref="table" v-bind="$attrs" v-on="$listeners" :height="height" border :columns="cols" :data="tableData" @on-selection-change="handleSelect"></Table>
            <FooterSummary v-bind="$attrs" v-if="$attrs['diy-show-summary'] && totalData.length" :cols="cols" :totalData="tableData" :randomId="randomId"></FooterSummary>
        </div>
        <Page
            v-if="showPage"
            class="table-page"
            transfer
            ref="page"
            @on-change="onPageChange"
            @on-page-size-change="onPageSizeChange"
            show-sizer
            show-total
            show-elevator
            :current="page.pageNo"
            :page-size="page.pageSize"
            :total="total || totalData.length"
            :page-size-opts="pageSizeOpts"
        ></Page>
    </div>
</template>
<script>
import FooterSummary from '@/components/FooterSummary/index.vue'
export default {
    name: 'StaticTable',
    components: {
        FooterSummary
    },
    data() {
        // const pageSizeOpts = [5, 10, 20]
        return {
            randomId: 'table' + (Math.random() + '').slice(2),
            // pageSizeOpts,
            page: {
                total: 0,
                pageSize: this.pageSizeOpts[0],
                pageNo: 1
            },
        }
    },
    props: {
        showPage: {
            type: Boolean,
            default: () => true
        },
        height: {
            default: 300
        },
        cols: {
            default: () => []
        },
        total: {
            type: Number,
            default: 0
        },
        totalData: {
            default: () => []
        },
        pageSizeOpts: {
            type: Array,
            default: () => [5, 10, 20, 50, 100]
        }
    },
    computed: {
        tableData() {
            let { pageNo, pageSize } = this.page,
                list = this.totalData,
                listSize = list.length
            // 判断数据一共多少页，若当前页少于总页数，则当前页改为最后一页
            let pageTotal = Math.ceil(listSize / pageSize || 1);
            if (pageTotal < pageNo) {
                pageNo = pageTotal
            }
            return this.showPage ? list.slice((pageNo - 1) * pageSize, Math.min(pageNo, Math.ceil(listSize / pageSize)) * pageSize) : list;
        }
    },
    methods: {
        handleSelect(selection) {
            this.$emit('handleSelect', selection)
        },
        onPageChange(val) {
            this.page.pageNo = val
            this.$emit('page-change', {
                pageNum: val,
                pageSize: this.page.pageSize
            })
        },
        onPageSizeChange(pageSize) {
            this.page.pageSize = pageSize;
            this.$emit('page-change', {
                pageNum: this.page.pageNo,
                pageSize: pageSize
            })
        }
    },
};
</script>

<style lang="stylus" scoped>
    .table
        border-left 1px solid #dee2e6
</style>
