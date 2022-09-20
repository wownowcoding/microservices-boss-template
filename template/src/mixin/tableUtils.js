import { bizApi } from "@/api/bizApiUtils";
import { Checkbox } from "iview";
import _ from "lodash";
export default {
  data() {
    return {
      selection: [],
      // 列表接口
      fetchApi: "",
      // vipayTable 的table配置
      table: {
        loading: false,
        data: [],
        cols: [],
        page: {
          total: 0,
          pageSize: 10,
          pageNum: 1
        }
      }
    };
  },
  methods: {
    // 查询列表
    async fetchData() {
      this.table.loading = true;
      const params  = this.getFormParams()
      try {
        let { data } =
        // fetchApi如果是包装请求函数,则直接调用
          this.fetchApi instanceof Function ?
              await this.fetchApi(params)
            : await bizApi(params, this.fetchApi);
        this.table.data = data.list;
        this.table.page.pageNum = params.pageNum;
        this.table.page.total = data.total;
        this.table.loading = false;
        this.fetchSuccess(data);
      } catch (error) {
        console.log(" Dev Log: fetchData -> error", error);
        this.table.loading = false;
        this.fetchFail(error);
      }
    },
    // 更新数据后的回调(用于业务重写)
    fetchSuccess() {},
    fetchFail() {},
    // 获取参数
    getFormParams() {
      // vipaytable 要配置 ref=table
      const { form, page } = this.$refs.table.getParams();
      let [startTime, endTime] = this.Util.timeRangeHandle(
        [form.startTime, form.endTime],
        "DD/MM/YYYY"
      );
      return { ...form, ...page, startTime, endTime };
    },
    /**
     * 表格switch渲染组件
     * @param {Obejct|Function} renderOptions render函数的配置
     * @param {Function} onChangeHandler 切换时执行的函数
     */
    // 表格选择列render
    switchRender(onChangeHandler = () => {}, renderOptions = {}) {
      const self = this;
      return (h, params) => {
        const colKey = params.column.key;
        const rowData = params.row;
        const value = rowData[colKey];
        const options = _.merge(
          {
            props: {
              name: colKey,
              value,
              key: params.index
            },
            on: {
              "on-change": value => {
                rowData[colKey] = value;
                onChangeHandler.apply(self, [params]);
              }
            }
          },
          renderOptions instanceof Function
            ? renderOptions.apply(this, [h, params])
            : renderOptions
        );
        return h("i-switch", options);
      };
    },
    /**
     * 表格多选渲染组件
     * @param {String|Number} uniqueKey 标识行数据唯一性字段,不传会自动取col的key字段
     * @param {Obejct|Function} checkboxOptions checkbox render函数的配置
     */
    // 表格选择列render
    selectionRender(uniqueKey, checkboxOptions = {}) {
      const self = this;
      return (h, params) => {
        if (!uniqueKey) uniqueKey = params.column.key;
        const rowData = params.row;
        const uniqueId = rowData[uniqueKey];
        const options = _.merge(
          {
            props: {
              name: uniqueKey,
              value: !!self.selection.find(
                _rowData => _rowData[uniqueKey] === uniqueId
              ),
              key: uniqueId
            },
            style: { marginRight: "0px" }, // 重置复选框样式
            on: {
              "on-change": isSelected => {
                if (isSelected) {
                  self.selection.push(rowData);
                } else {
                  self.selection = self.selection.filter(
                    _rowData => _rowData[uniqueKey] != uniqueId
                  );
                }
              }
            }
          },
          checkboxOptions instanceof Function
            ? checkboxOptions.apply(this, [h, params])
            : checkboxOptions
        );
        return h(Checkbox, options);
      };
    },
    // 列枚举展示render
    enumRender: (enumGrp, enumKey, colKey) => (h, params) => {
      if (!colKey) colKey = params.column.key;
      return h(
        "span",
        vm.$store.getters.enumGetter(enumGrp, enumKey)(params.row[colKey])
      );
    },
    // 列金额(Number)展示render
    amtRender: colKey => (h, params) => {
      if (!colKey) colKey = params.column.key;
      return h(
        "span",
        vm.$options.filters["AmtThousandsFmt"](params.row[colKey])
      );
    },
    // 列金额(Money)展示render
    // moneyProps money组件的参数
    moneyRender: (colKey,moneyProps) => (h, params) => {
      if (!colKey) colKey = params.column.key;
      return h("VMoney", { props: { value: params.row[colKey] ,...moneyProps} });
    },
    // 列日期/时间展示render
    dateRender: (colKey, fmt = "Datetime") => (h, params) => {
      if (!colKey) colKey = params.column.key;
      return h("span", vm.$options.filters[fmt](params.row[colKey]));
    }
  }
};
