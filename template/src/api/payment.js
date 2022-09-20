import apiUtil from './apiUtil'
export const api = apiUtil

import config from '@/config';
const {ACCOUNT_WEB} = config.moduleUrl

/* 资金划拨 */
// 资金划拨管理列表
export const queryList = `${ACCOUNT_WEB}/fundTransfer/queryFundTransferList`;
// 查询资金划拨明细
export const queryDetail = `${ACCOUNT_WEB}/fundTransfer/queryBySerialNo`;
// PAYGO备付金余额查询
export const queryBalance = `${ACCOUNT_WEB}/fundTransfer/queryBalanceAndAccountDate`;
// 审核资金划拨
export const handleAudit = `${ACCOUNT_WEB}/fundTransfer/checkFundTransfer`;
// 保存/修改资金划拨
export const handleEdit = `${ACCOUNT_WEB}/fundTransfer/saveOrUpdateFundTransfer`;
// 级联数据查询
export const queryCascaderList = `${ACCOUNT_WEB}/fundTransfer/queryAllBusiness`;
