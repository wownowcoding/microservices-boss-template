import '@/services/mock'
import api from '@/api/apiUtil'
import postDownload from '@/components/DownloadLink/postDownload'
import util from '@/utils/util.js'
import config from '@/config'

const {SETTLE_BOSS_WEB} = config.moduleUrl
const date = util.getDate()
const base = config.baseURL
export const SETTLE_AUDIT_TOAUDIT = `${SETTLE_BOSS_WEB}/boss/settle/audit/submit.do`
export const SETTLE_SUBMIT_FINANCE = `${SETTLE_BOSS_WEB}/boss/settle/finance/audit.do`
export const SETTLEOUT_UNABLE_LIST = `${SETTLE_BOSS_WEB}/boss/settle/order/settle/unable/query.do`
export const SETTLEOUT_UNABLE_COUNT = `${SETTLE_BOSS_WEB}/boss/settle/order/unable/list/count.do`
export const SETTLE_SUBMIT_SETTLEOUT = `${SETTLE_BOSS_WEB}/boss/settle/fund/submit.do`
export const SETTLE_AUDIT_OPERATION_DATA = `${SETTLE_BOSS_WEB}/boss/settle/audit/operation/list.do`
export const FINANCEDETAIL_OPERA_TION = `${SETTLE_BOSS_WEB}/boss/settle/finance/operation/list.do`
export const GETSETTLEOUT_DETAIL_OPERATION = `${SETTLE_BOSS_WEB}/boss/settle/fund/operation/list.do`
export const SETTLE_AUDIT_DETAIL_DATA = `${SETTLE_BOSS_WEB}/boss/settle/audit/detail.do`
export const GETFINANCE_DETAIL_DATA = `${SETTLE_BOSS_WEB}/boss/settle/finance/detail.do`
export const SETTLE_AUDIT_BATCH_AUDIT = `${SETTLE_BOSS_WEB}/boss/settle/audit/redo.do`
export const SETTLE_AUDIT_TABEL_LIST = `${SETTLE_BOSS_WEB}/boss/settle/audit/list.do`
export const GETFINANCE_TABLE_LIST = `${SETTLE_BOSS_WEB}/boss/settle/finance/list.do`
export const SETTLEOUT_TABLE_LIST = `${SETTLE_BOSS_WEB}/boss/settle/fund/list.do`
export const CLEARING_TABEL_LIST = `${SETTLE_BOSS_WEB}/boss/settle/clearing/status/change.do`
export const SUBMIT_HANDLE_CLEAR = `${SETTLE_BOSS_WEB}/boss/settle/clearing/handle.do`
export const SUBMIT_HANDLE_CLEAR_CASH = `${SETTLE_BOSS_WEB}/boss/bank/clearing/handle.do`
export const GET_CLEAR_DETAIL_DATA = `${SETTLE_BOSS_WEB}/boss/settle/clearing/detail.do`
export const GET_CLEAR_FUNDS_DATA = `${SETTLE_BOSS_WEB}/boss/settle/clearing/funds/list.do`
export const GET_CLEAR_FUNDS_DATACASH = `${SETTLE_BOSS_WEB}/boss/bank/clearing/funds/list.do`
export const GET_CLEAR_CLEAR_DATA = `${SETTLE_BOSS_WEB}/boss/settle/clearing/list.do`
export const GET_FUNDS_COUNT_DATA = `${SETTLE_BOSS_WEB}/boss/settle/clearing/funds/count.do`
export const GET_CASH_FUNDS_COUNT_DATA = `${SETTLE_BOSS_WEB}/boss/bank/clearing/funds/count.do`
export const SETTLE_ORDER_LIST = `${SETTLE_BOSS_WEB}/boss/settle/order/list.do`
export const SETTLEORDER_PENDING_LIST = `${SETTLE_BOSS_WEB}/boss/settle/order/pending/list.do`
export const SETTLE_ORDER_LIST_COUNT = `${SETTLE_BOSS_WEB}/boss/settle/order/list/count.do`
export const ERROR_COUNT_DATA = `${SETTLE_BOSS_WEB}/boss/settle/clearing/error/statistic.do`
export const ERROR_LIST_DATA = `${SETTLE_BOSS_WEB}/boss/settle/clearing/error/list.do`
export const SETTLE_CLEAR_COUNT_LIST = `${SETTLE_BOSS_WEB}/boss/settle/clearing/count.do`
export const SETTLE_SETTLEOTCER_DETAIL = `${SETTLE_BOSS_WEB}/boss/settle/order/detail.do`
export const CREATE_SETTLE_ORDERURL = `${SETTLE_BOSS_WEB}/boss/settle/order/pending/bill/query.do`
export const ADD_ORDER_MODAL_SEARCH = `${SETTLE_BOSS_WEB}/boss/settle/order/append/query.do`
export const SUBMIT_CREATEORDER_DATA = `${SETTLE_BOSS_WEB}/boss/settle/order/settle/bill/generate.do`
export const BILL_SETTLEAUDIT_PAGE_DATA = `${SETTLE_BOSS_WEB}/boss/settle/order/check/bill/query.do`
export const SETTLE_ORDER_COUNT = `${SETTLE_BOSS_WEB}/boss/settle/order/pending/statistic.do`
export const SETTLE_ERROR_TABLE_LIST = `${SETTLE_BOSS_WEB}/boss/settle/error/list.do`
export const ERROR_COUNT_LIST = `${SETTLE_BOSS_WEB}/boss/settle/error/statistic.do`
export const SETTLEERROR_DETAIL_DATA = `${SETTLE_BOSS_WEB}/boss/settle/error/detail.do`
export const SETTLE_VOUCHER_UPLOAD = `${SETTLE_BOSS_WEB}/boss/settle/voucher/upload.do`
export const SETTLE_BULKVOUCHER_UPLOAD = `${SETTLE_BOSS_WEB}/boss/settle/voucher/batchUpload.do`
export const SETTLEOUT_AUDIT_SUBMIT = `${SETTLE_BOSS_WEB}/boss/settle/fund/pay.do`
export const SETTLEOUT_DETAIL_DATA = `${SETTLE_BOSS_WEB}/boss/settle/fund/detail.do`
export const EXPORT_CLEAR_FINANCE_fund = `${SETTLE_BOSS_WEB}/boss/settle/fund/pay.do`
export const HANDLE_CLEAROBSOLETEK_DATA = `${SETTLE_BOSS_WEB}/boss/settle/clearing/cancel.do`



export const EXPORT_CLEAR_FUNDS = `${base}${SETTLE_BOSS_WEB}/boss/settle/clearing/funds/export.do`
export const EXPORT_CLEAR_CASH_FUNDS = `${base}${SETTLE_BOSS_WEB}/boss/bank/clearing/funds/export.do`
export const EXPORT_CLEAR_ORDER = `${base}${SETTLE_BOSS_WEB}/boss/settle/clearing/order/export.do`
export const EXPORT_CLEAR_CASH_ORDER = `${base}${SETTLE_BOSS_WEB}/boss/bank/clearing/order/export.do`
export const EXPORT_CLEAR_ERROR_ORDER = `${base}${SETTLE_BOSS_WEB}/boss/settle/clearing/error/order/export.do`
export const EXPORT_CLEAR_ERROR_FUNDS = `${base}${SETTLE_BOSS_WEB}/boss/settle/clearing/error/export.do`
export const EXPORT_CLEAR_AUDIT = `${base}${SETTLE_BOSS_WEB}/boss/settle/audit/export.do`
export const CLEARSETTLE_AUDIT_EXPORT_URL = `${base}${SETTLE_BOSS_WEB}/boss/settle/audit/detail/export.do`
export const CLEARSETTLE_FINANCE_EXPORT_URL = `${base}${SETTLE_BOSS_WEB}/boss/settle/finance/detail/export.do`
export const EXPORT_CLEAR_FINAANCE = `${base}${SETTLE_BOSS_WEB}/boss/settle/finance/export.do`
export const EXPORT_CLEAR_SETTLEOUT = `${base}${SETTLE_BOSS_WEB}/boss/settle/fund/export.do`
export const EXPORT_CLEAR_AUDIT_BATCH = `${base}${SETTLE_BOSS_WEB}/boss/settle/audit/exportBySettleBillNos.do`
export const EXPORT_CLEAR_FINANCE_BATCH = `${base}${SETTLE_BOSS_WEB}/boss/settle/finance/exportBySettleBillNos.do`
export const EXPORT_CLEAR_FUND_BATCH = `${base}${SETTLE_BOSS_WEB}/boss/settle/fund/exportBySettleBillNos.do`
export const EXPORT_CLEAR_SETTLE_ORDER = `${base}${SETTLE_BOSS_WEB}/boss/settle/order/export.do`
export const EXPORT__SETTLE_ORDER_PENNDING = `${base}${SETTLE_BOSS_WEB}/boss/settle/order/pending/export.do`
export const CLEARSETTLE_CHANNELADVANCE_EXPORT_URL = `${base}${SETTLE_BOSS_WEB}/boss/settle/order/advance/export.do`
export const CLEARSETTLE_CHANNELADVANCE_EXPORTCHECK_URL = `${base}${SETTLE_BOSS_WEB}/boss/settle/order/advance/checked/export.do`
export const EXPORT_CLEAR_SETTLE_ORDER_CHECK = `${base}${SETTLE_BOSS_WEB}/boss/settle/order/checked/export.do`
export const EXPORT_CLEAR_SETTLE_PENDING = `${base}${SETTLE_BOSS_WEB}/boss/settle/order/pending/checked/export.do`
export const SETTLEERROR_EXPORT_CHECK = `${base}${SETTLE_BOSS_WEB}/boss/settle/error/exportByPayNos.do`
export const SETTLEERROR_EXPORT = `${base}${SETTLE_BOSS_WEB}/boss/settle/error/export.do`

/**
 * return 商户结算清结算审核-详情
 * */
export function submitAuditUrl(params = {}) {
    return api(params, SETTLE_AUDIT_TOAUDIT)
}
/**
 * return 商户结算清结算审核-详情
 * */
export function submitFinanceUrl(params = {}) {
    return api(params, SETTLE_SUBMIT_FINANCE)
}
/**
 * return 商户结算清结算审核-详情
 * */
export function settleOutUnableListUrl(params = {}) {
    return api(params, SETTLEOUT_UNABLE_LIST)
}
/**
 * return 商户结算清结算审核-详情
 * */
export function settleOutUnableCountUrl(params = {}) {
    return api(params, SETTLEOUT_UNABLE_COUNT)
}
/**
 * return 商户结算清结算审核-详情
 * */
export function submitSettleOutUrl(params = {}) {
    return api(params, SETTLE_SUBMIT_SETTLEOUT)
}

/**
 * return 商户结算清结算审核-详情
 * */
export function getAuditDetailOperationUrl(params = {}) {
    return api(params, SETTLE_AUDIT_OPERATION_DATA)
}

/**
 * return 商户结算清结算审核-详情
 * */
export function getFinanceDetailOperationUrl(params = {}) {
    return api(params, FINANCEDETAIL_OPERA_TION)
}

/**
 * return 商户结算清结算审核-详情
 * */
export function getSettleOutDetailOperationUrl(params = {}) {
    return api(params, GETSETTLEOUT_DETAIL_OPERATION)
}

/**
 * return 商户结算清结算审核-详情
 * */
export function getSettleOutDetailDataUrl(params = {}) {
    return api(params, SETTLEOUT_DETAIL_DATA)
}

/**
 * return 商户结算清结算审核-详情
 * */
export function getAuditDetailDataUrl(params = {}) {
    return api(params, SETTLE_AUDIT_DETAIL_DATA)
}
/**
 * return 商户结算清结算审核-详情
 * */
export function settleOutAuditSubmitUrl(params = {}) {
    return api(params, SETTLEOUT_AUDIT_SUBMIT)
}
/**
 * return 商户结算清结算审核-详情
 * */
export function auditSelectPayFundsUrl(params = {}) {
    return api(params, EXPORT_CLEAR_FINANCE_fund)
}

/**
 * return 商户结算清结算审核-详情
 * */
export function settleVoucherUploadUrl(params = {}) {
    return api(params, SETTLE_VOUCHER_UPLOAD)
}
/**
 * return 商户结算清结算审核-详情
 * */
export function settleVoucherBulkUploadUrl(params = {}) {
    return api(params, SETTLE_BULKVOUCHER_UPLOAD)
}
/**
 * return 商户结算清结算审核-详情
 * */
export function getFinanceDetailDataUrl(params = {}) {
    return api(params, GETFINANCE_DETAIL_DATA)
}

/**
 * return 商户结算清结算审核-列表查询-批量审核
 * */
export function settleAuditBatchAuditUrl(params = {}) {
    return api(params, SETTLE_AUDIT_BATCH_AUDIT)
}
/**
 * return 财务结算清结算审核-列表查询-批量审核
 * */
export function settleFinanceBatchAuditUrl(params = {}) {
    return api(params, SETTLEFINANCE_BATCH_AUDIT)
}
/**
 * return 商户结算清结算审核-列表查询
 * */
export function getAuditTableListUrl(params = {}) {
    return api(params, SETTLE_AUDIT_TABEL_LIST)
}
/**
 * return 财务结算清结算审核-列表查询
 * */
export function getFinanceTableListUrl(params = {}) {
    return api(params, GETFINANCE_TABLE_LIST)
}
/**
 * return 财务结算清结算审核-列表查询
 * */
export function getSettleOutTableListUrl(params = {}) {
    return api(params, SETTLEOUT_TABLE_LIST)
}

/**
 * return 清结算管理-清结算列表操作-改为清分成功
 * */

export function changeClearSubmitUrl(params) {
    return api(params, CLEARING_TABEL_LIST)
}

/**
 * return 清结算管理-清结算列表操作-提交清分管理
 * */

export function submitHandleClearUrl(params) {
    return api(params, SUBMIT_HANDLE_CLEAR)
}
export function submitHandleClearCashUrl(params) {
    return api(params, SUBMIT_HANDLE_CLEAR_CASH)
}

/**
 * return 清结算管理-清结算列表操作-详情
 * */
export function getClearDetailDataUrl(params) {
    return api(params, GET_CLEAR_DETAIL_DATA)
}

/**
 * return 清结算管理-清结算列表操作-资金流水
 * */
export function getClearFundsListUrl(params) {
    return api(params, GET_CLEAR_FUNDS_DATA)
}
export function getClearCashFundsListUrl(params) {
    return api(params, GET_CLEAR_FUNDS_DATACASH)
}

/**
 * return 清结算管理-清结算列表查询
 * */
export function getClearTableListUrl(params) {
    return api(params, GET_CLEAR_CLEAR_DATA)
}

/**
 * return 清结算管理-清结算列表操作-资金流水多币种总计查询接口
 * */
export function getFundsCountUrl(params) {
    return api(params, GET_FUNDS_COUNT_DATA)
}
export function getCashFundsCountDataUrl(params) {
    return api(params, GET_CASH_FUNDS_COUNT_DATA)
}

/**
 * return 清结算管理-清结算列表操作-差错单总计
 * */
export function getErrorCountDataUrl(params) {
    return api(params, ERROR_COUNT_DATA)
}

/**
 * return 清结算管理-清结算列表操作-差错单list
 * */
export function getClearErrorListUrl(params) {
    return api(params, ERROR_LIST_DATA)
}

/**
 * return 商户结算订单-列表查询
 * */
export function settleOrderListUrl(params) {
    return api(params, SETTLE_ORDER_LIST)
}
/**
 * return 商户结算订单-列表查询
 * */
export function settleOrderPendingListUrl(params) {
    return api(params, SETTLEORDER_PENDING_LIST)
}

/**
 * return 商户结算订单-列表查询-总计
 * */
export function getOrderListCountUrl(params) {
    return api(params, SETTLE_ORDER_LIST_COUNT)
}

/**
 * return 商户结算订单-列表查询-总计
 * */
export function getClearCountListUrl(params) {
    return api(params, SETTLE_CLEAR_COUNT_LIST)
}

/**
 * return 商户结算订单-明细
 * */
export function getSettleOrderDetailUrl(params) {
    return api(params, SETTLE_SETTLEOTCER_DETAIL)
}

/**
 * return 商户结算订单-生成结算订单
 * */
export function createSettleOrderUrl(params) {
    return api(params, CREATE_SETTLE_ORDERURL)
}

/**
 * return 商户结算订单-生成结算订单
 * */
export function addOrderModalSearchUrl(params) {
    return api(params, ADD_ORDER_MODAL_SEARCH)
}

/**
 * return 商户结算订单-生成结算订单
 * */
export function submitCreateOrderDataUrl(params) {
    return api(params, SUBMIT_CREATEORDER_DATA)
}

/**
 * return 商户结算订单-生成结算订单
 * */
export function handleBillSettleAuditUrl(params) {
    return api(params, BILL_SETTLEAUDIT_PAGE_DATA)
}

/**
 * return 商户结算订单-生成结算订单
 * */
export function settleOrderCountUrl(params) {
    return api(params, SETTLE_ORDER_COUNT)
}

/**
 * return 商户结算订单-生成结算订单
 * */
export function getErrorTableListUrl(params) {
    return api(params, SETTLE_ERROR_TABLE_LIST)
}

/**
 * return 对账差错单-总计
 * */
export function getErrorCountListUrl(params) {
    return api(params, ERROR_COUNT_LIST)
}
/**
 * return 对账差错单-详情
 * */
export function settleErrorDetailDataUrl(params) {
    return api(params, SETTLEERROR_DETAIL_DATA)
}
/**
 * return 对账差错单-详情
 * */
export function handleClearObsoletekUrl(params) {
    return api(params, HANDLE_CLEAROBSOLETEK_DATA)
}


















/**
 * return 商户结算审核-导出
 * */
export function clearAuditExportUrl(params) {
    return postDownload(EXPORT_CLEAR_AUDIT, params)
}
/**
 * return 商户结算审核-导出
 * */
export function clearSettleAuditExportUrl(params) {
    return postDownload(CLEARSETTLE_AUDIT_EXPORT_URL, params)
}
/**
 * return 商户结算审核-导出
 * */
export function clearSettleFinanceExportUrl(params) {
    return postDownload(CLEARSETTLE_FINANCE_EXPORT_URL, params)
}

/**
 * return 商户结算审核-批量导出
 * */
export function clearAuditExportBatchUrl(params) {
    return postDownload(EXPORT_CLEAR_AUDIT_BATCH, params)
}
/**
 * return 清结算管理-清结算列表操作-资金流水-导出资金流水
 * */
export function exportFundsUrl(params) {
    return postDownload(EXPORT_CLEAR_FUNDS, params, 'export.csv')
}
export function exportCashFundsUrl(params) {
    return postDownload(EXPORT_CLEAR_CASH_FUNDS, params, 'export.csv')
}

/**
 * return 清结算管理-清结算列表操作-资金流水-导出关联订单
 * */
export function exportOrderUrl(params) {
    return postDownload(EXPORT_CLEAR_ORDER, params, 'export.csv')
}
export function exportCashOrderUrl(params) {
    return postDownload(EXPORT_CLEAR_CASH_ORDER, params, 'export.csv')
}

/**
 * return 清结算管理-清结算列表操作-导出差错关联订单
 * */
export function exportErrorOrderUrl(params) {
    return postDownload(EXPORT_CLEAR_ERROR_ORDER, params, 'export.csv')
}

/**
 * return 清结算管理-清结算列表操作-导出差错单
 * */
export function exportFundsErrorUrl(params) {
    return postDownload(EXPORT_CLEAR_ERROR_FUNDS, params, 'export.csv')
}
export function clearSettleChannelAdvanceExportUrl(params) {
    return postDownload(CLEARSETTLE_CHANNELADVANCE_EXPORT_URL, params, 'export.csv')
}
export function clearSettleChannelAdvanceExportCheckUrl(params) {
    return postDownload(CLEARSETTLE_CHANNELADVANCE_EXPORTCHECK_URL, {orderNos: params}, 'export.csv')
}

/**
 * return 商户结算订单-导出
 * */
export function clearSettleOrderExportUrl(params, IS_SETTLE_ORDER_PENNDING) {
    // IS_SETTLE_ORDER_PENNDING 可结算订单
    const url = IS_SETTLE_ORDER_PENNDING ? EXPORT__SETTLE_ORDER_PENNDING : EXPORT_CLEAR_SETTLE_ORDER
    console.log(params)
    return postDownload(url, params, 'export.csv')
}

/**
 * return 商户结算订单-导出勾选
 * */
export function settleOrderExportCheckUrl(params, IS_SETTLE_ORDER_PENNDING) {
    const url = IS_SETTLE_ORDER_PENNDING ? EXPORT_CLEAR_SETTLE_PENDING : EXPORT_CLEAR_SETTLE_ORDER_CHECK
    return postDownload(url, {orderNos: params}, 'export.csv')
}

/**
 * return 对账差错单-导出勾选
 * */
export function settleErrorExportCheckUrl(params) {
    return postDownload(SETTLEERROR_EXPORT_CHECK, params, 'export.csv')
}

/**
 * return 对账差错单-导出勾选
 * */
export function settleErrorExportUrl(params) {
    return postDownload(SETTLEERROR_EXPORT, params, 'export.csv')
}

