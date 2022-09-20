import apiUtil from './apiUtil'

export const api = apiUtil

import config from '@/config';

const { MERCHANT_BOSS_WEB, BOSS_WEB } = config.moduleUrl

//待审核商户接口
export const mer_reviewed_add = `${MERCHANT_BOSS_WEB}/mer/reviewed/add.do` // 商户-商家管理-添加商家
export const mer_reviewed_edit = `${MERCHANT_BOSS_WEB}/mer/reviewed/edit.do` // 商户-入网-编辑

export const mer_reviewed_remove = `${MERCHANT_BOSS_WEB}/mer/reviewed/remove.do` // 商户-商家管理-删除商家
export const mer_reviewed_detail = `${MERCHANT_BOSS_WEB}/mer/reviewed/query/review/detail.do` // 商户-商家管理-商家审核详情
export const mer_reviewed_list = `${MERCHANT_BOSS_WEB}/mer/reviewed/list.do` // 商户-商家管理-商家审核列表

export const mer_bank_list = `${MERCHANT_BOSS_WEB}/mer/reviewed/query/bank/list.do` //商户-商家管理-查询国家下的银行
export const mer_category_list = `${MERCHANT_BOSS_WEB}/mer/reviewed/query/category.do` //商户-商家管理-查询经营范围
export const mer_zone_list = `${MERCHANT_BOSS_WEB}/mer/reviewed/query/zone.do` //商户-商家管理-查询省市区


export const mer_reviewed_fail = `${MERCHANT_BOSS_WEB}/mer/reviewed/edit/status/fail.do` // 商户-商家管理-审核未通过
// export const mer_reviewed_success = `${MERCHANT_BOSS_WEB}/mer/reviewed/edit/status/success.do` // 商户-商家管理-审核通过
export const mer_reviewed_success = `${MERCHANT_BOSS_WEB}/mer/reviewed/status/success.do` // 商户-商家管理-审核通过
export const mer_reviewed_reedit_success = `${MERCHANT_BOSS_WEB}/mer/reviewed/edit/status/success.do` // 商户-商家管理-重新编辑-审核通过
export const mer_reviewed_category = `${MERCHANT_BOSS_WEB}/mer/reviewed/query/category.do` // 商户-商家管理-查询经营范围
export const mer_reviewed_zone = `${MERCHANT_BOSS_WEB}/mer/reviewed/query/zone.do` // 商户-商家管理-查询省市区
export const mer_reviewed_sendsms = `${MERCHANT_BOSS_WEB}/merchant/audit/send/sms.do` // 发送开通短信
//商户接口
export const mer_edit = `${MERCHANT_BOSS_WEB}/mer/info/edit.do` // 商户-审核通过后-重新编辑
export const mer_close = `${MERCHANT_BOSS_WEB}/mer/close.do` // 商户-商家管理-禁用商户
export const mer_enable = `${MERCHANT_BOSS_WEB}/mer/enable.do` // 商户-商家管理-启用商户
export const mer_upload = `${MERCHANT_BOSS_WEB}/mer/file/upload.do` // 商户-商家管理-上传图片
export const mer_list = `${MERCHANT_BOSS_WEB}/mer/list.do` // 商户-商家管理-商家列表
export const mer_detail = `${MERCHANT_BOSS_WEB}/mer/query/detail.do` // 商户-商家管理-审核通过商家详情
export const mer_qrcode = `${MERCHANT_BOSS_WEB}/mer/query/qr/data.do` // 商户-商家管理-获取商户收款二维码
export const mer_billEmail = `${MERCHANT_BOSS_WEB}/mer/query/bill-get.do` // 商户-商家管理-对账邮箱查询
export const mer_billEmail_edit = `${MERCHANT_BOSS_WEB}/mer/update/bill-get.do` // 商户-商家管理-对账邮箱更新
export const mer_pwd_reset = `${MERCHANT_BOSS_WEB}/mer/pwd/reset.do` // 商户-重置密码
export const mer_check_account_unique = `${MERCHANT_BOSS_WEB}/mer/reviewed/validAccountInfo.do` // 商户-检查账户唯一性

//黑名单接口
export const mer_blackList_add = `${MERCHANT_BOSS_WEB}/merchant/blacklist/add.do` // addBlackList
export const mer_blackList_cancel = `${MERCHANT_BOSS_WEB}/merchant/blacklist/cancel.do` // cancel
export const mer_blackList_list = `${MERCHANT_BOSS_WEB}/merchant/blacklist/query/black/list.do` // queryBlackList

// 退款导出
export const mer_refund_download = `${MERCHANT_BOSS_WEB}/mer/refund/export/merRefundOrder.do`
// 业务导出
export const service_download = `${MERCHANT_BOSS_WEB}/boss/export/service.do`
// 根据分类查询产品列表
export const product_list_by_category = `${MERCHANT_BOSS_WEB}/mer/product/list/category.do`

// 费率调整
export const handleRateAdjustment = `${MERCHANT_BOSS_WEB}/mer/update/merchant/poundage.do`
// 商户费率
export const merchantRate = `${MERCHANT_BOSS_WEB}/mer/query/merchant/poundage.do`
// 历史费率
export const merchantHistoryRate = `${MERCHANT_BOSS_WEB}/mer/query/poundage/history.do`
// 历史费率详情
export const historyRate = `${MERCHANT_BOSS_WEB}/mer/query/poundage/detail.do`
// 根据渠道获取支付机构
export const pay_organization_by_channel = `${BOSS_WEB}/fund-channel/pay-org/list.do`
// 获取支付渠道
export const pay_channel = `${BOSS_WEB}/fund-channel/channel/type/list.do`
