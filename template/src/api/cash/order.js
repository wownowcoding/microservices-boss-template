import apiUtil from '../apiUtil'
export const api = apiUtil

import config from '@/config';
const {BOSS_WEB, CASH_BRANCH_WEB} = config.moduleUrl

export const deposit_list_api = `${BOSS_WEB}/order/deposit/list.do`
export const withdraw_list_api = `${BOSS_WEB}/order/withdraw/list.do`
export const deposit_detail_api = `${BOSS_WEB}/order/deposit/detail.do`
export const withdraw_detail_api = `${BOSS_WEB}/order/withdraw/detail.do`
export const channel_list_api = `${BOSS_WEB}/order/deposit/query/channel/list.do`
// 导出
export const export_list_api = `${BOSS_WEB}/order/deposit/export/deposit/order/list.do`
export const export_withdrawList_api = `${BOSS_WEB}/order/withdraw/export/withdraw/order/list.do`
// 统计-出金
export const withdraw_total_api = `${BOSS_WEB}/order/withdraw/countAmount.do`
// 统计-入金
export const deposit_total_api = `${BOSS_WEB}/order/deposit/countAmount.do`


// 柜员详情
export const counter_detail_api = `${CASH_BRANCH_WEB}/cash/boss/counter/detail.do`;
// 网点详情
export const branch_detail_api = `${CASH_BRANCH_WEB}/cash/boss/branch/detail.do`
