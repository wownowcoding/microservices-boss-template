/*
 * @Description:
 * @Author: 黄博方
 * @Date: 2019-09-03 11:34:52
 * @LastEditors: 黄博方
 * @LastEditTime: 2019-09-03 19:48:22
 */
import i18n from '@/language/index.js'
import moment from 'moment'

// 校验数值范围
export const validNumberRange =
	(min, max) =>
		(rule, value, callback, source, options) => {
			if (!(min <= value - 0 && max >= value - 0)) {
				callback(
					new Error(i18n.t("tips.enter_num_between", { arg0: min - 0, arg1: max - 0 }))
				);
			} else {
				callback();
			}
		};

// 校验选择是否选择文件
export const validFileRequired = (rule, value, callback, source, options) => {
	if (!value || !value.length) {
		callback(new Error(i18n.t('tips.file_required')))
	} else {
		callback()
	}
}

export const validUrlRequired = (rule, value, callback, source, options) => {
	if (value && /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(value)) {
		callback()
	} else {
		callback(new Error(i18n.t('system.urlValidator')))
	}
}

// 校验选择邮箱
export const validEmailRequired = (rule, value, callback, source, options) => {
	const rules = /^([\w]+([\w-\.+]*[\w-]+)?)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i; // eslint-disable-line
	if (rules.test(value) && value.indexOf('.') !== -1) {
		callback()
	} else {
		callback(new Error(i18n.t('findPage.validEmailReq')))
	}
}

// 校验选择的值是否为空
export const validRequired = (rule, value, callback, source, options) => {
	if ((!value && value !== 0) || !(value.toString().trim().length > 0)) {
		callback(new Error(i18n.t('tips.required')))
	} else {
		callback()
	}
}
// 校验选择的集合是否为空
export const validListRequired = (rule, value, callback, source, options) => {
	if (!value || !value.length) {
		callback(new Error(i18n.t('tips.selection_required')))
	} else {
		callback()
	}
}
// 校验时间范围
export const validateTimeRange = (timeRangeList, callback) => {
	const [startTime, endTime] = timeRangeList
	if (!startTime || !endTime) {
		callback(new Error(i18n.t('tips.required')))
	} else if (moment(startTime).isAfter(moment(endTime))) {
		callback(new Error(i18n.t('tips.time_range_limit')))
	} else {
		callback()
	}
}
// 仅支持数字、英文大小写字母、半角标点符号·.,-_~ *()输入
export const validateNormalString = (rule, value, callback) => {
	const reg = /^[A-Za-z0-9\·\.\,\-\_\~\*\(\)\<\>]+$/
	const formattedValue = value && String(value).trim()
	if (formattedValue && !reg.test(formattedValue)) {
		callback(new Error(i18n.t('tips.support_type_regular')))
	} else {
		callback()
	}
}
// 校验手机号码
export const validatePhone = (rule, value, callback) => {
	if (!value) {
		callback()
	}
	const reg = /^855(0)?(10|15|16|69|70|81|86|87|93|98|96|88|97|71|60|66|67|68|90|31|91|11|12|14|17|61|76|77|78|85|89|92|95|99|18|38|13|80|83|84|79)[0-9]{6,7}$/
	const formattedValue = String(value).trim()
	// 去掉区号后检验是否为空字符串
	const trimAreaCodeValue = formattedValue.replace(/^855(0)?/, '')
	if (trimAreaCodeValue && !reg.test(formattedValue)) {
		callback(new Error(i18n.t('tips.invalid_vipay')))
	} else {
		callback()
	}
}
//  名称长度校验 - 50
export const validateName = (rule, value, callback) => callback(value && value.toString().length > 50 && new Error(i18n.t('tips.maximumLengthExceeded')) || undefined);
//  详情长度校验 - 100
export const validateDescription = (rule, value, callback) => callback(value && value.toString().length > 100 && new Error(i18n.t('tips.maximumLengthExceeded')) || undefined);
//  其它 - 100
export const validateOther = (rule, value, callback) => callback(value && value.toString().length > 100 && new Error(i18n.t('tips.maximumLengthExceeded')) || undefined);
// 	任意长度校验 len
export const validateLength = (len) => ((rule, value, callback) => callback(value && value.toString().length > len && new Error(i18n.t('tips.maximumLengthExceeded')) || undefined))
//校验包含0的正整数
export const validatePositiveInteger = (rule, value, callback) => callback(!/^[+]{0,1}(\d+)$/.test(value) && new Error(i18n.t('v3_1_1.pleaseEnterAPositiveInteger')) || undefined)

//校验不包含0的正整数
export const validPositiveInteger = (rule, value, callback) => callback(!/(^[1-9]\d*$)/.test(value) && new Error(i18n.t('v3_1_1.pleaseEnterAPositiveInteger')) || undefined)
//  金额正则
export const moneyReg = /^-?[0-9]+\.?[0-9]{0,2}$/;
//  校验数字，包含小数
export const numberReg = /^-?[0-9]+\.?[0-9]*$/;
//  校验金额
export const validateMoney = (rule, value, callback) => {
	callback(/^-?[0-9]+\.?[0-9]{0,2}$/.test(value) ? undefined : new Error(i18n.t('tips.file_required')))
}
//  校验数字
export const validateNum = (rule, value, callback) => {
	callback(value && !numberReg.test(value) && new Error(i18n.t('v2_1_1.numTip')) || undefined)
}
