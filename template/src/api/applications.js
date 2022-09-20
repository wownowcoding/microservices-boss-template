/*
 * @Description: 应用管理模块接口
 * @Author: Rico.刘一飞
 * @Date: 2018-11-22 16:26:49
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2018-12-06 17:41:07
 */


import apiUtil from './apiUtil';
export const api = apiUtil;

import config from '@/config';;
const {MERCHANT_BOSS_WEB} = config.moduleUrl;

// 应用列表
export const ajaxQueryList = `${MERCHANT_BOSS_WEB}/mer/application/query/list.do`;
// 应用详情
export const ajaxListDetail = `${MERCHANT_BOSS_WEB}/mer/application/query/detail.do`;
// 产品列表
export const ajaxProductList = `${MERCHANT_BOSS_WEB}/mer/application/query/product/list.do`;
// 操作记录
export const ajaxLogList = `${MERCHANT_BOSS_WEB}/mer/application/query/log/list.do`;
// IP白名单
export const ajaxIPList = `${MERCHANT_BOSS_WEB}/mer/white-list/query/list.do`;
// 启用
export const ajaxHandleNext = `${MERCHANT_BOSS_WEB}/mer/application/next.do`;
// 停用（要填写原因的就是prev）
export const ajaxHandlePrev = `${MERCHANT_BOSS_WEB}/mer/application/prev.do`;
// 商户密钥
export const ajaxQueryKey = `${MERCHANT_BOSS_WEB}/mer/key/query/detail.do`;
// 应用统计
export const ajaxQueryTotal = `${MERCHANT_BOSS_WEB}/mer/application/query/count.do`;
// 创建应用
export const ajaxHandleCreate = `${MERCHANT_BOSS_WEB}/mer/application/create.do`;
// 检查应用名的合法性
export const ajaxHandleCheckName = `${MERCHANT_BOSS_WEB}/mer/application/valid/name.do`;
// 更新应用
export const ajaxHandleUpdate = `${MERCHANT_BOSS_WEB}/mer/application/update.do`;

