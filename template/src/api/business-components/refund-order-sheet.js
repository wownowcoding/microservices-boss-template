import { curl } from "../bizApiUtils";
import config from '@/config';
const { SHOP_BOSS } = config.moduleUrl

// 退款流水列表
export const refundOrderSheetList = (params, config) => curl(params, `${SHOP_BOSS}/refundTransaction/list.do`, config);

// 退款流水状态统计
export const refundOrderSheetStatistics = (params, config) => curl(params, `${SHOP_BOSS}/refundTransaction/getCounts.do`, config);
