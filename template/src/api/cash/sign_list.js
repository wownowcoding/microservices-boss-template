import apiUtil from '../apiUtil'
export const api = apiUtil

import config from '@/config';
const {CASH_BRANCH_WEB} = config.moduleUrl

export const list_api = `${CASH_BRANCH_WEB}/cash/boss/work/signinlog/list.do`
export const forcesignout_api = `${CASH_BRANCH_WEB}/cash/boss/work/forcesignout.do`
export const workstatus_api = `${CASH_BRANCH_WEB}/cash/boss/work/workstatus.do`
