import apiUtil from "../apiUtil";
import config from "@/config";
const { TakeawayDelivery } = config.moduleUrl;
export const api = apiUtil;

/* *******************   日汇报  **********************/
// 列表
export const queryDailyList = `${TakeawayDelivery}/boss/cash-manager/daily-query/list.do`;
// 导出列表
export const exportDailyList = `${TakeawayDelivery}/boss/cash-manager/daily/export.do`;
/* *******************   骑手汇报  **********************/
// 列表
export const queryDeliverymanList = `${TakeawayDelivery}/boss/cash-manager/deliveryman-query/list.do`;
// 导出列表
export const exportDeliverymanList = `${TakeawayDelivery}/boss/cash-manager/deliveryman/export.do`;
// handin record
export const queryHandInRecord = `${TakeawayDelivery}/boss/cash-manager/deliveryman-hand-record/list.do`;
// confirm record
export const queryConfirmRecord = `${TakeawayDelivery}/boss/cash-manager/deliveryman-confirm-record/list.do`;
/* *******************   骑手汇报订单列表  **********************/
// 列表
export const queryOrderList = `${TakeawayDelivery}/boss/cash-manager/detail-query/list.do`;
// 导出列表
export const exportOrderList = `${TakeawayDelivery}/boss/cash-manager/detail/export.do`;
// 确认金额
export const confirmOrderListAmt = `${TakeawayDelivery}/boss/cash-manager/detail-confirm/action.do`;
