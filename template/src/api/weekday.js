import apiUtil from './apiUtil'
export const api = apiUtil

import config from '@/config';
const {SETTLE_BOSS_WEB} = config.moduleUrl

export const selectYearList = `${SETTLE_BOSS_WEB}/boss/settle/calendar/year/list.do`
export const generateYear = `${SETTLE_BOSS_WEB}/boss/settle/calendar/generate.do`
export const setDay = `${SETTLE_BOSS_WEB}/boss/settle/calendar/set.do`
