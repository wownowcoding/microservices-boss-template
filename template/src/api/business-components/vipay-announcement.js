import { curl } from "../bizApiUtils";
import config from '@/config';
const { SHOP_BOSS } = config.moduleUrl

//  查询支付公告
export const bossPayBulletinGet = (params, config) => curl(params, `${SHOP_BOSS}/pay/bulletin/get.do`, config);

//  新增支付公告
export const bossPayBulletinCreate = (params, config) => curl(params, `${SHOP_BOSS}/pay/bulletin/create.do`, config);

//  修改支付公告
export const bossPayBulletinUpdate = (params, config) => curl(params, `${SHOP_BOSS}/pay/bulletin/update.do`, config);

//  修改支付公告状态
export const bossPayBulletinUpdateStatus = (params, config) => curl(params, `${SHOP_BOSS}/pay/bulletin/updateStatus.do`, config);