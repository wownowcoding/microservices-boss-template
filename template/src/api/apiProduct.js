import apiUtil from './apiUtil'
export const api = apiUtil

import config from '@/config';
const {MERCHANT_BOSS_WEB} = config.moduleUrl

// 产品中心 详情
export const productListApi = `${MERCHANT_BOSS_WEB}/mer/product/list.do`

// 启用
export const productEnableApi = `${MERCHANT_BOSS_WEB}/mer/product/enable.do`

// 停用
export const productDisableApi = `${MERCHANT_BOSS_WEB}/mer/product/disable.do`

// 详情
export const productDetail = `${MERCHANT_BOSS_WEB}/mer/product/detail.do`

// 日志
export const productLog = `${MERCHANT_BOSS_WEB}/mer/product/log/list.do`
