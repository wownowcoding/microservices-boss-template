import { curl } from "../bizApiUtils";
import config from '@/config';
const { SHOP_BOSS, MERCHANT_BOSS_WEB } = config.moduleUrl

export const getApplePayList = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/iap/list`, config);
export const createApplePay = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/iap/save`, config);
export const updateApplePay = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/iap/update`, config);

