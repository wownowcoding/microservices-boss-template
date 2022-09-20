import apiUtil from './apiUtil'
export const api = apiUtil

import config from '@/config';
const {BOSS_WEB} = config.moduleUrl

export const getEnumByKeys = `${BOSS_WEB}/boss/metadata/enums/module/get.do`
