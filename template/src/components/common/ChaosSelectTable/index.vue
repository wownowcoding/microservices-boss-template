<!--
 * @Description: 涉及到如【创建活动第二步】【新建优惠券第二步】【发放优惠券第二步】等选择删除搜索商户等一系列操作的表单项组件
 * @Author: Rico.刘一飞
 * @Date: 2019-06-03 15:13:19
 * @LastEditors  : Rico.刘一飞
 * @LastEditTime : 2020-01-06 17:19:01
 -->

<template>
    <div class="chaosSelectTable">
        <!-- 数据展示 -->
        <div class="chaosSelectTable_wrap">
            <div class="chaosSelectTable_wrap--header">
                <div class="chaosSelectTable_wrap--title">
                    <slot name="title"></slot>
                </div>
                <Button
                    type="primary"
                    icon="md-add"
                    size="small"
                    v-if="!disabled"
                    @click="handleAddModal"
                >{{$t('utils.add')}}</Button>
            </div>
            <div class="chaosSelectTable_wrap--checkdeData">
                <staticTable :cols="cols" :totalData="checkedData" :pageSizeOpts="[10,50,100]"
                    :height="tableHeight"></staticTable>
            </div>
        </div>
        <!-- 数据操作 -->
        <!-- 选择商户 -->
        <Modal v-model="showModal" :title="$t('utils.selection')" @on-ok="handleSelect" :width="popupWidth">
            <div class="chaosSelectTable_modal">
                <div class="chaosSelectTable_modal--form">
                    <div>
                        <Button v-if="selectAll" type="primary" @click="handleSelectAll(true)">{{$t('utils.select_all')}}</Button>
                        <Button
                            v-if="selectAll"
                            @click="handleSelectAll(false)"
                            style="margin-left: 8px"
                        >{{$t('marketing.cancle_select_all_mer')}}</Button>
                    </div>
                    <Input
                        v-model.trim="queryParam"
                        :placeholder="$t('btn.search')"
                        style="width: 300px"
                    >
                        <Button slot="append" @click="handleFilterDataSource" icon="ios-search-outline"></Button>
                    </Input>
                </div>
                <Table
                    border
                    ref="selection"
                    :columns="columnsOperationSelect.concat(columnsSelect)"
                    :data="tableData"
                ></Table>
                <Page
                    class="chaosSelectTable_modal--page"
                    :total="filteredData.length"
                    size="small"
                    show-sizer
                    show-total
                    :page-size="page.pageSize"
                    :current="page.pageNum"
                    :page-size-opts="pageSizeOpts"
                    @on-change="handlePage"
                    @on-page-size-change="handlePageSize"
                ></Page>
            </div>
        </Modal>
    </div>
</template>
<script>
import staticTable from '@/components/StaticTable';
import { cloneDeep } from 'lodash';

export default {
    name: 'chaosSelectTable',
    props: {
        popupWidth: {
          required: false,
          type: Number,
          defaultValue: 780
        },
        columns: {
            required: true,
            type: Array
        }, // 展示数据列表column配置项
        columnsSelect: {
            type: Array,
            required: true,
            default: () => []
        }, // 完整数据列表配置项
        dataSource: {
            type: Array,
            default: () => []
        }, // 完整的数据源
        dele: {
            type: Boolean,
            default: true
        }, // 配置参数，选中的数据列表列表是否有删除操作
        selectAll: {
            type: Boolean,
            default: false
        }, // 配置参数，列表是否有全选操作
        chaosKey: {
            type: String,
            default: 'merchantNo'
        }, // 通过key去做数据匹配
        value: {
            type: Array,
            default: () => []
        },
        disabled: {
            type: Boolean,
            default: false
        }, // 是否禁用
        maxLength: {
            type: Number,
            default: 0
        }, // 最多可选择几条数据
        dataFitler:{
            type:Function,
            dafault: (item, param) => JSON.stringify(item).includes(param)
        },
        pageSizeOpts: {
          type: Array,
          default() {
            return [5];
          }
        },
        tableHeight: {
          type: [String, Number],
          default: 500
        },
        handleItemRemoved:{
          defaultValue: null,
          type: Function
        }
    },
    data() {
        // 操作项配置-删除
        const columnsOperationDele = [
            {
                title: this.$t('utils.operate'),
                align: 'center',
                minWidth: 100,
                render: (h, params) => {
                    let self = this;
                    // 单条数据的禁用删除配置
                    let { disabled } = params.row
                    return !disabled?h('div', [
                        h('Icon', {
                            props: {
                                type: 'md-close-circle',
                                size: '30',
                            },
                            style: {
                                cursor: 'pointer'
                            },
                            on: {
                                click: () => {
                                    self.handleDeleItem(params.row)
                                }
                            }
                        }, 'View'),
                    ]):'';
                }
            }
        ];  // 表格删除项

        // 操作配置项-选择
        const columnsOperationSelect = [
            {
                title: this.$t('utils.selection'),
                minWidth: 80,
                align: 'center',
                render: (h, params) => {
                    let self = this;
                    return h('div', [
                        h('Checkbox', {
                            props: {
                                value: params.row._checked,
                                disabled: params.row._disabled || false
                            },
                            on: {
                                'on-change': (value) => {
                                    self.handleSelectOne(value, params.row)
                                }
                            }
                        }, ''),
                    ]);
                }
            }
        ]; // 表格选择配置

        return {
            columnsOperationDele,
            columnsOperationSelect,
            checkedData: [], // 选中的数据
            showModal: false, // 操作数据弹窗控制
            queryParam: '', // 查询参数
            filteredData: [], // 筛选后的数据源
            page: {
                pageNum: 1,
                pageSize: 10
            }, // 页码配置
        }
    },
    model: {
        prop: 'value',
        event: 'handleSetvalue'
    },
    computed: {
        // 展示表格的columns配置
        cols() {
            return this.dele && !this.disabled?this.columns.concat(this.columnsOperationDele):this.columns
        },
        // 数据源的分页展示数据
        tableData() {
            let {pageSize=5, pageNum=1} = this.page
            return this.filteredData.slice(pageSize * pageNum - pageSize, pageSize * pageNum);
        }
    },
    watch: {
        dataSource: {
            handler(val) {
                // 使用深拷贝做数据初始化
                this.filteredData = cloneDeep(this.dataSource);
                // console.log("TCL: handler -> this.filteredData", this.filteredData)

            },
            deep: true,
            immediate: true
        },
        value: {
            handler(val) {
                // 使用深拷贝做数据初始化
                this.checkedData = cloneDeep(val);
                // console.log("TCL: handler -> this.filteredData", this.filteredData)

            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
    },
    methods: {
        // 设置model值
        handleSetvalue() {
            this.$emit('handleSetvalue', this.checkedData)
        },
        // 打开选择操作的弹窗
        handleAddModal() {
            this.showModal = true
            this.page.pageNum = 1
            this.queryParam = ''
            // 通知父组件打开弹窗
            this.$emit('handleAddModal')
        },
        // 删除列表的某一项
        handleDeleItem(item={}) {
            if (this.disabled) {
                return
            }
            const key = this.chaosKey
            if (!key) {
                throw Error('[ChaosSelectTable Error]未设置数据匹配所需的key');
            }
            let removedItem;
            for (let i = 0, len = this.checkedData.length; i < len; i++) {
                if (this.checkedData[i][key] === item[key]) {
                    removedItem = this.checkedData[i];
                    // 删除数据需要把删除的数据给到数据源以供重新选择
                    this.checkedData[i]._checked = false;
                    this.filteredData.push(this.checkedData[i]);
                    this.checkedData.splice(i, 1);
                    break
                }
            }
            if (removedItem) {
              if (this.handleItemRemoved) {
                this.handleItemRemoved(removedItem)
              } else {
                this.handleSetvalue();
              }
            }
        },
        // 确认选择的数据
        handleSelect() {
            let self = this;
            if (Object.prototype.toString.call(this.maxLength) !== '[object Number]') {
                throw Error('[ChaosSelectTable Error]请检查”maxLength“的格式');
            }
            // 还能添加多少条
            let num;
            let result = [];
            if (this.maxLength > 0) {
                num = this.maxLength - this.checkedData.length
                // 添加到选中的集合
                if(num > 0) {
                    this.filteredData.forEach((item, index) => {
                        if (item._checked && result.length < num) {
                                result.push(item)
                        } else {
                            item._checked = false
                        }
                    });
                }
                // 如果num <= 0 应该不给选 并且把选中的恢复
                else {
                    this.filteredData.forEach(item => {
                        item._checked = false
                    });
                }
            } else {
                result = this.filteredData.filter(item => {
                    return item._checked
                });
            }

            this.checkedData = this.checkedData.concat(result)
            this.handleSetvalue();
            // 数据源过滤掉已经选中的
            this.filteredData = this.filteredData.filter(item => !item._checked);
            // console.log("TCL: handleSelect -> this.filteredData", this.filteredData)

            // 新增操作提示
            this.$Notice.success({
                desc: self.$t('marketing.tips_add_success')
            })
        },
        // 数据全选/反选
        handleSelectAll(value) {
            this.filteredData.forEach(item => {
                if (!item._disabled) {
                    this.$set(item, '_checked', value)
                }
            });
        },
        // 选中某一项
        handleSelectOne(value, selection) {
            const key = this.chaosKey
            if (!key) {
                throw Error('[ChaosSelectTable Error]未设置数据匹配所需的key');
            }
            this.filteredData.forEach(item => {
                if (selection[key] === item[key]) {
                    this.$set(item, '_checked', value)
                }
            });
        },
        // 翻页
        handlePage(pageNum) {
            this.page.pageNum = pageNum
        },
        handlePageSize(pageSize) {
            this.page.pageSize = pageSize;
        },
        // 表格数据筛选
        handleFilterDataSource() {
            this.page.pageNum = 1
            const param = String(this.queryParam)
            const data = cloneDeep(this.dataSource)
            if (param === '') {
                this.filteredData = data
            }
            this.filteredData = data.filter(item => this.dataFitler(item, param))
        }
    },
    components: {
        staticTable
    }
};
</script>
<style lang="stylus" scoped>
.chaosSelectTable
    width 100%
    &_wrap
        position relative
        padding 12px 18px 6px
        width 100%
        border 1px solid #ccc
        &--header
            margin-bottom 4px
            display flex
            justify-content space-between
            align-items center
    &--checkdeData
        padding 51px 12px 11px 12px
    &_modal
        padding 13px 30px
        &--form
            display flex
            justify-content space-between
            margin-bottom 21px
        &--page
            float right
            margin-top 20px
</style>

