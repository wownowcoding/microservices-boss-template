import {bizApi, upload, get_upload_url} from '../bizApiUtils';


export const api = bizApi;

import config from '@/config';

const {TAKEAWAY_MER} = config.moduleUrl;

/* *******************   排序管理  **********************/

// 门店权重分排名
export const queryStoreRankList = `${TAKEAWAY_MER}/boss/store-weight/list`;
// 操作日志
export const queryLog = `${TAKEAWAY_MER}/boss/store-weight/log`;
// 日趋势
export const queryDay = `${TAKEAWAY_MER}/boss/store-weight/day`;
// 加权分
export const updateWeight = `${TAKEAWAY_MER}/boss/store-weight/update-score`;

