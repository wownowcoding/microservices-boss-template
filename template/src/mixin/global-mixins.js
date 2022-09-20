/*
 * @Description: 全局mixins
 * @Author: 管铭钊
 * @Date: 2020/1/18
 */
// 慎用全局mixins
const globalMixin = {
    // 缓存组件激活时
    activated() {
        // 新建等路由需要刷新列表（重置查询条件）
        const tableRef = this.$refs.vipayTable
        // 详情、审核等路由需要重查列表
        const type = typeof this.$options.requeryFn
        if (tableRef) {
            tableRef.refreshList && tableRef.refreshList()
        } else if (type === 'function') {
            this.$options.requeryFn()
        } else if (type === 'string') {
            this[this.$options.requeryFn]()
        }
    },
    // 路由离开前
    // beforeRouteLeave(to, from, next) {
    // }
}

export default {
    install(Vue) {
        Vue.mixin(globalMixin)
    }
}
