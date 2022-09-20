import { curl } from "../bizApiUtils";
import config from '@/config';
const { SHOP_BOSS, MERCHANT_BOSS_WEB } = config.moduleUrl

//  支付工具列表查询
export const payToolList = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/list`, config);

//  支付工具列表查询无分页
export const payToolGetAll = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/getAll`, config);

//  新增支付工具
export const payToolAdd = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/add`, config);

//  编辑支付工具
export const payToolEdit = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/edit`, config);


/**
 * 维护计划
 */
//  维护计划列表查询
export const payTpayToolPlanListoolEdit = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/plan/list`, config);

//  新增支付工具维护计划
export const payToolPlanAdd = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/plan/add`, config);

//  编辑支付工具计划
export const payToolPlanEdit = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/plan/edit`, config);

//  编辑支付工具计划
export const payToolPlanDelete = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/plan/delete`, config);
// 获取支付工具操作日志
export const payToolLogs = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/operateLogList`, config);
// 批量维护支付工具
export const payToolBacth = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/batchEdit`, config);

//  获取 vipay 的交易方法
export const offlineOrderGetTransactionChanne = (params, config) => curl(params, `${SHOP_BOSS}/offline/order/getTransactionChanne`, config);

/**
 * 一级商户支付管理
 */
//  一级商户对应支付工具列表
export const merPayToolList = (params, config) => curl(params, `${MERCHANT_BOSS_WEB}/superapp/mer/pay/tool/list.do`, config);

//  一级商户添加支付工具
export const merPayToolAdd = (params, config) => curl(params, `${MERCHANT_BOSS_WEB}/superapp/mer/pay/tool/add.do`, config);

//  一级商户支付工具编辑
export const merPayToolEdit = (params, config) => curl(params, `${MERCHANT_BOSS_WEB}/superapp/mer/pay/tool/edit.do`, config);

//  一级商户对应支付工具列表（包含支付方式）
export const superappMerPayToolMethodList = (params, config) => curl(params, `${MERCHANT_BOSS_WEB}/superapp/mer/pay/tool/method/list.do`, config);

//  编辑一级商户支付方式状态
export const superappMerPayToolMethodEdit = (params, config) => curl(params, `${MERCHANT_BOSS_WEB}/superapp/mer/pay/tool/method/edit.do`, config);

//  修改支付工具排序
export const updateSortPayTool = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/updateSort`, config);
export const showSwitch = (params, config) => curl(params, `${SHOP_BOSS}/pay/tool/showSwitch`, config);

