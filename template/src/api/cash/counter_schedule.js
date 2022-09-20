import apiUtil from '../apiUtil'
export const api = apiUtil

import config from '@/config';
const {CASH_BRANCH_WEB} = config.moduleUrl

export const query_api = `${CASH_BRANCH_WEB}/cash/boss/scheduling/query.do`
export const add_api = `${CASH_BRANCH_WEB}/cash/boss/scheduling/add.do`
export const edit_api = `${CASH_BRANCH_WEB}/cash/boss/scheduling/edit.do`
export const delete_api = `${CASH_BRANCH_WEB}/cash/boss/scheduling/delete.do`
export const get_api = `${CASH_BRANCH_WEB}/cash/boss/scheduling/get.do`
