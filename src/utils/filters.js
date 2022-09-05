/*
 * @Description:
 * @Author: 黄博方
 * @Date: 2018-11-01 17:38:30
 * @LastEditors: 黄博方
 * @LastEditTime: 2019-08-29 11:44:26
 * @example console.log( Vue.filter("AmtThousandsFmt")('1888841554'));
 */
// import moment from 'moment';
import moment from 'moment-timezone'
import util from '@/utils/util'
import Store from '@/utils/store'
import Vue from 'vue'
// 判断是时间戳字符串后,转回number类型
const execTimeStampStr = (val, key) => {
    return !!val && /^\d+$/.test(val.toString()) ? Number(val) : val
}

export default {
    install () {
        // 日期处理
        Vue.filter('Date', (val, key) => {
            if (!val && val !== 0) {
                return '-'
            }
            const momentDate = moment(execTimeStampStr(val))
            return momentDate.isValid() ? momentDate.format('DD/MM/YYYY') : '-'
        })
        // 日期处理
        Vue.filter('zhDate', (val, key) => {
            if (!val && val !== 0) {
                return '-'
            }
            const momentDate = moment(execTimeStampStr(val))
            return momentDate.isValid() ? momentDate.format('YYYY-MM-DD') : '-'
        })
        // 时间处理
        Vue.filter('Time', (val, key) => {
            if (!val && val !== 0) {
                return '-'
            }
            const momentDate = moment(execTimeStampStr(val))
            return momentDate.isValid() ? momentDate.format('HH:mm:ss') : '-'
        })
        // 日期时间处理
        Vue.filter('Datetime', (val, changeTimezone) => {
            if (!val && val !== 0) {
                return '-'
            }
            const momentDate = moment(execTimeStampStr(val))
            if (changeTimezone) {
                return momentDate.isValid() ? momentDate.tz(Store.loadObject('currentTimeZone') || 'Indian/Christmas').format('DD/MM/YYYY HH:mm:ss') : '-'
            }
            // 设置时区为金边时间（东7区）
            return momentDate.isValid()
                ? momentDate.format('DD/MM/YYYY HH:mm:ss')
                : '-'
        })
        // 日期时间处理
        Vue.filter('DateFormat', (val, formatStr) => {
            if (!val && val !== 0) {
                return '-'
            }
            const momentDate = moment(execTimeStampStr(val))
            return momentDate.isValid() ? momentDate.format(formatStr) : '-'
        })
        // 字符串显示缺省处理
        Vue.filter('Placeholder', (val, defaultStr = '-') => {
            if (Array.isArray(val) || util.isType('Object')(val)) {
                return val
            }
            let flag = !(!val && val !== 0) && String(val).length > 0 // 除0外的非法类型处理
            return flag ? val : defaultStr
        })
        // 金额千分位处理
        Vue.filter('AmtThousandsFmt', util.AmtThousandsFmt)
        // 金额小数点两位处理
        Vue.filter('AmtDecimalsFmt', (num, n = 2) => {
            // let n = 2 //设置保留的小数位数
            num =
                parseFloat((num + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
            let l = num
                .split('.')[0]
                .split('')
                .reverse()
            let r = num.split('.')[1]
            let t = ''
            for (let i = 0; i < l.length; i++) {
                t += l[i]
            }
            return (
                t
                    .split('')
                    .reverse()
                    .join('') +
                '.' +
                r
            )
        })
        // 金额异常输入处理
        Vue.filter('AmtNullFmt', num => {
            return isNaN(Number(num)) ? 0 : Number(num)
        })
        Vue.filter('showMoney', num => Vue.filter('AmtThousandsFmt')(Vue.filter('AmtNullFmt')(num)))
        // 字段拼接展示
        Vue.filter('joinWith', (strArr, joinSign = ' | ') => {
            return Vue.filter('Placeholder')(
                strArr
                    .filter(item => Boolean(item) && item !== '-')
                    .join(joinSign),
            )
        })
    },
}
