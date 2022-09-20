import apiUtil from '../apiUtil'
export const api = apiUtil

import config from '@/config';
const {COMMON_WEB,BOSS_WEB} = config.moduleUrl

export const zone_api = `${COMMON_WEB}/zone/child.do`
export const enums_all_api = `${COMMON_WEB}/enum/enums/all/get.do`
export const enums_module_api = `${COMMON_WEB}/enum/enums/module/get.do`
export const operator_ChargePersonList_api = `${BOSS_WEB}/boss/system/operator/detail/chargePersonList.do`
// 操作员详情
export const operator_detail_api = `${BOSS_WEB}/boss/system/operator/detail.do`
// 角色列表
export const roleDataList = `${BOSS_WEB}/boss/system/role/brief/list.do`;
