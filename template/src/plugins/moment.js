/*
 * @Description: moment插件
 * @Author: 管铭钊
 * @Date: 2019/8/9
 */

import moment from 'moment'
import momentTZ from 'moment-timezone'
import Store from '@/utils/store'

require('moment/locale/zh-cn');
const Moment = {}

Moment.install = function (Vue) {
    // 本地化，中文时间显示
    moment.locale('zh-cn')
    // 设置时区为金边时间（东7区）
    momentTZ.tz.setDefault(Store.loadObject('currentTimeZone') || 'Indian/Christmas')
    Vue.prototype.moment = moment
}

export default Moment
