  import { bizApi } from "../bizApiUtils";
  export const api = bizApi;

import config from '@/config';
const { TakeawayProduct } = config.moduleUrl

//  平台商品审核-分页查询
export const commodityMultipleVersionPageList = params => api(params, `${TakeawayProduct}/boss/multiple/version/page/list.do`)

//  商品-审核操作
export const commodityMultipleVersionAudit = params => api(params, `${TakeawayProduct}/boss/multiple/version/audit.do`)

//  商品-门店审核商品详情
export const commodityMultipleVersionDetail = params => api(params, `${TakeawayProduct}/boss/multiple/version/detail.do`)
//  商品-门店审核商品删除
export const commodityMultipleVersionDel = params => api(params, `${TakeawayProduct}/boss/multiple/version/delete.do`)

//  商品-门店审核商品详情
export const menuClassify = params => api(params, `${TakeawayProduct}/boss/menu/get.do`)
