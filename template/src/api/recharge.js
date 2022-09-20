import apiUtil from './apiUtil'
export const api = apiUtil

import config from '@/config';
const {
    BOSS_WEB
} = config.moduleUrl

// 业务渠道流水
export const recharge_channel_detail = `${BOSS_WEB}/recharge/channel/manage/detail.do`
export const recharge_channel_list = `${BOSS_WEB}/recharge/channel/manage/query.do`
export const recharge_channel_download = `${BOSS_WEB}/recharge/channel/manage/download.do`
export const recharge_channel_queryResult = `${BOSS_WEB}/recharge/channel/manage/queryResult.do`
export const recharge_channel_queryStatus = `${BOSS_WEB}/recharge/channel/manage/updateResult.do`
export const recharge_channel_sum = `${BOSS_WEB}/recharge/channel/manage/sum.do`
// 充值话费订单
export const recharge_order_list = `${BOSS_WEB}/boss/recharge/order/manage/query.do`
export const recharge_order_sum = `${BOSS_WEB}/boss/recharge/order/manage/sum.do`
export const recharge_order_download = `${BOSS_WEB}/boss/recharge/order/manage/download.do`
export const recharge_order_detail = `${BOSS_WEB}/boss/recharge/order/manage/detail.do`
// 业务报表
export const recharge_commission_list = `${BOSS_WEB}/boss/recharge/settle/commission/list.do`
export const recharge_commission_download = `${BOSS_WEB}/boss/recharge/settle/commission/download.do`
export const recharge_commission_bat_download = `${BOSS_WEB}/boss/recharge/settle/commission/bat/download.do`
export const recharge_commission_detail = `${BOSS_WEB}/boss/recharge/settle/commission/detail.do`
export const recharge_commission_nameList = `${BOSS_WEB}/boss/recharge/settle/commission/name/list.do`
