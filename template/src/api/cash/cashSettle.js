import apiUtil from '../apiUtil'
export const api = apiUtil

import config from '@/config';
const {BOSS_WEB} = config.moduleUrl

// 待生成结算单列表
export const queryPendingList = `${BOSS_WEB}/settle/pending/list.do`;
// 生成结算单
export const handleGenerate = `${BOSS_WEB}/settle/pending/generate.do`;
// 获取待生产结算单详情
export const queryPendingDetail = `${BOSS_WEB}/settle/pending/detail.do`;
// 获取待生成结算单统计
export const queryPendingTotal = `${BOSS_WEB}/settle/pending/get/amount/stat.do`;
// 获取待生成结算单详情统计
export const queryPendingDetailTotal = `${BOSS_WEB}/settle/pending/detail/stat.do`;


// 待处理结算单列表
export const queryProcessList = `${BOSS_WEB}/settle/handle/list.do`;
// 待处理结算单统计
export const queryProcessTotal = `${BOSS_WEB}/settle/handle/list/count.do`;
// 待处理结算单详情-弃用
// export const queryProcessDetail = `${BOSS_WEB}/settle/handle/detail.do`;

// 清分审核详情
export const queryProcessClearDetail = `${BOSS_WEB}/settle/handle/clear/detail.do`;
// 清分审核操作
export const handleClearAudit = `${BOSS_WEB}/settle/handle/clear/submit.do`;

// 财务审核详情
export const queryProcessFinanceDetail = `${BOSS_WEB}/settle/handle/finance/audit/detail.do`;
// 财务审核操作
export const handleFinanceAudit = `${BOSS_WEB}/settle/handle/finance/audit/submit.do`;

// 财务打款详情
export const queryProcessPayDetail = `${BOSS_WEB}/settle/handle/finance/pay/detail.do`;
// 财务打款操作
export const handlePayAudit = `${BOSS_WEB}/settle/handle/finance/pay/submit.do`;

// 已完成结算单列表
export const querySettledList = `${BOSS_WEB}/settle/settled/list.do`;
// 已完成结算单详情
export const querySettledDetail = `${BOSS_WEB}/settle/settled/detail.do`;
// 已完成结算单统计
export const querySettledTotal = `${BOSS_WEB}/settle/settled/get/amount/stat.do`;



