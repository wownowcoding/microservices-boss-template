import { curl } from "@/api/bizApiUtils";
import config from '@/config';
const { BOSS_WEB, USER_WEB } = config.moduleUrl
/**
 * 基础标签接口
 * http://sit.x-vipay.com:500/project/55/interface/api/cat_7027
 */
//  获取列表
export const getTagList = (params, config) => curl(params, `${BOSS_WEB}/warehouse/tagInfo/list`, config);
//  操作状态
export const warehouseTagInfoUpdateStatus = (params, config) => curl(params, `${BOSS_WEB}/warehouse/tagInfo/updateStatus`, config);
//  查询存在用户的标签列表 - 属性
export const tagInfoHasUserList = (params, config) => curl(params, `${BOSS_WEB}/warehouse/tagInfo/hasUser/list`, config);
//  编辑标签
export const warehouseTagInfoEdit = (params, config) => curl(params, `${BOSS_WEB}/warehouse/tagInfo/edit`, config);
//  新增基础标签
export const warehouseTagInfoAdd = (params, config) => curl(params, `${BOSS_WEB}/warehouse/tagInfo/add`, config);

/**
 * 规则标签接口
 * http://sit.x-vipay.com:500/project/55/interface/api/cat_7351
 */
//  规则标签列表
export const warehouseRuleTagInfoList = (params, config) => curl(params, `${BOSS_WEB}/warehouse/ruleTagInfo/list`, config);
//  规则标签启用/关闭
export const warehouseRuleTagInfoUpdateStatus = (params, config) => curl(params, `${BOSS_WEB}/warehouse/ruleTagInfo/updateStatus`, config);
//  新增规则标签
export const warehouseRuleTagInfoAdd = (params, config) => curl(params, `${BOSS_WEB}/warehouse/ruleTagInfo/add`, config);
//  编辑规则标签
export const warehouseRuleTagInfoEdit = (params, config) => curl(params, `${BOSS_WEB}/warehouse/ruleTagInfo/edit`, config);
//  查询标签分类选项
export const warehouseTagClassificationQuery = (params, config) => curl(params, `${BOSS_WEB}/warehouse/tagClassification/query`, config);
//  查询用户属性规则
export const warehouseRuleTagInfoQueryUserAttributes = (params, config) => curl(params, `${BOSS_WEB}/warehouse/ruleTagInfo/queryUserAttributes`, config);
//  查询用户行为规则
export const warehouseRuleTagInfoQueryUserBehaviorRule = (params, config) => curl(params, `${BOSS_WEB}/warehouse/ruleTagInfo/queryUserBehaviorRule`, config);

/**
 * 用户标签处理
 */
 export const warehouseTagUserImport = (params, config) => curl(params, `${BOSS_WEB}/warehouse/tagUser/import`, config);

/**
* 用户标签批量删除
* @param {*} params 
* @param {*} config 
* @returns 
*/
 export const warehouseTagUserRemove = (params, config) => curl(params, `${BOSS_WEB}/warehouse/tagUser/delete`, config);

 /**
 * 用户分群
 */
  //  分组列表查询
  export const tagGroupList = (params, config) => curl(params, `${USER_WEB}/tag/group/list`, config);
  //  编辑
  export const tagGroupEdit = (params, config) => curl(params, `${USER_WEB}/tag/group/edit`, config);
  //  删除
  export const tagGroupDelete = (params, config) => curl(params, `${USER_WEB}/tag/group/delete`, config);
  //  创建
  export const tagGroupCreate = (params, config) => curl(params, `${USER_WEB}/tag/group/create`, config);
  //  详情
  export const tagGroupDetail = (params, config) => curl(params, `${USER_WEB}/tag/group/detail`, config);
  //  导出下载
  export const warehouseTagUserQuery = `${BOSS_WEB}/warehouse/tag/user/query`;
  //  获取用户分群标签选择器
  export const warehouseTagInfoUserQueryTagInfoSelector = (params, config) => curl(params, `${BOSS_WEB}/warehouse/tagInfo/user/queryTagInfoSelector`, config);