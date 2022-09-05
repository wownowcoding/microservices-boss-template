// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, DataZoomComponent, LegendComponent } from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([DataZoomComponent, LegendComponent, LineChart, TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, BarChart, LabelLayout, UniversalTransition, CanvasRenderer])

import { echartDisplayTypeEnum } from '../common/index'

export default {
  props: {
    echartsOps: {
      type: Object,
      default: () => {}
    },
    statisticsTitle: {
      type: String,
      default: ''
    },
    statisticsDesc: {
      type: String,
      default: ''
    },
    // 是否 - 展示类型选项
    // showDisplayType: {
    //   type: Boolean,
    //   default: true
    // },
    displayType: {
      type: [String, Number],
      default: echartDisplayTypeEnum.LINE
    }
  },

  watch: {
  },

  data() {
    return {
      myEcharts: null,
    }
  },

  mounted() {
    console.log('i m run echarts')
    this.handleWindowResize()
    this.$nextTick(() => {
      this.myChart = echarts.init(this.$refs.echarts, null, {
      })
      this.myChart.setOption(this.echartsOps)
    })
  },

  methods: {
    setEchartsOptions(ops) {
      this.myChart.setOption(ops)
    },
    getDom() {
      return this.myChart.getDom()
    },
    handleWindowResize() {
      window.addEventListener('resize', () => {
        this.myChart && this.myChart.resize()
      })
    }
  }

}