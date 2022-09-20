import apiUtil from '../apiUtil'
export const api = apiUtil

import config from '@/config';
const {CASH_ACCOUNT_WEB} = config.moduleUrl

export const list_api = `${CASH_ACCOUNT_WEB}/cash/boss/financial/list.do`
export const detail_api = `${CASH_ACCOUNT_WEB}/cash/boss/financial/detail.do`
export const confirm_api = `${CASH_ACCOUNT_WEB}/cash/boss/financial/confirm.do`
export const sum_api = `${CASH_ACCOUNT_WEB}/cash/boss/financial/count.do`

export const gathering_list_api = `${CASH_ACCOUNT_WEB}/cash/boss/financial/gathering/list.do`
export const gathering_confirm_api = `${CASH_ACCOUNT_WEB}/cash/boss/financial/gathering/confirm.do`
export const gathering_detail_api = `${CASH_ACCOUNT_WEB}/cash/boss/financial/gathering/detail.do`
export const gathering_sumAmount_api = `${CASH_ACCOUNT_WEB}/cash/boss/financial/gathering/sumAmount.do`
export const gathering_waitConfirmBills_api = `${CASH_ACCOUNT_WEB}/cash/boss/financial/gathering/waitConfirmBills.do`
export const gathering_waitConfirmBillsCount_api = `${CASH_ACCOUNT_WEB}/cash/boss/financial/gathering/waitConfirmBillsCount.do`
