/*
 * @Description: 校验工具类
 * @Author: Rico.刘一飞
 * @LastEditors: Rico.刘一飞
 * @Date: 2019-04-18 15:55:55
 * @LastEditTime: 2019-10-14 16:18:08
 * @LastEditTime: 2019-07-23 14:56:27
 */


const verify = {
    // 校验url -- 只允许http、https协议
    url: (value) => {
        return /^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(value)
    },
    // 百分比 -- 允许两位小数 0-100
    percent2: (value) => {
        return /^(\d|[1-9]\d|100)(\.\d{1,2})?$/.test(value)
    },
    // 百分比 -- 允许两位小数 0-100
    percent1: (value) => {
        return /^(\d|[1-9]\d|100)(\.\d{0,1})?$/.test(value)
    },
    // 正整数
    int: (value) => {
        // return /^[0-9]*[0-9][0-9]*$/.test(value)
        return /^[1-9]\d*$/.test(value)

    },
    // 正整数 -- 允许两位小数
    int2: (value) => {
        return /^\d+(\.\d{0,2})?$/.test(value)
    },
    // 数字校验
    number: (value) => {
        return /^[0-9]*$/.test(value)
    },
    // 积分校验
    credit: (value, precision = 1) => {
        if (!value || !Number(value)) {
            return false
        }
        const valueStr = value + ''
        const splitStr = valueStr.split('.')
        if (!splitStr[0]) {
            return false
        }
        if (splitStr[1] && splitStr[1].length !== precision) {
            return false
        }
        return true
    },
    money: (value, precision = 2) => {
        if (!value || !Number(value)) {
            return false
        }
        const valueStr = value + ''
        const splitStr = valueStr.split('.')
        if (!splitStr[0]) {
            return false
        }
        if (splitStr[1] && splitStr[1].length > precision) {
            return false
        }
        return true
    },
}

export default verify
