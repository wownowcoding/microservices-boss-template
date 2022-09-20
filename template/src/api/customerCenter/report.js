import apiUtil from '../apiUtil';
export const api = apiUtil;
import config from '@/config';
const { SHOP_BOSS } = config.moduleUrl;

export const exportUserReportListUrl = `${SHOP_BOSS}/member/report/export`;

export const queryUserReportList = (params) => api(params,`${SHOP_BOSS}/member/report/list`)

export const exportUserReportList = (params) => api(params,exportUserReportListUrl)

