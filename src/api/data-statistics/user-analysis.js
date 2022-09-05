import apiUtil from '../apiUtil';
export const api = apiUtil;

import config from '@/config';
const { BOSS_WEB } = config.moduleUrl

// 接口列表：https://yapi.lifekh.com:8443/project/55/interface/api/70875

// 新增用户统计数据
export const getNewUserReportStatic = params => apiUtil(params, `${BOSS_WEB}/warehouse/report/getNewUserReportStatic`)
export const getNewUserReportStaticUrl = `${BOSS_WEB}/warehouse/report/getNewUserReportStatic`

// 活跃用户
export const getActiveUserReportStatic = params => apiUtil(params, `${BOSS_WEB}/warehouse/report/getActiveUserReportStatic`)
export const getActiveUserReportStaticUrl = `${BOSS_WEB}/warehouse/report/getActiveUserReportStatic`
// 活跃用户粘度
export const getActiveUserReportByStickness = params => apiUtil(params, `${BOSS_WEB}/warehouse/report/getActiveUserStickyStatic`)
export const getActiveUserReportBySticknessUrl = `${BOSS_WEB}/warehouse/report/getActiveUserStickyStatic`


// 用户留存
export const getRetainedUser = params => apiUtil(params, `${BOSS_WEB}/warehouse/report/getUserRemainStatic`)
export const getRetainedUserUrl = `${BOSS_WEB}/warehouse/report/getUserRemainStatic`