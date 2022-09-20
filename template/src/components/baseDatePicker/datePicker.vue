<template>
  <iWownowViewDatePicker @on-open-change="onOpenChange" ref="datePicker" :value="inactValue" v-bind="$attrs" v-on="{ ...$listeners, 'on-change': emitValue }" />
</template>

<script>
import Emitter from 'iview/src/mixins/emitter';
// import CurrentDatePicker from 'iview/src/components/date-picker'
/*
 *
 * datePicker 为 二次封装好的 iView DatePicker 组件，只针对绑定 v-model的值做修改（其余不变，用法与 DatePicker一致）
 *
 * 进入的东七区时间 转为 选择器上的显示的时间
 *
 * 出去的时间 为选择后的时间转金边时间，按照当前的时区抛出去
 *
 *
 * */
const { DatePicker } = iview
export default {
  components: { iWownowViewDatePicker: DatePicker },
  mixins: [Emitter],
  name: 'DatePicker',
  inheritAttrs: false,
  props: ['value'],
  data() {
    return {
      dateType: ''
    }
  },
  model: {
    prop: 'value',
    event: 'setModel'
  },
  mounted() {
    this.registerRefFunction()
  },
  computed: {
    inactValue() {
      /*
       *  进入时间： 金边时间 转 字面量时间( 时间选择器上 显示的 date 时间 )
       *  转化为 金边时间 年月日时分秒 格式
       *  将金边时间字符串 通过 new Date 方式转为当前DatePicker展示的时间
       * */

      /*
       *
       * 对 iView DatePicker组件的 原有 clearable 属性开启时（默认开启）
       * 当清空时内置收到的 值为格式错误的 date对象，所以需要返回个 '' 空回去，避免出现 NaN
       * 验证方法： 时间对象转时间戳 后判断是否是 number 错误时间格式为 NaN
       *
       * Number.isNaN( 时间对象.getTime() ) ? NaN
       *
       * this.$emit('setModel',outTime)
       *
       * */

      try {
        let { type, multiple, format } = this.$attrs
        let multipleFlag = multiple === '' || multiple
        let inTime = null
        // 未定义v-model 处理
        if (this.value === undefined) this.$emit('setModel', '')
        // 为空处理
        if (!this.value) return ''
        // date 格式

        let dateReg = this.setDateRegExp(this.value, format)

        if ((type === 'date' && !multipleFlag) || type === 'datetime' || type === 'year' || type === 'month') {
          let date = new Date(this.moment(dateReg).format('YYYY-MM-DD HH:mm:ss'))
          Number.isNaN(date.getTime()) ? (inTime = '') : (inTime = date) // 防止 时间格式错误

          // daterange datetimerange 格式 date multiple = true
        } else if (type === 'daterange' || type === 'datetimerange' || (type === 'date' && multipleFlag)) {
          inTime = []
          if (Array.isArray(dateReg)) {
            // 防止 首次进入不是array时，抛出到 catch
            dateReg.forEach(item => {
              let preInTime = new Date(this.moment(item).format('YYYY-MM-DD HH:mm:ss'))
              Number.isNaN(preInTime.getTime()) ? inTime.push('') : inTime.push(preInTime)
            })
          } else {
            inTime = ''
          }
        }
        return inTime
      } catch (e) {
        // 防止不必要的输入，引发 date 格式错误
        console.log(e)
        return ''
      }
    }
  },
  watch: {
    inactValue(val) {
      this.dispatch('FormItem', 'on-form-blur', val);
    }
  },
  methods: {
    onOpenChange(...args) {
      this.dispatch('FormItem', 'on-form-blur', this.inactValue);
      this.$emit('on-open-change', ...args);
    },
    registerRefFunction() {
      const METHODS_NAMES = ['handleClear']
      METHODS_NAMES.forEach(methodName => {
        this[methodName] = this.$refs['datePicker'][methodName]
      })
    },
    setDateRegExp(date, format) {
      if (typeof date === 'string') {
        let dat = ''
        let reg1 = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g //  yyyy-MM-dd
        let reg2 = /^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/g //  yyyy-MM-dd HH:mm:ss
        let reg3 = /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/g //  yyyy/MM/dd
        let reg4 = /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/g //  yyyy/MM/dd HH:mm:ss
        let reg5 = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/g //  dd/MM/yyyy  /   MM/dd/yyyy
        let reg6 = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/g //  dd/MM/yyyy HH:mm:ss   /   MM/dd/yyyy HH:mm:ss
        let reg7 = /^[0-9]{2}\/[0-9]{4}$/g //  MM/yyyy
        let reg8 = /^[0-9]{4}$/g //  yyyy
        if (reg2.test(date) || (reg1.test(date) && format)) {
          dat = date
        } else if (reg3.test(date) || (reg4.test(date) && format)) {
          dat = date.replace(/\//g, '-')
        } else if (reg5.test(date) && format) {
          if (format === 'MM/dd/yyyy') {
            dat = `${date.split('/')[2]}-${date.split('/')[0]}-${date.split('/')[1]}`
          } else {
            dat = `${date.split('/')[2]}-${date.split('/')[1]}-${date.split('/')[0]}`
          }
        } else if (reg6.test(date) && format) {
          let dateSplit0 = date.split(' ')[0]
          let dateSplit1 = date.split(' ')[1]
          if (format === 'MM/dd/yyyy HH:mm:ss') {
            dat = `${dateSplit0.split('/')[2]}-${dateSplit0.split('/')[0]}-${dateSplit0.split('/')[1]} ${dateSplit1}`
          } else {
            dat = `${dateSplit0.split('/')[2]}-${dateSplit0.split('/')[1]}-${dateSplit0.split('/')[0]} ${dateSplit1}`
          }
        } else if (reg7.test(date) && format === 'MM/yyyy') {
          dat = `${date.split('/')[1]}-${date.split('/')[0]}`
        } else if (reg8.test(date) && format === 'yyyy') {
          dat = `${date}-01-01`
        } else {
          dat = ''
        }
        return dat
      } else {
        return date
      }
    },
    // 格式后正常输出
    dateTypeFormat(defaulitDate, hms, flag) {
      let date = null,
        a,
        b
      if (flag) {
        a = 0
        b = 2
      } else {
        a = 2
        b = 0
      }
      // 两种类型 array string
      if (Array.isArray(defaulitDate)) {
        date = []
        defaulitDate.forEach(dateitem => {
          if (hms == 0) {
            date.push(dateitem !== '' ? `${dateitem.split('/')[a]}-${dateitem.split('/')[1]}-${dateitem.split('/')[b]}` : '')
          } else {
            let Kopf = dateitem.split(' ')
            let Schwanz = Kopf[0].split('/')
            date.push(dateitem !== '' ? `${Schwanz[a]}-${Schwanz[1]}-${Schwanz[b]} ${Kopf[1]}` : '')
          }
        })
      } else if (typeof defaulitDate === 'string') {
        if (hms == 0) {
          date = `${defaulitDate.split('/')[a]}-${defaulitDate.split('/')[1]}-${defaulitDate.split('/')[b]}`
        } else {
          let date1 = defaulitDate.split(' ')
          let date2 = date1[0].split('/')
          date = `${date2[a]}-${date2[1]}-${date2[b]} ${date1[1]}`
        }
      }
      return date
    },
    // 格式
    setFormatCompatible(defaulitDate, format) {
      if (!format || defaulitDate === '') return defaulitDate
      let date = null
      switch (format) {
        case 'yyyy-MM-dd':
          date = defaulitDate
          break
        case 'yyyy-MM-dd HH:mm:ss':
          date = defaulitDate
          break
        case 'MM/yyyy':
          if (Array.isArray(defaulitDate)) {
            date = []
            defaulitDate.forEach(item => {
              date.push(item === '' ? '' : `${item.split('/')[1]}-${item.split('/')[0]}`)
            })
          } else {
            date = `${defaulitDate.split('/')[1]}-${defaulitDate.split('/')[0]}`
          }
          break
        case 'dd-MM-yyyy':
          if (Array.isArray(defaulitDate)) {
            date = []
            defaulitDate.forEach(item => {
              date.push(item === '' ? '' : `${item.split('-')[2]}-${item.split('-')[1]}-${item.split('-')[0]}`)
            })
          } else {
            date = `${defaulitDate.split('-')[2]}-${defaulitDate.split('-')[1]}-${defaulitDate.split('-')[0]}`
          }
          break
        case 'dd-MM-yyyy HH:mm:ss':
          if (Array.isArray(defaulitDate)) {
            date = []
            defaulitDate.forEach(item => {
              let deHand = item.split(' ')
              date.push(item === '' ? '' : `${deHand[0].split('-')[2]}-${deHand[0].split('-')[1]}-${deHand[0].split('-')[0]} ${deHand[1]}`)
            })
          } else {
            let deHand = defaulitDate.split(' ')
            date = `${deHand[0].split('-')[2]}-${deHand[0].split('-')[1]}-${deHand[0].split('-')[0]} ${deHand[1]}`
          }
          break
        case 'dd/MM/yyyy':
          date = this.dateTypeFormat(defaulitDate, 0)
          break
        case 'dd/MM/yyyy HH:mm:ss':
          date = this.dateTypeFormat(defaulitDate, 1)
          break
        case 'yyyy/MM/dd':
          date = this.dateTypeFormat(defaulitDate, 0, true)
          break
        case 'yyyy/MM/dd HH:mm:ss':
          date = this.dateTypeFormat(defaulitDate, 1, true)
          break
        case 'MM/dd/yyyy':
          if (Array.isArray(defaulitDate)) {
            date = []
            defaulitDate.forEach(item => {
              date.push(item === '' ? '' : `${item.split('/')[2]}-${item.split('/')[0]}-${item.split('/')[1]}`)
            })
          } else {
            date = `${defaulitDate.split('/')[2]}-${defaulitDate.split('/')[0]}-${defaulitDate.split('/')[1]}`
          }
          break
        case 'dd/MM/yyyy HH:mm':
          // date = this.dateTypeFormat(defaulitDate, 1)
          if (typeof defaulitDate === 'string') {
            // 由于只解析道mm，缺少了秒的部分，导致moment转换失败为空，手动补秒00部分
            if (defaulitDate.length === 16) {
              date = this.dateTypeFormat(`${defaulitDate}:00`, 1)
            }
          } else {
            date = []
            defaulitDate.forEach(item => {
              date.push(this.dateTypeFormat(`${item}:00`, 1))
            })
          }
          break
        default:
          date = ''
      }
      return date
    },
    // 抛出处理
    emitValue(value) {
      let { type, multiple, format } = this.$attrs
      let outTime = null
      let dateValue = null
      let multipleFlag = multiple === '' || multiple
      let valueSplit = null

      type === 'date' && multipleFlag && format ? (valueSplit = value.split(',')) : (valueSplit = value)
      dateValue = this.setFormatCompatible(valueSplit, format)
      // 为空处理
      if (dateValue === '') {
        outTime = ''
      }
      // date datetime 格式
      else if ((type === 'date' && !multipleFlag) || type === 'datetime' || type === 'month') {
        outTime = this.moment(dateValue).toDate()
      } else if (type === 'daterange' || type === 'datetimerange' || (type === 'date' && multipleFlag)) {
      /*
       * daterange datetimerange 格式
       * date 格式为多时间, multiple = true 处理
       * */
        outTime = []
        let dateList = null
        !format && type === 'date' ? (dateList = dateValue.split(',')) : (dateList = dateValue)
        dateList.forEach(item => {
          item === '' ? outTime.push('') : outTime.push(this.moment(item).toDate())
        })
      }
      // type year 处理， 选择year 时， moment默认的时区时间对应不上，需另行处理
      else if (type === 'year') {
        // format有值时，无需处理
        if (!format) dateValue = dateValue + '-01-01 00:00:00'
        outTime = this.moment(dateValue).toDate()
      }
      // 防止不必要的输出，引发 date格式错误
      else {
        outTime = ''
      }
      // 抛出外部绑定 v-model:value
      this.$emit('setModel', outTime)
      // 外部不使用 on-change时 不要绑定
      if (typeof this.$listeners['on-change'] === 'function') this.$listeners['on-change'].apply(this, arguments)
    }
  }
}
</script>

<style scoped>
</style>
