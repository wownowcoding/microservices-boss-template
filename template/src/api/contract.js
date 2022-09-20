import apiUtil from './apiUtil'
export const api = apiUtil

import config from '@/config';
const {MERCHANT_BOSS_WEB} = config.moduleUrl

export const selectContractList = `${MERCHANT_BOSS_WEB}/mer/contract/list.do`
export const selectContractEnumList = `${MERCHANT_BOSS_WEB}/mer/contract/query/contract/service.do`
export const addContract = `${MERCHANT_BOSS_WEB}/mer/contract/add.do`
export const editContract = `${MERCHANT_BOSS_WEB}/mer/contract/edit.do`
export const delContract = `${MERCHANT_BOSS_WEB}/mer/contract/remove.do`
export const selectContractInfo = `${MERCHANT_BOSS_WEB}/mer/contract/detail.do`
export const checkContractInfo = `${MERCHANT_BOSS_WEB}/mer/contract/check.do`
