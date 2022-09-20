import { post_func, post_func_lang, mock_func } from '@/utils/axios'
import config from '@/config'
const {
    SMS_WEB,
    BOSS_WEB,
    MERCHANT_BOSS_WEB,
    SETTLE_BOSS_WEB,
    NOTIFICATION_WEB,
    USER_WEB,
    ACCOUNT_WEB,
    RECHARGE,
    COMMON_WEB,
} = config.moduleUrl

const operator = `${BOSS_WEB}/boss/system/operator`
const menu = `${BOSS_WEB}/boss/system/menu`
const settle = `${SETTLE_BOSS_WEB}/boss/settle`
const sms = `${SMS_WEB}/boss/message/sms/template`
const role = `${BOSS_WEB}/boss/system/role`
const user = `${USER_WEB}/boss/userInfo`
const user_serials = `${USER_WEB}/boss/user`
const auth = `${BOSS_WEB}/boss/auth`
const risk = `${MERCHANT_BOSS_WEB}/risk/rule`
const query = `${MERCHANT_BOSS_WEB}/boss/query`
const notification = `${NOTIFICATION_WEB}`
const account = `${ACCOUNT_WEB}`
const file_server = `${ACCOUNT_WEB}`
const recharge = `${RECHARGE}`

/*app配置中心*/
// 字典新增
export const datadict_add = `${BOSS_WEB}/config/datadict/add.do`
// 字典删除
export const datadict_delete = `${BOSS_WEB}/config/datadict/delete.do`
// 字典查询
export const datadict_query = `${BOSS_WEB}/config/datadict/query.do`
// 字典修改
export const datadict_update = `${BOSS_WEB}/config/datadict/update.do`
// 版本管理枚举
export const enum_query = `${BOSS_WEB}/config/datadict/enum/query.do`
// 版本配置新增
export const version_add = `${BOSS_WEB}/config/version/add.do`
// 版本配置审核
export const version_audit = `${BOSS_WEB}/config/version/audit.do`
// 版本配置关闭
export const version_close = `${BOSS_WEB}/config/version/close.do`
// 版本配置删除
export const version_delete = `${BOSS_WEB}/config/version/delete.do`
// 版本配置查询
export const version_query = `${BOSS_WEB}/config/version/query.do`
// 版本配置查询详细
export const version_get = `${BOSS_WEB}/config/version/get.do`
// 版本配置修改
export const version_update = `${BOSS_WEB}/config/version/update.do`

/*文件服务*/
export const file_upload = `/boss/boss-api/upload-assets`

/*商户收银员*/
export const queryCashier = `${MERCHANT_BOSS_WEB}/mer/operator/queryCashier.do`
// 退款查询
export const query_refund = `${MERCHANT_BOSS_WEB}/mer/refund/query/refund/list.do`
// 退款查询统计
export const query_refund_total = `${MERCHANT_BOSS_WEB}/mer/refund/query/refund/total.do`
// 退款查询详情
export const refund_detail = `${MERCHANT_BOSS_WEB}/mer/refund/query/refund/detail.do`

/*账务*/
// 查询账户号
export const getAccountNameAndBalance = `${account}/accountAdjustment/getAccountNmaeAndBalance`
// 分录调账查询
export const getledgerTransfer = `${account}/accountAdjustment/ledgerTransfer`
// 检查借贷平衡
export const debitCreditsCheck = `${account}/accountAdjustment/debitCreditsCheck`
// 提交
export const createRecord = `${account}/accountAdjustment/createRecord`
// 审核列表
export const queryReviewList = `${account}/accountAdjustment/queryReviewList`
// 审核详情
export const queryDetailList = `${account}/accountAdjustment/queryDetailList`
// 审核
export const verifyRecord = `${account}/accountAdjustment/verifyRecord`

/*账务报表*/
export const query_report_list = `${account}/report/queryReportList`

/*汇兑管理*/
// 查列表
export const queryExchangeNoticePage = `${account}/exchange/queryExchangeNoticePage`
// 查参考信息
export const queryLastDayExchange = `${account}/exchange/queryLastDayExchange`
// 汇兑操作提交
export const exchangeRecord = `${account}/exchange/exchangeRecord`
// 汇兑详情1
export const queryExchangeRecordByNoticeId = `${account}/exchange/queryExchangeRecordByNoticeId`
// 汇兑详情2
export const queryExchangeRecordItemList = `${account}/exchange/queryExchangeRecordItemList`

/*卡管理*/
// 制卡
export const makeCard = `${recharge}/rechargeCard/make.do`
// 批次列表
export const queryBatchList = `${recharge}/rechargeCard/queryBatchList.do`
// 卡激活
export const cardActivate = `${recharge}/rechargeCard/activate.do`
// 下载卡密
export const downloadCardDetail = `${recharge}/rechargeCard/downloadCardFile.do`
// 查询批次详情
export const queryBatchListDetail = `${recharge}/rechargeCard/queryBatchListDetail.do`
// 卡信息列表
export const queryCardList = `${recharge}/rechargeCard/queryCardList.do`
// 卡信息详情
export const queryCardDetail = `${recharge}/rechargeCard/queryCardDetail.do`
// 获取联系管理员
export const getManagePhone = `${recharge}/rechargeCard/getManagePhone.do`

// 全局模块枚举
export const getEnumByKeys = `${BOSS_WEB}/boss/metadata/enums/module/get.do`
// 全局所有枚举
// export const getEnumByKeysAll = `${BOSS_WEB}/boss/metadata/enums/all/get.do`
export const getEnumByKeysAll = `${COMMON_WEB}/enum/enums/all/get.do`

/*交易统计*/
// 交易查询
// export const query_trade = `${query}/trade.do`
export const query_trade = `${BOSS_WEB}/trade/query/order/list.do`
// export const query_trade_total = `${query}/trade/sum.do`
export const query_trade_total = `${BOSS_WEB}/trade/query/order/sum.do`
// 业务查询
export const query_service = `${query}/service.do`
export const query_service_total = `${query}/service/sum.do`

/*身份认证*/
// 登录
export const login = `${auth}/authentication.do`
// 二次认证
export const google_login = `${auth}/secondary/authentication.do`
// 注销
export const logout = `${auth}/logout.do`
// 验证码
export const captcha = `${auth}/captcha/image/get.do`
// 检查是否需要验证码
export const checkCaptcha = `${BOSS_WEB}/boss/auth/check/login.do`

// 权限
export const permission_list = `${BOSS_WEB}/boss/permission/tree/list.do`

/*风控*/
// 查询风控规则列表
export const risk_query = `${risk}/query/list.do`

// 修改风控规则
export const risk_edit = `${risk}/edit.do`
// 查看风控规则详情
export const risk_detail = `${risk}/check/detail.do`

/*操作员*/
// 操作员列表
export const operator_list = `${operator}/detail/list.do`
// 操作员列表v2, 不包含权限控制
export const operator_list_v2 = `${operator}/detail/list/v2.do`

// 新增操作员
export const operator_add = `${operator}/detail/create.do`
// 删除操作员
export const operator_delete = `${operator}/detail/delete.do`
// 编辑操作员
export const operator_edit = `${operator}/detail/edit.do`
// 操作员修改密码
export const modifypwd = `${operator}/pwd/modify.do`
// 重置操作员密码
export const resetpwd = `${operator}/pwd/reset.do`
// 操作员修改状态
export const modifyState = `${operator}/state/modify.do`
// 重置密钥
export const reset_secretkey = `${operator}/secretkey/reset.do`

/*菜单*/
// 菜单列表查询
export const menu_list = `${menu}/first/list.do`
// 菜单排序
export const menu_sort = `${menu}/sort.do`
// 修改菜单状态
export const menu_modify = `${menu}/state/modify.do`

/*角色*/
// 获取角色下拉列表
export const getRolePullDownList = `${role}/brief/list.do`
// 角色列表查询
export const role_list = `${role}/detail/list.do`
// 角色新增
export const role_add = `${role}/detail/add.do`
// 编辑角色
export const role_edit = `${role}/detail/edit.do`
// 删除角色
export const role_delete = `${role}/detail/delete.do`
// 角色修改状态
export const role_modify = `${role}/state/modify.do`
// 角色权限列表
export const role_permissions = `${role}/detail.do`

// 操作日志列表查询
export const optLog_list = `${BOSS_WEB}/boss/system/log/detail/list.do`

/*消息*/
// 消息列表
export const notification_list = `${notification}/boss/notification/list.do`
// 添加消息
export const notification_add = `${notification}/boss/notification/add.do`

/*短信*/
// 列表查询
export const template_list = `${sms}/list.do`
// 模板类型
export const template_type = `${sms}/type/list.do`
// 模板新增
export const template_add = `${sms}/create.do`
// 模板编辑
export const template_edit = `${sms}/update.do`
// 模板禁用启用
export const template_updatetemplatestate = `${sms}/updatetemplatestate.do`

/*清结算*/
/*对接彩票*/
// 商户对账单列表
export const checkBill_query = `${settle}/checkBill/list.do`
// 商户对账单重发(批量操作)
export const checkBill_resend = `${settle}/checkBill/resend.do`
// 商户对账单文件导出
export const checkBill_export = `${settle}/checkBill/export.do`

// 商户收款日账单列表查询
export const settle_dailybill = `${settle}/dailybill/list.do`
// 商户收款日账单列表查询汇总统计数据获取
export const settle_collect = `${settle}/dailybill/collect.do`

// 商户账单明细
export const dailybill_detail = `${settle}/dailybill/detail/list.do`
// 账单明细统计
export const dailybill_detail_collect = `${settle}/dailybill/detail/collect.do`

// 商户对账差错列表
export const error_list = `${settle}/error/list.do`
// 商户对账差错列表统计汇总
export const error_collect = `${settle}/error/collect.do`

// 商户结算清结算审核
export const audit_list = `${settle}/audit/list.do`
// 商户结算清结算审核统计
export const audit_collect = `${settle}/audit/collect.do`

// 商户结算清结算审核导出
export const audit_export = `${settle}/audit/export.do`
// 商户清结算审核详情
export const audit_detail = `${settle}/audit/detail.do`
// 商户清结算审核详情 日账单查询
export const settleAudit_dailybill = `${settle}/settleAudit/detail/dailybill/list.do`
// 商户清结算审核详情 日账单总计
export const settleAudit_dailybill_collect = `${settle}/settleAudit/detail/dailybill/collect.do`
// 商户清结算审核详情 差错列表
export const settleAudit_error_list = `${settle}/settleAudit/detail/error/list.do`
// 商户清结算审核详情 差错列表总计
export const settleAudit_error_collect = `${settle}/settleAudit/detail/error/collect.do`
// 商户结算清结算审核提交
export const audit_submit = `${settle}/audit/submit.do`
// 批量重新发起审核/重新发起审核
export const audit_redo = `${settle}/audit/redo.do`

// 商户结算财务审核列表
export const finance_list = `${settle}/finance/list.do`
// 商户结算财务审核统计
export const finance_collect = `${settle}/finance/collect.do`
// 商户结算财务审核列表导出
export const finance_export = `${settle}/finance/export.do`
// 商户结算财务审核详情
export const finance_detail = `${settle}/finance/detail.do`
// 商户结算财务审核详情 日账单
export const finance_dailybill = `${settle}/settleFinance/detail/dailybill/list.do`
// 商户结算财务审核详情 日账单统计
export const finance_dailybill_collect = `${settle}/settleFinance/detail/dailybill/collect.do`
// 商户结算财务审核详情 差错列表
export const settleFinance_error_list = `${settle}/settleFinance/detail/error/list.do`
// 商户结算财务审核详情 差错统计
export const settleFinance_error_collect = `${settle}/settleFinance/detail/error/collect.do`
// 商户结算财务审核提交
export const finance_audit = `${settle}/finance/audit.do`

// 商户结算出款审核列表
export const fund_list = `${settle}/fund/list.do`
// 商户结算出款审核统计
export const fund_collect = `${settle}/fund/collect.do`
// 商户结算出款审核导出
export const fund_export = `${settle}/fund/export.do`
// 发起付款提交/批量付款
export const fund_pay = `${settle}/fund/pay.do`
// 商户结算出款审核详情
export const fund_detail = `${settle}/fund/detail.do`
// 付款审核提交
export const fund_audit = `${settle}/fund/submit.do`
// 上传结算凭证
export const voucher_upload = `${settle}/voucher/upload.do`

// 商户收款日账单生成统计查询
export const dailybill_statistics = `${settle}/dailybill/statistics.do`
// 商户结算清结算审核结算单生成统计查询
export const audit_statistics = `${settle}/audit/statistics.do`

// 用户列表查询
export const user_list = `${user}/list.do`
// 用户信息查询
export const user_query = `${user}/query.do`
// 用户第三方信息
export const user_outer_auth = `${user}/auth/info/list`
// 用户操作记录
export const user_operationLog = `${user}/operationLog.do`
// 重置支付密码
export const user_reset = `${user}/reset.do`
// 冻结账户处理
export const user_freeze = `${user}/freeze/freeze.do`
// 解冻账户处理
export const user_unfreeze = `${user}/freeze/unfreeze.do`
// 标记虚假实名信息
export const user_cert = `${user}/cert/mark.do`
// 取消标记虚假实名信息
export const user_uncert = `${user}/cert/unmark.do`
// 用户黑名单处理
export const user_blacklist = `${user}/blacklist/add.do`
// 用户移出黑名单
export const user_remove_blacklist = `${user}/blacklist/remove.do`
// 实名审核列表
export const applyList = `${user}/apply/list.do`
// 实名审核详情
export const applyDetail = `${user}/apply/detail.do`
// 实名审核
export const confirmRealName = `${user}/apply/audit.do`

// 帐户流水记录查询
export const user_account = `${user_serials}/account/serial/list.do`
// 帐户余额
export const user_balance = `${user_serials}/account/balance/get.do`

export const api_func = (params, url, mock) => {
    let func = mock ? mock_func : post_func
    return func(params, eval(url))
}

// 获取当前登录账号的权限列表tree
export const user_menu_list = `${BOSS_WEB}/boss/system/role/detail/menu.do`;

// 获取部门列表
export const department_list = `${BOSS_WEB}/boss/department/brief/list.do`;