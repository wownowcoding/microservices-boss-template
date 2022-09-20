import apiUtil from './apiUtil'

export const api = apiUtil

import config from '@/config';

const { SMS_WEB, NOTIFICATION_WEB } = config.moduleUrl
// 短信网关
export const messageGate_list = `${SMS_WEB}/boss/message/sms/gateway/list.do`
export const messageGate_detail = `${SMS_WEB}/boss/message/sms/gateway/detail.do`
export const messageGate_edit = `${SMS_WEB}/boss/message/sms/gateway/update.do`
export const messageGate_enable = `${SMS_WEB}/boss/message/sms/gateway/start.do`
export const messageGate_disable = `${SMS_WEB}/boss/message/sms/gateway/stop.do`
export const messageGate_priority_update = `${SMS_WEB}/boss/message/sms/gateway/priority/update.do`
// 短信查询
export const messageRecord_list = `${SMS_WEB}/boss/message/sms/record/list.do`
export const messageRecord_detail = `${SMS_WEB}/boss/message/sms/record/detail.do`
export const messageRecord_retry = `${SMS_WEB}/boss/message/sms/record/repush.do`

// 短信推送
export const messagePush_retry = `${NOTIFICATION_WEB}/boss/notification/repush.do`
