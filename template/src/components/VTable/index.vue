<template>
  <div>
    <Table
      ref="table"
      v-bind="$attrs"
      border
      :columns="table.cols"
      :data="table.data"
      :height="table.height || defaultTableHeight"
      :loading="table.loading"
      v-on="$listeners"
      @on-selection-change="handleSelect"
      @on-select-cancel="handleSelectCancel"
      @on-select-all-cancel="handleSelectCancelAll">
    </Table>
    <Page
      v-if="showPage"
      class="table-page"
      transfer ref="page"
      @on-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
      show-sizer show-total show-elevator
      :current="table.page.pageNum"
      :page-size="table.page.pageSize"
      :total="table.page.total"
      :page-size-opts="pageSizeOpts">
    </Page>
  </div>
</template>
<script>
// 普通table + pagination组件，不带其他定义标题啥乱七八糟的
export default {
  name: 'VTable',
  data() {
    return {
      selection: []
    }
  },
  props: {
    table: {
      type: Object,
      default: () => ({
        cols: {},
        data: [],
        loading: false,
        page: {
          total: 0,
          pageNum: 1,
          pageSize: this.pageSizeOpts[0]
        }
      })
    },
    showPage: {
      type: Boolean,
      default: () => true
    },
    pageSizeOpts: {
      type: Array,
      default: () => [5, 10, 20, 50, 100]
    }
  },
  computed: {
    defaultTableHeight() {
      if (document.documentElement.clientHeight < 700) {
        return 300;
      }
      if (document.documentElement.clientHeight < 800) {
        return 400;
      }
      if (document.documentElement.clientHeight < 900) {
        return 480;
      }
      return 600;
    }
  },
  watch: {
    table: function(val) {
      console.log(val)
    }
  },
  methods: {
    handleSelectCancel(selection, a) {
      this.$emit('on-select-cancel', a)
    },
    handleSelectCancelAll(selection) {
      this.selection.forEach(s => {
        this.handleSelectCancel(selection, s)
      })
      this.$emit('on-select-cancel-all', this.selection)
    },
    handleSelect(selection) {
      this.selection = selection
      this.$emit('handleSelect', selection)
      this.$emit('handleSearch', selection)
    },
    onPageChange(val) {
      this.$set(this.table.page, 'pageNum', val)
      this.emitPageChange()
    },
    onPageSizeChange(pageSize) {
      this.$set(this.table.page, 'pageSize', pageSize)
      this.emitPageChange()
    },
    emitPageChange() {
      this.$emit('page-change', {
        pageNum: this.table.page.pageNum,
        pageSize: this.table.page.pageSize
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.table {
  border-left: 1px solid #dee2e6;
}
</style>
