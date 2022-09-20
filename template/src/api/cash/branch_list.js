/*
 * @Description:
 * @Author: Rico.刘一飞
 * @Date: 2019-06-18 14:21:54
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-06-18 14:21:54
 */
import apiUtil from '../apiUtil'
export const api = apiUtil

import config from '@/config'
const { CASH_BRANCH_WEB } = config.moduleUrl

export const list_api = `${CASH_BRANCH_WEB}/cash/boss/branch/list.do`
export const add_api = `${CASH_BRANCH_WEB}/cash/boss/branch/add.do`
export const add_agent_api = `${CASH_BRANCH_WEB}/cash/boss/branch/agent/add.do`
export const edit_api = `${CASH_BRANCH_WEB}/cash/boss/branch/edit.do`
export const edit_agent_api = `${CASH_BRANCH_WEB}/cash/boss/branch/agent/edit.do`
export const detail_api = `${CASH_BRANCH_WEB}/cash/boss/branch/detail.do`
export const detail_agent_api = `${CASH_BRANCH_WEB}/cash/boss/branch/agent/detail.do`
export const open_api = `${CASH_BRANCH_WEB}/cash/boss/branch/open.do`
export const close_api = `${CASH_BRANCH_WEB}/cash/boss/branch/close.do`
export const associated_stores_api = `${CASH_BRANCH_WEB}/cash/boss/branch/merchant/stores.do`
export const associated_storesdetail_api = `${CASH_BRANCH_WEB}/cash/boss/branch/merchant/storesdetail.do`
export const associated_salesman_api = `${CASH_BRANCH_WEB}/cash/boss/branch/merchant/salesman.do`
export const associated_salesmandetail_api = `${CASH_BRANCH_WEB}/cash/boss/branch/merchant/salesmandetail.do`
// 新增渠道出入金地址
export const addrChanelAdd = `${CASH_BRANCH_WEB}/cash/boss/address/channel/add.do`
// 修改渠道出入金地址
export const addrChanelEdit = `${CASH_BRANCH_WEB}/cash/boss/address/channel/modify.do`



