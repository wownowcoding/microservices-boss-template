/*
 * @Description: 代理入金应收管理相关API
 * @Author: 管铭钊
 * @Date: 2019/9/25
 */
import config from '@/config'

const { BOSS_WEB } = config.moduleUrl
const addBossPrefix = url => `${BOSS_WEB}${url}`

/**
 * 门店现金监控
 */
export const store_cash_list = addBossPrefix( '/merchant/agent-cash/store/list.do' ) // 列表查询
export const generate_receipt = addBossPrefix( '/merchant/agent-cash/store/receipt.do' ) // 生成收款单
export const export_store_cash_list = addBossPrefix( '/merchant/agent-cash/store/export.do' ) // 导出查询结果

/**
 * 门店收款单管理
 */
export const store_receipt_list = addBossPrefix( '/merchant/agent-cash/receipt/list.do' ) // 列表查询
export const export_store_receipt_list = addBossPrefix( '/merchant/agent-cash/receipt/export.do' ) // 导出查询结果
export const store_receipt_detail = addBossPrefix( '/merchant/agent-cash/receipt/detail.do' ) // 详情
export const export_order_store_receipt = addBossPrefix( '/merchant/agent-cash/receipt/exportOrder.do' ) // 导出订单
export const store_receipt_operate_log = addBossPrefix( '/merchant/agent-cash/receipt/operationLog.do' ) // 操作日志
export const financial_audit_store_receipt = addBossPrefix( '/merchant/agent-cash/receipt/examine.do' ) // 财务审核
export const payee_list = addBossPrefix('/merchant/agent-cash/teller/list.do') // 查询收款员
export const modify_payee = addBossPrefix('/merchant/agent-cash/teller/edit.do') // 修改收款员
export const add_payee = addBossPrefix('/merchant/agent-cash/teller/add.do') // 新增收款员
export const check_payee_unique = addBossPrefix('/merchant/agent-cash/teller/check-unique.do') // 校验

/**
 * 商户应收管理
 */
export const merchant_receipt_list = addBossPrefix( '/merchant/agent-cash/receivable/list.do' ) // 列表查询
export const export_merchant_receipt_list = addBossPrefix( '/merchant/agent-cash/receivable/export.do' ) // 导出查询结果
export const export_merchant_receipt_detail = addBossPrefix( '/merchant/agent-cash/receivable/merchant/export.do' ) // 应收明细（导出）
export const merchant_receipt_detail = addBossPrefix( '/merchant/agent-cash/receivable/detail.do' ) // 详情
export const confirm_merchant_receipt = addBossPrefix( '/merchant/agent-cash/receivable/confirm.do' ) // 确认收款
export const merchant_receipt_operate_log = addBossPrefix( '/merchant/agent-cash/receivable/log.do' ) // 操作日志
