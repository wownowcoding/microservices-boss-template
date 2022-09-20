<template>
    <div class="show-summary-table">
        <Table class="sum-table" :height="50" border :columns="columns" :data="summaryData" :show-header="false"></Table>
    </div>
</template>

<script>
    export default {
        name: 'FooterSummary',
        props: {
            randomId: {
                default: ''
            },
            cols: {
                default: () => []
            },
            totalData: {
                default: () => []
            },
            summaryMethod: {
                default: ''
            },
            sumText: {
                default: ''
            }
        },
        data () {
            return {
                summaryData: []
            }
        },
        watch: {
            totalData: {
                deep: true,
                immediate: true,
                handler: function(val) {
                    this.initData()
                }
            }
        },
        computed: {
            columns () {
                const list = this.cols.map(col => {
                    const { render = '', key = '', ...arg } = col
                    if (this.summaryData.length && key && this.summaryData[0][key] && render) {
                        return col
                    }
                    return {key, ...arg}
                })
                return list
            }
        },
        mounted () {
            this.$nextTick(() => {
                const footerDom = document.querySelector(`#${this.randomId} .sum-table .ivu-table-body`)
                const mainHeader = document.querySelector(`#${this.randomId} .ivu-table-header`)
                const mainBody = document.querySelector(`#${this.randomId} .ivu-table-body`)
                if (!footerDom) return
                if (mainBody) {
                    mainBody.style.setProperty('overflow-x', 'hidden')
                    mainBody.style.setProperty('padding-bottom', '50px')
                }
                footerDom.addEventListener('scroll', (e) => {
                    mainHeader.scrollLeft = e.target.scrollLeft
                    mainBody.scrollLeft = e.target.scrollLeft
                })
            })
        },
        beforeDestroy () {
            let mainBody = document.querySelector(`#${this.randomId} .ivu-table-body`)
            if (mainBody) {
                mainBody.style.removeProperty('overflow-x')
                mainBody.style.removeProperty('padding-bottom')
                mainBody = null
            }
        },
        methods: {
            initData () {
                const summaryMethod = (this.summaryMethod && typeof this.summaryMethod === 'function') ? this.summaryMethod : this.handleSummary
                const sumsData = summaryMethod({
                    columns: this.cols,
                    data: this.totalData
                })
                const keyList = Object.keys(sumsData)
                if (keyList.length) {
                    const sumRow = {}
                    keyList.forEach(key => {
                        sumRow[key] = sumsData[key].value || ''
                    })
                    this.summaryData = [sumRow]
                }
            },
            handleSummary ({ columns, data }) {
                const sums = {};
                columns.forEach((column, index) => {
                    const key = column.key;
                    if (index === 0) {
                        sums[key] = {
                            key,
                            value: this.sumText || this.$t('v1.total')
                        };
                        return;
                    }
                    const values = data.map(item => Number(item[key] - 0));
                    if (!values.every(value => isNaN(value))) {
                        const v = values.reduce((prev, curr) => {
                            curr = curr - 0
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[key] = {
                            key,
                            value: v
                        };
                    } else {
                        sums[key] = {
                            key,
                            value: ''
                        };
                    }
                });

                return sums;
            }
        }
    }
</script>

<style lang="stylus">
    .show-summary-table
        position absolute
        bottom 0
        left 0
        right 0
        font-weight bold
        .ivu-table
            color #f39322
        .sum-table
            .ivu-table-body
                overflow-y hidden !important
                overflow-x auto
</style>
    