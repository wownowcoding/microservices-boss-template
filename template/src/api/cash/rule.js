import apiUtil from '../apiUtil'
export const api = apiUtil

import config from '@/config';
const {CASH_BOSS_RISK} = config.moduleUrl
// 网点风控规则
export const branch_list_api = `${CASH_BOSS_RISK}/cash/boss/rule/branch/list.do`
export const branch_add_api = `${CASH_BOSS_RISK}/cash/boss/rule/branch/add.do`
export const branch_edit_api = `${CASH_BOSS_RISK}/cash/boss/rule/branch/edit.do`
export const branch_detail_api = `${CASH_BOSS_RISK}/cash/boss/rule/branch/detail.do`
export const branch_open_api = `${CASH_BOSS_RISK}/cash/boss/rule/branch/open.do`
export const branch_close_api = `${CASH_BOSS_RISK}/cash/boss/rule/branch/close.do`

// 柜员风控规则
export const counter_list_api = `${CASH_BOSS_RISK}/cash/boss/rule/counter/list.do`
export const counter_add_api = `${CASH_BOSS_RISK}/cash/boss/rule/counter/add.do`
export const counter_edit_api = `${CASH_BOSS_RISK}/cash/boss/rule/counter/edit.do`
export const counter_detail_api = `${CASH_BOSS_RISK}/cash/boss/rule/counter/detail.do`
export const counter_open_api = `${CASH_BOSS_RISK}/cash/boss/rule/counter/open.do`
export const counter_close_api = `${CASH_BOSS_RISK}/cash/boss/rule/counter/close.do`

// 用户风控规则
export const user_list_api = `${CASH_BOSS_RISK}/cash/boss/rule/user/list.do`
export const user_add_api = `${CASH_BOSS_RISK}/cash/boss/rule/user/add.do`
export const user_edit_api = `${CASH_BOSS_RISK}/cash/boss/rule/user/edit.do`
export const user_detail_api = `${CASH_BOSS_RISK}/cash/boss/rule/user/detail.do`
export const user_open_api = `${CASH_BOSS_RISK}/cash/boss/rule/user/open.do`
export const user_close_api = `${CASH_BOSS_RISK}/cash/boss/rule/user/close.do`
