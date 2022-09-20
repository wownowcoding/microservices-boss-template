import { curl } from "../bizApiUtils";
import config from '@/config';
const { SHOP_BOSS } = config.moduleUrl

// 线下退款订单列表
export const offlineRefundOrderList = (params, config) => curl(params, `${SHOP_BOSS}/offlineRefundOrder/list.do`, config);

// 线下退款订单详情
export const offlineRefundOrderDetail = (params, config) => curl(params, `${SHOP_BOSS}/offlineRefundOrder/detail.do`, config);

// 新增线下退款订单
export const offlineRefundOrderCreate = (params, config) => curl(params, `${SHOP_BOSS}/offlineRefundOrder/create.do`, config);

// 修改线下退款订单
export const offlineRefundOrderUpdate = (params, config) => curl(params, `${SHOP_BOSS}/offlineRefundOrder/update.do`, config);

// 线下退款订单数量统计
export const offlineRefundOrderStatistics = (params, config) => curl(params, `${SHOP_BOSS}/offlineRefundOrder/statistics.do`, config);

// 取消线下退款
export const cancelOfflineOrder = (params, config) => curl(params, `${SHOP_BOSS}/offlineRefundOrder/cancel.do`, config);