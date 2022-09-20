import apiUtil from '../apiUtil'
export const api = apiUtil

import config from '@/config';
const {CASH_BOSS_RISK} = config.moduleUrl

export const counterWarning_list_api = `${CASH_BOSS_RISK}/cash/boss/counterWarning/list.do`
export const userWarning_list_api = `${CASH_BOSS_RISK}/cash/boss/userWarning/list.do`
