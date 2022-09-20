import apiUtil from '../apiUtil';
import { curl } from "../bizApiUtils";
export const api = apiUtil;
import config from '@/config';
const { MERCHANT_BOSS_WEB } = config.moduleUrl;

/* *******************   商户管理  **********************/
export const queryMerchantLogs = `${MERCHANT_BOSS_WEB}/superapp/mer/query/merchant/operationRecord.do`;
// 商户列表
export const queryMerchantList = `${MERCHANT_BOSS_WEB}/superapp/mer/query/merchant/list.do`;
// 商户详情
export const queryMerchantDetail = `${MERCHANT_BOSS_WEB}/superapp/mer/query/boss/merchant/detail.do`;
// 商户新增
export const merchantAdd = `${MERCHANT_BOSS_WEB}/superapp/mer/query/merchant/add.do`;
// 商户编辑
export const merchantEdit = `${MERCHANT_BOSS_WEB}/superapp/mer/query/merchant/edit.do`;
// 商户名称校验是否重复
export const merchantNameIsRepeat = `${MERCHANT_BOSS_WEB}/superapp/mer/query/merchant/validatorMerchantName.do`;
// 商户启用
export const merchantEnable = `${MERCHANT_BOSS_WEB}/superapp/mer/update/merchant/enable.do`;
// 商户停用
export const merchantDisable = `${MERCHANT_BOSS_WEB}/superapp/mer/update/merchant/close.do`;
// 查询商户操作员
export const queryMerchantAccount = `${MERCHANT_BOSS_WEB}/superapp/mer/query/operator/detail.do`;
// 创建商户操作员
export const merchantAccountAdd = `${MERCHANT_BOSS_WEB}/superapp/mer/operator/merchant/add.do`;
// 根据手机号模糊查询商户操作员
export const operatorQuery = `${MERCHANT_BOSS_WEB}/superapp/mer/operator/query.do`;
// 查询经营范围
export const queryBusinessScope = `${MERCHANT_BOSS_WEB}/superapp/mer/query/businessScope/list.do`;
// 一级商户列表
export const queryFirstMerchantList = `${MERCHANT_BOSS_WEB}/superapp/mer/first/merchant/list.do`;
// 一级商户详情
export const queryFirstMerchantDetail = `${MERCHANT_BOSS_WEB}/superapp/mer/first/merchant/detail.do`;
// 一级商户新增
export const queryFirstMerchantAdd = `${MERCHANT_BOSS_WEB}/superapp/mer/first/merchant/add.do`;
// 一级商户编辑
export const queryFirstMerchantEdit = `${MERCHANT_BOSS_WEB}/superapp/mer/first/merchant/edit.do`;
// 一级银行列表
export const queryBankList = `${MERCHANT_BOSS_WEB}/superapp/mer/first/merchant/bank/list.do`;
// 查询国籍
export const queryCountrys = `${MERCHANT_BOSS_WEB}/superapp/mer/zone/list.do`;

// 邮箱验重
export const checkEmail = `${MERCHANT_BOSS_WEB}/superapp/mer/first/merchant/checkEmail.do`;
// 操作记录查询
export const listOperationLog = `${MERCHANT_BOSS_WEB}/superapp/mer/first/merchant/listOperationLog.do`;

/**
 * 获取一级商户的业务线
 * @returns
 */
export const superappMerBusinessList = (params, __config) => curl(params, `${MERCHANT_BOSS_WEB}/superapp/mer/business/list.do`, __config);
