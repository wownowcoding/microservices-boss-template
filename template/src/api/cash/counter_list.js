import apiUtil from '../apiUtil'

export const api = apiUtil

import config from '@/config';

const { CASH_BRANCH_WEB } = config.moduleUrl

export const list_api = `${CASH_BRANCH_WEB}/cash/boss/counter/list.do`
export const chargePerson_list_api = `${CASH_BRANCH_WEB}/cash/boss/counter/chargepersonlist.do`
export const add_api = `${CASH_BRANCH_WEB}/cash/boss/counter/add.do`
export const add_agent_api = `${CASH_BRANCH_WEB}/cash/boss/counter/agent/add.do`
export const edit_api = `${CASH_BRANCH_WEB}/cash/boss/counter/edit.do`
export const edit_agent_api = `${CASH_BRANCH_WEB}/cash/boss/counter/agent/edit.do`
export const detail_api = `${CASH_BRANCH_WEB}/cash/boss/counter/detail.do`
export const detail_agent_api = `${CASH_BRANCH_WEB}/cash/boss/counter/agent/detail.do`
export const freeze_api = `${CASH_BRANCH_WEB}/cash/boss/counter/freeze.do`
export const unfreeze_api = `${CASH_BRANCH_WEB}/cash/boss/counter/unfreeze.do`
export const reset_security_code_api = `${CASH_BRANCH_WEB}/cash/boss/counter/resetsecuritycode.do`
export const operator_counter_info_api = `${CASH_BRANCH_WEB}/cash/boss/counter/getoperatorcounter.do`
