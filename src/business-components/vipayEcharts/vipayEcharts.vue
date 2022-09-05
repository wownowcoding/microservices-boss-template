<template>
  <div class="vipayTable">
    <!-- 搜索条件输入表单 -->
    <VCard
      class="form-card vipay-table-form-card"
      v-if="queryList.length && queryList.length > 0"
      v-model="expandValue"
    >
      <p slot="title" class="user-select">{{queryTitle || $t('utils.query')}}</p>
      <slot name="tips" />
      <Form
        inline
        :model="form"
        :label-width="labelWidth"
        label-position="right"
        @submit.native.prevent
        @keyup.native.enter.stop="handleSearchForm"
      >
        <slot name="after-form" />
        <FormItem
          v-for="(item, index) in queryList"
          :key="index"
          :style="item.formStyle || ''"
          v-bind="item.attrs"
          :class="'v-form-type-item v-form-type-' + item.type"
          :label-width="getlabelWidth(item)"
        >
          <span slot="label" style="text-transform: capitalize;" v-if="item.label">{{item.label}}</span>
          <template v-if="item.type === 'button-list'">
            <Buttons
              :item="item"
              :multiple="!!item.multiple"
              :options="getItemOptions(item.options)"
              v-model="form[item.key]"
              @button-change="(value) => {$emit('filter-button-change', value)}"
            />
          </template>
          <template v-if="item.type === 'text'">
            <Input
              v-model.trim="form[item.key]"
              :value="item.value"
              :maxlength="item.maxlength"
              :class="itemClassName( item )"
              :disabled="item.disabled"
              :placeholder="item.placeholder || ''"
              clearable
            />
          </template>
          <template v-if="item.type === 'textSelect'">
            <Input v-model="form[item.key]" :class="itemClassName( item )">
              <Select v-model="form[item.selectKey]" slot="prepend" :style="item.selectStyle">
                <Option
                  style="text-transform: capitalize;"
                  v-for="opt in getItemOptions(item.options)"
                  :label="opt.message"
                  :value="opt.code"
                  :key="opt.code"
                ></Option>
              </Select>
            </Input>
          </template>
          <template v-if="item.type === 'select'">
            <Select
              :clearable="!item.clearable"
              :filterable="item.filterable"
              v-model="form[item.key]"
              :class="itemClassName( item )"
              v-bind="item.props"
              v-on="item.events"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              @on-change="(value) =>{$emit('handleSelectChange',value)}"
            >
              <Option
                v-for="opt in getItemOptions(item.options)"
                style="text-transform: capitalize;"
                :label="opt.message"
                :value="opt.code+''"
                :key="opt.code+''"
              ></Option>
            </Select>
          </template>
          <template v-if="item.type === 'cascader'">
            <Cascader
              :data="getItemOptions(item.options)"
              v-model="form[item.key]"
              change-on-select
              :load-data="(value,callback)=>$emit('loadData',{item:value,callback})"
              filterable
              transfer
            ></Cascader>
          </template>
          <template v-if="item.type === 'date'">
            <DatePicker
              ref="datePicker"
              clearable
              split-panels
              :options="dateOption"
              @on-change="(value)=>{handleSetValue(value, item.key)}"
              type="date"
              :placeholder="$t('utils.select_date')"
              :format="item.format || 'yyyy-MM-dd'"
              :class="itemClassName( item )"
              v-model="form[item.key]"
            ></DatePicker>
          </template>
          <template v-if="item.type === 'dateRange'">
            <DatePicker
              ref="datePicker"
              clearable
              :split-panels="!item.splitPanels"
              v-model="form[item.key]"
              @on-change="onDatePickerChange($event,item)"
              type="daterange"
              :placeholder="$t('utils.select_date')"
              :format="item.format || 'yyyy-MM-dd'"
              :class="itemClassName( item )"
              :options="itemDatePickerOptions(item)"
            ></DatePicker>
          </template>
          <template v-if="item.type === 'month'">
            <DatePicker
              ref="datePicker"
              clearable
              @on-change="(value)=>{handleSetMonth(value, item)}"
              type="month"
              :placeholder="$t('utils.select_month')"
              :format="item.format || 'yyyy-MM'"
              :class="itemClassName( item )"
              v-model="form[item.key]"
            ></DatePicker>
          </template>
          <template v-if="item.type === 'null'">
            <div style="width: 100px;"></div>
          </template>
          <!-- 定制化表单元素 -->
          <slot v-if="!item.type" :name="item.key || 'form'" :row="item"></slot>
        </FormItem>
      </Form>
      <div class="form-btn-wrapper">
        <Button
          @click="handleSearchForm"
          :loading="table && table.loading"
          type="primary"
        >{{$t("btn.query")}}</Button>
        <Button
          :loading="table && table.loading"
          v-if="reset"
          @click="resetForm"
        >{{$t("btn.reset")}}</Button>
        <Button
          icon="ios-paper"
          type="info"
          class="output-button"
          v-if="execlOptions && execlOptions.execl && execlOptions.execl.url"
          @click="execlDownload"
        >{{$t("btn.output")}}</Button>
        <!-- 定制化按钮 如需添加【重置】按钮 -->
        <slot name="queryButton"></slot>
      </div>
      <slot name="cardContainer"></slot>
    </VCard>
    <Card class="table-card vipayTable_card">
      <!-- tabs -->
      <Tabs
        style="margin-top: 12px"
        class="vipayTable_tabs"
        type="card"
        v-if="tabs.length > 0"
        @on-click="handleTabs"
      >
        <TabPane
          v-for="(tab, index) in tabs"
          :key="index"
          style="text-transform: capitalize;"
          :label="tab.label"
          :name="tab.name"
        ></TabPane>
      </Tabs>
      <div v-if="tableTitle" slot="title" class="user-select">
        <slot name="table-before" />
        <div class="table-card-title">
          <div class="vipayTable_card--customTitle">
            <slot name="customTitle">
              <span>{{tableTitle || $t('utils.query_result')}}</span>
              <QuerySum :totalCount="table.page.total" :items="querySumItems" />
            </slot>
            <slot name="customTitleButton" />
          </div>
          <slot name="tableButton"></slot>
        </div>
      </div>
      <div class="content-header">
        <template v-if="statisticsTitle && statisticsDesc">
          <h3>{{ statisticsTitle }}</h3>
          <div class="content-header-desc">{{ statisticsDesc }}</div>
        </template>
        <slot name="content-header" />
      </div>
      <div
        v-loading="loading"
        v-show="displayType == echartDisplayTypeEnum.TABLE"
        class="vipayTable_table"
      >
        <Table
          border
          ref="table"
          :stripe="stripe"
          :row-class-name="rowClassName"
          :height="table.height || defaultTableHeight"
          :loading="table.loading"
          :columns="table.cols"
          :data="table.data"
          :draggable="draggable"
          @on-sort-change="onSortChange"
          @on-drag-drop="onDragDrop"
          @on-selection-change="handleSelect"
        >
          <template slot-scope="{ row }" slot="el-image">
            <el-image
              :src="row.imagePaths[0]"
              fit="cover"
              v-if="Array.isArray(row.imagePaths) && row.imagePaths[0]"
              :preview-src-list="row.imagePaths"
              class="table-el-image"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
          </template>
        </Table>
      </div>
      <div v-loading="loading" v-show="displayType == echartDisplayTypeEnum.LINE">
        <div id="echarts" ref="echarts"></div>
      </div>
      <slot name="table-after" />
    </Card>
    <ExeclModal ref="execl-model" :table="table" />
  </div>
</template>

<script>
import { Image } from 'element-ui';
import { cloneDeep } from 'lodash';
import Buttons from "./buttons/index"
import ExeclModal from './execl-modal/execl-modal.vue';
import echartsMixin from './mixins/echarts'
import exportMixin from './mixins/export'
import { echartDisplayTypeEnum } from './common/index'
import Util from '@/utils/util.js'
import VCard from '@/components/VCard'

let routeIndex = 0
const caceHashForm = {}
const getCaceKey = function (form, routeName) {
  return routeName + form.map(item => item.key ? item.key.slice(0, 4) : '').join('')
}

export default {
  mixins: [echartsMixin, exportMixin],

  components: { Buttons, ExeclModal, ElImage: Image, VCard },

  props: {
    execlOptions: {
      type: Object
    },
    caceFormData: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: true
    },
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
    resetProps: {
      type: Object,
      default: null
    },
    table: {
      type: Object,
      default: () => {
        return {
          loading: false,
          author: { query: '' },
          cols: [],
          data: [],
          page: {
            pageNum: 1,
            pageSize: 10,
            total: 0
          }
        }
      }
    },
    queryList: {
      type: Array,
      default: () => {
        return []
      }
    },
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    },
    reset: {
      type: Boolean,
      default: () => true
    },
    rowClassArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    rowClassNameFn: {
      type: Function,
    },
    queryTitle: {},
    tableTitle: {},
    querySumItems: {},
    expand: {
      type: Boolean,
      default: () => true
    },
    draggable: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: Number,
      default: 70
    },
    spanMethod: {
      type: Function,
      defalut: () => []
    }
  },

  data () {
    return {
      echartDisplayTypeEnum,
      form: {},
      tabsName: '',
      params: {},
      // 上次搜索的查询条件
      lastSearchParams: {
        form: {},
        page: {
          pageNum: 1,
          pageSize: 10
        },
        tabsName: ''
      },
      isDev: process.env.NODE_ENV === 'development',
      expandValue: true
    };
  },

  watch: {
    expand (val) {
      if (val !== this.expandValue) {
        this.expandValue = !!val;
      }
    },
    expandValue (val) {
      if (val !== this.expandValue) {
        this.$emit('expand', !!val);
      }
    },
    // 参数初始化
    queryList: {
      handler: function (val) {
        val.forEach(item => {
          if (item.value && item.key) {
            this.form[item.key] = item.value
          }
          // dateRange 初始化参数
          if (item.startDate && item.endDate && item.value) {
            [this.form[item.startDate] = undefined, this.form[item.endDate] = undefined] = item.value
          }
          // textSelect 定制初始参数
          if (item.textSelectValue) {
            this.form[item.selectKey] = item.textSelectValue
          }
        })
      },
      deep: true,
      immediate: true
    },
    ['table.data']: {
      handler () {
        try {
          this.$refs.table.$el.querySelectorAll('.ivu-table-body')[0].scrollTop = 0;
          if (this.spanMethod) {
            this.$nextTick(() => {
              this.colsOrRowSpan()
            })
          }
        } catch (err) {
          console.log(err)
        }
      },
      deep: true
    }
  },

  computed: {
    currentTime () {
      return new Date();
    },
    dateOption () {
      return {
        shortcuts: [{
          text: this.$t('v3_1_1.nowadays'),
          value: () => this.todayDateForm[1]
        }, {
          text: this.$t('v3_1_1.yesterday'),
          value: () => this.yesterdayDateForm[1]
        }, {
          text: this.$t('v3_1_1.theDayBeforeYesterday'),
          value: () => {
            const dateForm = this.getDateForm(new Date(this.currentTime.valueOf() - (86400000 * 2)));
            const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
            return new Date(`${ymd} 00:00:00`);
          }
        }]
      };
    },
    datePickerOption () {
      // return {
      //   今天: this.todayDateForm,
      //   昨天: this.yesterdayDateForm,
      //   三天: this.threeDayDateForm,
      //   本周: this.oneWeekDateForm,
      //   本月: this.currentMonthDateForm
      // };
      return {
        shortcuts: [
          {
            text: this.$t('v3_1_1.nowadays'),
            value: () => this.todayDateForm
          },
          {
            text: this.$t('v3_1_1.yesterday'),
            value: () => this.yesterdayDateForm
          },
          {
            text: this.$t('scriptv1.last3Days'),
            value: () => this.threeDayDateForm
          },
          {
            text: this.$t('scriptv1.last7Days'),
            value: () => this.sevendayDateForm
          },
          {
            text: this.$t('scriptv1.last14Days'),
            value: () => this.fourteenDateForm
          },
          {
            text: this.$t('scriptv1.last30Days'),
            value: () => this.thirtydayDateForm
          },
          {
            text: this.$t('v3_1_1.thisWeek'),
            value: () => this.oneWeekDateForm
          },
          {
            text: this.$t('v3_1_1.thisMonth'),
            value: () => this.currentMonthDateForm
          }
        ]
      };
    },
    todayDateForm () {
      const dateForm = this.getDateForm(this.currentTime);
      const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
      return this.getDateFormResult(new Date(`${ymd} 00:00:00`), this.currentTime);
    },
    yesterdayDateForm () {
      const dateForm = this.getDateForm(new Date(this.currentTime.valueOf() - 86400000));
      const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
      return this.getDateFormResult(new Date(`${ymd} 00:00:00`), new Date(`${ymd} 23:59:59`));
    },
    threeDayDateForm () {
      // const space = 86400000 * 3
      // const threeDateForm = this.getDateForm(new Date(this.currentTime.valueOf() - space));
      // const threeYmd = `${threeDateForm[0]}/${threeDateForm[1]}/${threeDateForm[2]}`;
      // const startDate = new Date(`${threeYmd} 00:00:00`)
      // const endDate = new Date(startDate.valueOf() + space - 1000)
      // console.log([startDate, endDate])
      // return [startDate, endDate]
      // return this.getStartAndEndDate(3)
      return Util.getDateStartEnd(3, false)
    },
    sevendayDateForm () {
      console.log(Util.getDateStartEnd(7, false))
      return Util.getDateStartEnd(7, false)
    },
    fourteenDateForm () {
      return Util.getDateStartEnd(14, false)
    },
    thirtydayDateForm () {
      return Util.getDateStartEnd(30, false)
    },
    oneWeekDateForm () {
      const dateForm = this.getDateForm(this.currentTime);
      const dayNum = (this.currentTime.getDay() === 0 && 6 || this.currentTime.getDay() - 1) * 86400000;
      const weekDateForm = this.getDateForm(new Date(this.currentTime.valueOf() - dayNum));
      const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
      const weekYmd = `${weekDateForm[0]}/${weekDateForm[1]}/${weekDateForm[2]}`;
      return this.getDateFormResult(new Date(`${weekYmd} 00:00:00`), this.currentTime);
    },
    currentMonthDateForm () {
      const dateForm = this.getDateForm(this.currentTime);
      const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
      const monthYmd = `${dateForm[0]}/${dateForm[1]}/01`;
      return this.getDateFormResult(new Date(`${monthYmd} 00:00:00`), this.currentTime);
    },
    itemClassName: () => item => item.className || 'input-width-normal',
    itemDatePickerOptions () {
      return (item) => {
        const { pickerOptions: options = {} } = item
        const { disabledFuture } = options
        // 禁止选择未来
        if (disabledFuture) {
          options.disabledDate = (date) => {
            return date && date.valueOf() > Date.now();
          }
        }
        return {
          ...this.datePickerOption,
          ...options
        }
      }
    },
    defaultTableHeight () {
      let clientHeight = document.documentElement.clientHeight
      return clientHeight - 38 - 10 - 18 - 221.75 - 90 - 50
      // if (document.documentElement.clientHeight < 700) {
      //   return 300;
      // }
      // if (document.documentElement.clientHeight < 800) {
      //   return 400;
      // }
      // if (document.documentElement.clientHeight < 900) {
      //   return 480;
      // }
      // return 600;
    }
  },

  created () {
    if (this.caceFormData) {
      const key = getCaceKey(this.queryList, this.$route.name)
      const cace = caceHashForm[key]
      if (cace) {
        if (Math.abs(cace.routeIndex - routeIndex) < 3) {
          const caceform = cace.data.form
          const cacePage = cace.data.page
          for (const x in caceform) {
            this.$set(this.form, x, caceform[x]);
            // this.form[x] = caceform[x]
          }
          this.table.page.pageNum = cacePage.pageNum
          this.table.page.pageSize = cacePage.pageSize
        }
      }
    }
  },

  mounted () {
    if (!this.$root.watchRouter) {
      this.$root.watchRouter = true
      this.$root.$watch('$route', function (newVal, oldVal) {
        routeIndex = routeIndex + 1
        for (const x in caceHashForm) {
          if (Math.abs(caceHashForm[x].routeIndex - routeIndex) > 5) {
            delete caceHashForm[x]
          }
        }
      })
    }
    this.$nextTick(() => {
      try {
        this.expandValue = !!this.expand;
        const __valueKeys = Object.keys(this.value);
        if (__valueKeys.length) {
          const timeKeyList = [];
          const timeKey = this.queryList.filter(e => e.type === 'dateRange').forEach(e => {
            timeKeyList.push(e.startDate);
            timeKeyList.push(e.endDate);
            timeKeyList.push(e.key);
            const startDate = this.value[e.startDate];
            const endDate = this.value[e.endDate];
            this.$set(this.form, e.key, [new Date(startDate).valueOf(), new Date(endDate).valueOf()])
          });

          __valueKeys.forEach(e => {
            if (this.value[e] && timeKeyList.indexOf(e) === -1) {
              this.form[e] = this.value[e];
            }
          })
        }
        if (this.spanMethod) {
          this.$nextTick(() => {
            this.colsOrRowSpan()
          })
        }
      } catch (err) { }
      this.$emit('onload');
    });
  },

  methods: {
    getlabelWidth (item) {
      return item.width ? item.width : this.labelWidth
    },

    getStartAndEndDate (day) {
      const space = 86400000 * day
      const dateForm = this.getDateForm(new Date(this.currentTime.valueOf() - space));
      const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
      const startDate = new Date(`${ymd} 00:00:00`)
      const endDate = new Date(startDate.valueOf() + space - 1000)
      console.log([startDate, endDate])
      return [startDate, endDate]
    },
    execlDownload () {
      this.$refs['execl-model'].show(this.execlOptions);
    },
    // 拼接参数
    getParams () {
      this.params = {
        form: {
          ...this.form
        },
        page: {
          pageNum: this.table.page.pageNum,
          pageSize: this.table.page.pageSize,
        },
        tabsName: this.tabsName
      }
      for (const x in this.params.form) {
        if (this.params.form[x] === '' || x === 'undefined') {
          delete this.params.form[x]
        }
      }
      return this.params
    },
    // 改变查询条件
    handleSearchForm () {
      // 点击查询按钮，页码回到第一页
      const { form } = this.getParams()
      this.table.page.pageNum = 1;
      this.handleSearch()
      // 保存上一次查询条件
      this.lastSearchParams = cloneDeep(this.getParams())
      const key = getCaceKey(this.queryList, this.$route.name)
      caceHashForm[key] = {
        data: this.lastSearchParams,
        routeIndex
      }
    },
    // 查询
    handleSearch () {
      // 根据当前输入查询条件搜索
      this.$emit('handleSearch', this.getParams())
    },
    refreshList () {
      // 根据最后一次搜索查询条件进行搜索
      // 适用于编辑、翻页等操作（用户没有主动触发查询按钮时，新输入的查询条件不应该生效）
      let params = {
        ...this.lastSearchParams,
        page: {
          pageNum: this.table.page.pageNum,
          pageSize: this.table.page.pageSize
        },
        tabsName: this.tabsName
      }
      this.$emit('handleSearch', params)
    },
    onSortChange ({ column, key, order }) {
      this.$emit('on-sort-change', { column, key, order })
    },
    // 翻页
    onPageChange (pageNum) {
      this.table.page.pageNum = pageNum;
      this.refreshList()
      // this.handleSearch()
    },
    // 改变每页条目数量
    onPageSizeChange (pageSize) {
      this.table.page.pageSize = pageSize;
      this.refreshList()
      // this.handleSearch()
    },
    // 切换tabs
    handleTabs (name) {
      this.tabsName = name;
      this.table.page.pageNum = 1;
      this.refreshList()
      // this.handleSearch();
    },
    getDateFormResult (start, end) {
      return [start, end];
    },
    getDateForm (currentTime) {
      //  [0: 年, 1: 月, 2: 日, 3: 时, 4: 分, 5: 秒, 6: 毫秒, 7: 季度]
      return [
        currentTime.getFullYear(),
        currentTime.getMonth() + 1,
        currentTime.getDate(),
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds(),
        currentTime.getMilliseconds()
      ];
    },
    getItemOptions (options) {
      return typeof options == "function" ? options() : options
    },
    // 时间传参格式化
    onDatePickerChange (value, options) {
      const { isTimestamp, startDate, endDate, key } = options
      if (isTimestamp) {
        // 后期接口要求用两个时间戳字段（时区，用isTimestamp）
        [this.form[startDate] = undefined, this.form[endDate] = undefined] = value.map((item, index) => {
          if (index === 1) {
            // 获取日结束时间点
            return this.moment(item).endOf('day').valueOf()
          }
          return this.moment(item).valueOf()
        })
      } else {
        // 前期接口要求时间范围用两个字符串字段
        // value为已格式化的日期，比如2016-01-01
        [this.form[startDate] = undefined, this.form[endDate] = undefined] = value
      }
    },
    // 设置日期的值
    handleSetValue (value, key, key2) {
      if (key && key2) {
        this.form[key] = value[0];
        this.form[key2] = value[1];
      } else {
        this.form[key] = value;
      }
    },
    handleSetMonth (value, options) {
      const { dateMonth } = options;
      this.form[dateMonth] = value
    },
    // 表格行颜色
    rowClassName (row, index) {
      if (this.rowClassNameFn) {
        return this.rowClassNameFn(row, index)
      }
      if (this.rowClassArr.indexOf(index) > -1) {
        return 'table-info-row'
      }
      return ''
    },
    // 选中项发生改变触发
    handleSelect (selection) {
      this.$emit('handleSelect', selection)
    },
    // 重置查询条件
    resetForm () {
      this.$set(this, 'form', this.resetProps ? { ...this.resetProps } : {});
      // datePicker没有绑定v-model，无法通过数据驱动视图
      const datePickerRefs = this.$refs.datePicker || []
      datePickerRefs.forEach(ref => {
        ref = ref || {}
        ref.handleClear && ref.handleClear()
      })
      this.$emit('resetForm')
      this.handleSearchForm();
    },
    // 设置表单缺省值
    setForm (form) {
      this.$set(this, 'form', { ...form })
    },
    onDragDrop (e, w) {
      this.$emit('on-drag-drop', e, w)
    },
    colsOrRowSpan () {
      const fn = this.spanMethod
      const column = this.table.cols
      const data = this.table.data
      const spans = []
      if (typeof fn === 'function') {
        for (let i = 0; i < data.length; i++) {
          const rowIndex = i
          const row = data[i]
          for (let j = 0; j < column.length; j++) {
            const columnIndex = j
            const result = fn({ row, column, rowIndex, columnIndex })
            spans.push({ result, rowIndex, columnIndex })
          }
        }
      }
      if (spans.length) {
        let html = this.$refs.table.$el.querySelector('.ivu-table-tbody').innerHTML
        for (let i = 0; i < spans.length; i++) {
          const item = spans[i]
          const result = item.result
          let rowspan = 1
          let colspan = 1
          let sty = ''
          if (Array.isArray(result)) {
            rowspan = result[0]
            colspan = result[1]
          } else if (typeof result === 'object') {
            rowspan = result.rowspan
            colspan = result.colspan
          }
          if (!rowspan || !colspan) {
            sty = 'display:none;'
          }
          html = html.replace(/<td /, `<BeiJiTD style="${sty}" rowspan=${rowspan} colspan=${colspan} data-ri=${item.rowIndex} data-ci=${item.columnIndex} `)
        }
        html = html.replace(/<BeiJiTD/g, `<td`)
        this.$refs.table.$el.querySelector('.ivu-table-tbody').innerHTML = html
      }
    }
  }

};
</script>
<style lang="stylus" scoped>
#echarts {
  width: 100%;
  min-height: 440px;
}

>>> .ivu-picker-panel-sidebar {
  width: 97px;
}

.content-header {
  padding: 20px 20px;

  .content-header-desc {
    margin: 10px 0;
  }
}

.vipay-table-form-card {
  .ivu-form-item {
    margin-bottom: 6px;
    transition: all 0.3s;
  }
}

.v-form-type-item {
  display: block;
}

.vipayTable {
  .output-button {
    .ivu-icon {
      font-size: 14px;
    }
  }

  .ivu-form {
    margin-bottom: 10px;
    font-size: 12px;

    .ivu-form-item-label {
      font-size: 12px;
    }

    .ivu-input {
      font-size: 12px;
    }
  }

  .ivu-table-cell {
    padding: 2px 6px;
  }

  .ivu-table-header {
    .ivu-table-column-center {
      text-transform: capitalize;
    }
  }

  .ivu-input[disabled], fieldset[disabled] .ivu-input {
    background: #FFFFFF;
    border: none;
    color: #666;
  }

  &_card {
    .ivu-card-head {
      margin-bottom: 10px !important;
    }

    .ivu-card-body {
      padding: 0 12px !important;
    }
  }

  &_table {
    margin: 0 0 15px 0;
  }

  .ivu-table {
    font-size: 12px;
  }

  .table-el-image {
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    position: relative;
    margin: 10px auto 5px auto;
    overflow: hidden;
    background: #f5f7fa;

    .el-image__inner {
      width: 80px;
      height: 80px;
    }
  }

  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .el-icon-picture-outline {
    font-family: element-icons !important;
    font-size: 26px;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
  }

  .table-info-row {
    td {
      background-color: #ff6600;
      color: #fff;
    }
  }
}

.table-card {
  .vipayTable_card--customTitle {
    display: flex;
    align-items: center;
  }

  .ivu-page.mini {
    .ivu-page-options-elevator {
      input {
        width: 54px;
      }
    }
  }
}
</style>


