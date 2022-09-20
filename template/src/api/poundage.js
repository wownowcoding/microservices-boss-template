import apiUtil from './apiUtil'
export const api = apiUtil

import config from '@/config';
const {MERCHANT_BOSS_WEB} = config.moduleUrl

export const selectPoundageList = `${MERCHANT_BOSS_WEB}/mer/poundage/list.do`
export const selectPoundageEnumList = `${MERCHANT_BOSS_WEB}/mer/poundage/query/poundage/list.do`
export const addPoundage = `${MERCHANT_BOSS_WEB}/mer/poundage/add.do`
export const editPoundage = `${MERCHANT_BOSS_WEB}/mer/poundage/edit.do`
export const delPoundage = `${MERCHANT_BOSS_WEB}/mer/poundage/remove.do`
export const selectPoundageInfo = `${MERCHANT_BOSS_WEB}/mer/poundage/detail.do`
